import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import EventsExplorer from "@/components/EventsExplorer";
import { getEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events | IEEE Student Branch",
  description: "Upcoming and past events from the IEEE Student Branch at Saintgits College of Engineering.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <main id="main">
      <PageHero
        kicker="Events ·"
        title="What's happening?"
        desc="Explore our upcoming events, workshops and technical activities."
        image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2200&q=85"
      />

      <EventsExplorer events={getEvents()} />
    </main>
  );
}
