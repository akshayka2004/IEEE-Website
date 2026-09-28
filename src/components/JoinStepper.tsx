"use client";

import { useRef, useState } from "react";
import { societies } from "@/lib/data";
import { useToast } from "./Toast";
import { confettiBurst } from "@/lib/confetti";

type Form = { name: string; email: string; department: string; year: string; interests: string[]; why: string };
type Status = "idle" | "sending" | "done" | "error";

const STEPS = ["About you", "Interests", "Review"];
const YEARS = ["1st year", "2nd year", "3rd year", "4th year", "Postgraduate"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function JoinStepper() {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [form, setForm] = useState<Form>({ name: "", email: "", department: "", year: "", interests: [], why: "" });
  const [hp, setHp] = useState("");
  const { toast } = useToast();
  const submitBtn = useRef<HTMLButtonElement>(null);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => setForm((f) => ({ ...f, [key]: value }));

  function validateStep(s: number): boolean {
    const next: Partial<Record<keyof Form, string>> = {};
    if (s === 0) {
      if (!form.name.trim()) next.name = "Please enter your name.";
      if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email address.";
      if (!form.department.trim()) next.department = "Please enter your department.";
      if (!form.year) next.year = "Please choose your year.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function toggleInterest(name: string) {
    set("interests", form.interests.includes(name) ? form.interests.filter((i) => i !== name) : [...form.interests, name]);
  }

  async function submit() {
    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: hp }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      toast("Thanks — we'll be in touch soon", "success");
      confettiBurst(submitBtn.current);
    } catch {
      setStatus("error");
      toast("Couldn't submit right now. Please try again.", "error");
    }
  }

  if (status === "done") {
    return (
      <div className="join-done" role="status">
        <div className="join-done-mark" aria-hidden="true">
          ✓
        </div>
        <h3>Welcome aboard, {form.name.split(" ")[0]}.</h3>
        <p>We&apos;ve received your details and will reach out soon with next steps for the branch.</p>
        <p>To become an official IEEE member, complete your membership on the IEEE website too.</p>
        <a className="btn btn-primary" href="https://www.ieee.org/membership/join" target="_blank" rel="noopener noreferrer">
          Join IEEE →
        </a>
      </div>
    );
  }

  return (
    <div className="stepper">
      <ol className="stepper-steps" aria-label="Progress">
        {STEPS.map((label, i) => (
          <li key={label} className={i === step ? "is-current" : i < step ? "is-done" : ""} aria-current={i === step ? "step" : undefined}>
            <span className="stepper-num">{i < step ? "✓" : i + 1}</span>
            <span className="stepper-label">{label}</span>
          </li>
        ))}
      </ol>
      <div className="stepper-bar" aria-hidden="true">
        <div style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
      </div>

      <form
        className="stepper-body"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length - 1) goNext();
          else submit();
        }}
        noValidate
      >
        {step === 0 && (
          <div className="stepper-panel" key="s0">
            <Field id="j-name" label="Full name" error={errors.name}>
              <input id="j-name" value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={100} aria-invalid={Boolean(errors.name)} />
            </Field>
            <Field id="j-email" label="Email" error={errors.email}>
              <input id="j-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} />
            </Field>
            <div className="field-row">
              <Field id="j-dept" label="Department" error={errors.department}>
                <input id="j-dept" value={form.department} onChange={(e) => set("department", e.target.value)} placeholder="e.g. Computer Science" maxLength={100} aria-invalid={Boolean(errors.department)} />
              </Field>
              <Field id="j-year" label="Year" error={errors.year}>
                <select id="j-year" value={form.year} onChange={(e) => set("year", e.target.value)} aria-invalid={Boolean(errors.year)}>
                  <option value="">Select…</option>
                  {YEARS.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="stepper-panel" key="s1">
            <fieldset>
              <legend>Which societies interest you? (optional)</legend>
              <div className="check-grid">
                {societies.map((s) => (
                  <label key={s.code} className={`check${form.interests.includes(s.name) ? " is-on" : ""}`}>
                    <input type="checkbox" checked={form.interests.includes(s.name)} onChange={() => toggleInterest(s.name)} />
                    <span>{s.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <Field id="j-why" label="Why do you want to join? (optional)">
              <textarea id="j-why" value={form.why} onChange={(e) => set("why", e.target.value)} maxLength={1000} rows={4} />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="stepper-panel" key="s2">
            <dl className="review">
              <div><dt>Name</dt><dd>{form.name}</dd></div>
              <div><dt>Email</dt><dd>{form.email}</dd></div>
              <div><dt>Department</dt><dd>{form.department}</dd></div>
              <div><dt>Year</dt><dd>{form.year}</dd></div>
              <div><dt>Interests</dt><dd>{form.interests.length ? form.interests.join(", ") : "—"}</dd></div>
              {form.why && (
                <div><dt>Why join</dt><dd>{form.why}</dd></div>
              )}
            </dl>
          </div>
        )}

        <input type="text" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} />

        {status === "error" && (
          <p className="form-error" role="alert">
            Couldn&apos;t submit right now. Please try again in a moment.
          </p>
        )}

        <div className="stepper-actions">
          {step > 0 ? (
            <button type="button" className="btn btn-ghost" onClick={() => setStep((s) => s - 1)}>
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button type="submit" ref={submitBtn} className="btn btn-primary" disabled={status === "sending"}>
            {step < STEPS.length - 1 ? "Continue →" : status === "sending" ? "Submitting…" : "Submit →"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
