"use client";

import { useState } from "react";
import { useToast } from "./Toast";
import { contactPurposes, type ContactPurpose } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [purpose, setPurpose] = useState<ContactPurpose>("Membership");
  const { toast } = useToast();

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
          purpose,
          website: data.get("website"),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("done");
      toast("Message sent — we'll be in touch", "success");
    } catch {
      setStatus("error");
      toast("Couldn't send your message right now", "error");
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
      <fieldset className="purpose-field">
        <legend>I want to contact IEEE about</legend>
        <div className="radio-row">
          {contactPurposes.map((p) => (
            <label key={p} className={`radio-chip${purpose === p ? " is-on" : ""}`}>
              <input type="radio" name="purpose" value={p} checked={purpose === p} onChange={() => setPurpose(p)} />
              <span>{p}</span>
            </label>
          ))}
        </div>
      </fieldset>

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
