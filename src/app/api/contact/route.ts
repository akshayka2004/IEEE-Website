import { badRequest, cleanText, deliver, isEmail } from "@/lib/forms";
import { contactPurposes } from "@/lib/site";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid");

  if (body.website) return Response.json({ ok: true });

  const name = cleanText(body.name, 100);
  const message = cleanText(body.message, 3000);
  if (!name || !message || !isEmail(body.email)) return badRequest("invalid");

  const purpose = contactPurposes.includes(body.purpose) ? body.purpose : "Other";

  return deliver("contact", { name, email: body.email, message, purpose });
}
