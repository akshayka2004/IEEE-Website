import { badRequest, cleanText, deliver, isEmail } from "@/lib/forms";
import { getEvent } from "@/lib/events";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") return badRequest("invalid");

  if (body.website) return Response.json({ ok: true });

  const event = typeof body.slug === "string" ? getEvent(body.slug) : undefined;
  if (!event || event.status !== "upcoming") return badRequest("closed");

  const name = cleanText(body.name, 100);
  const department = cleanText(body.department, 100);
  if (!name || !department || !isEmail(body.email)) return badRequest("invalid");

  return deliver("registration", {
    event: event.title,
    eventSlug: event.slug,
    eventDate: event.startsAt,
    name,
    email: body.email,
    department,
  });
}
