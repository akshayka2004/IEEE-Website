"use client";

import { useRef, useState } from "react";
import { useToast } from "./Toast";
import { confettiBurst } from "@/lib/confetti";

type Status = "idle" | "sending" | "done" | "error";

export default function RegisterForm({ slug, title }: { slug: string; title: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const { toast } = useToast();
  const submitBtn = useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          name: data.get("name"),
          email: data.get("email"),
          department: data.get("department"),
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("done");
      toast(`You're registered for ${title}`, "success");
      confettiBurst(submitBtn.current);
    } catch {
      setStatus("error");
      toast("Registration didn't go through. Please try again.", "error");
    }
  }

  if (status === "done") {
    return (
      <div className="register-card is-done" role="status">
        <h3>You&apos;re on the list.</h3>
        <p>We&apos;ve recorded your registration for {title}. Watch your inbox for updates.</p>
      </div>
    );
  }

  return (
    <form className="register-card" onSubmit={handleSubmit}>
      <h3>Register for this event</h3>
      <p className="register-note">We&apos;ll send updates to the email you provide.</p>

      <label htmlFor="reg-name">Full name</label>
      <input id="reg-name" name="name" type="text" autoComplete="name" maxLength={100} required />

      <label htmlFor="reg-email">Email</label>
      <input id="reg-email" name="email" type="email" autoComplete="email" maxLength={254} required />

      <label htmlFor="reg-dept">Department &amp; year</label>
      <input id="reg-dept" name="department" type="text" placeholder="e.g. CSE, 2nd year" maxLength={100} required />

      <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button ref={submitBtn} className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Registering…" : "Register →"}
      </button>

      {status === "error" && (
        <p className="form-error" role="alert">
          Something went wrong. Please try again, or contact us directly.
        </p>
      )}
    </form>
  );
}
