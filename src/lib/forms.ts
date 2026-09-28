import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

export async function deliver(type: "contact" | "newsletter" | "registration" | "join", payload: Record<string, string>) {
  const url = process.env.FORMS_WEBHOOK_URL;

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[forms:${type}] FORMS_WEBHOOK_URL not set — payload:`, payload);
      return NextResponse.json({ ok: true });
    }
    console.error(`[forms:${type}] FORMS_WEBHOOK_URL is not configured`);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, ...payload, submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[forms:${type}] delivery failed`, err);
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
}

export function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}
