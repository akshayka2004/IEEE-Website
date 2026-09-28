"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), website: data.get("website") }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="subscribe subscribe-done" role="status">
        <span>Thanks for subscribing — you&apos;re on the list.</span>
      </div>
    );
  }

  return (
    <div>
      <form className="subscribe" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          autoComplete="email"
          maxLength={254}
          required
        />
        <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Subscribing…" : "Subscribe →"}
        </button>
      </form>
      {status === "error" && (
        <p className="form-error" role="alert">
          Couldn&apos;t subscribe right now. Please try again later or email us directly.
        </p>
      )}
    </div>
  );
}
