"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
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
      <p className="form-success" role="status">
        Thanks for reaching out — we&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="contact-name">
        Your name
      </label>
      <input id="contact-name" type="text" name="name" placeholder="Your name" autoComplete="name" maxLength={100} required />

      <label className="sr-only" htmlFor="contact-email">
        Your email
      </label>
      <input
        id="contact-email"
        type="email"
        name="email"
        placeholder="Your email"
        autoComplete="email"
        maxLength={254}
        required
      />

      <label className="sr-only" htmlFor="contact-message">
        Your message
      </label>
      <textarea id="contact-message" name="message" placeholder="Your message" maxLength={3000} required />

      <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Message →"}
      </button>

      {status === "error" && (
        <p className="form-error" role="alert">
          Couldn&apos;t send your message right now. Please try again later or email us directly.
        </p>
      )}
    </form>
  );
}
