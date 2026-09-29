import type { EventPhase } from "@/lib/events";

const LABELS: Record<EventPhase, string> = {
  open: "Registration Open",
  soon: "Starting Soon",
  live: "Event Live",
  completed: "Completed",
};

export default function EventStatus({ phase, className = "" }: { phase: EventPhase; className?: string }) {
  return (
    <span className={`event-status event-status-${phase} ${className}`.trim()}>
      {phase === "completed" ? (
        <span aria-hidden="true">✓</span>
      ) : (
        <span className="event-status-dot" aria-hidden="true" />
      )}
      {LABELS[phase]}
    </span>
  );
}
