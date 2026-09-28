"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="subscribe" style={{ justifyContent: "center", padding: "16px 20px" }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Thanks for subscribing! 🎉</span>
      </div>
    );
  }

  return (
    <form className="subscribe" onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Enter your email address" required />
      <button className="btn btn-primary" type="submit">
        Subscribe →
      </button>
    </form>
  );
}
