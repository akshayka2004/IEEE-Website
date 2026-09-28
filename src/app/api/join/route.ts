import { badRequest, cleanText, deliver, isEmail } from "@/lib/forms";
import { societies } from "@/lib/data";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid");

  if (body.website) return Response.json({ ok: true });

  const name = cleanText(body.name, 100);
  const department = cleanText(body.department, 100);
  const year = cleanText(body.year, 20);
  if (!name || !department || !year || !isEmail(body.email)) return badRequest("invalid");

  const valid = new Set(societies.map((s) => s.name));
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((i: unknown): i is string => typeof i === "string" && valid.has(i)).slice(0, 8)
    : [];
  const why = body.why ? cleanText(body.why, 1000) ?? "" : "";

  return deliver("join", { name, email: body.email, department, year, interests: interests.join(", "), why });
}
