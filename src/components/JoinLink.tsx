import Link from "next/link";
import { isLive } from "@/lib/pages";
import { ieeeJoinUrl } from "@/lib/site";

/** Links to the branch /join page when it is live, otherwise to the official IEEE membership page. */
export default function JoinLink({ className, children }: { className?: string; children: React.ReactNode }) {
  if (isLive("/join")) {
    return (
      <Link href="/join" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={ieeeJoinUrl} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
