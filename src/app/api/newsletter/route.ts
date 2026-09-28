import { badRequest, deliver, isEmail } from "@/lib/forms";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid");

  if (body.website) return Response.json({ ok: true });

  if (!isEmail(body.email)) return badRequest("invalid");

  return deliver("newsletter", { email: body.email });
}
