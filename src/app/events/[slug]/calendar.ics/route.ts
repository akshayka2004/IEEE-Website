import { getEvent, eventToIcs } from "@/lib/events";
import { rawEvents } from "@/lib/data";

export function generateStaticParams() {
  return rawEvents.map((e) => ({ slug: e.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return new Response("Not found", { status: 404 });

  return new Response(eventToIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${event.slug}.ics"`,
    },
  });
}
