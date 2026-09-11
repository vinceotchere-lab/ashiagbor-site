"use client";

import { useState } from "react";

// Static-site friendly: validates, then opens the visitor's mail client
// pre-addressed to Dr. Ashiagbor. To use a real endpoint instead, create a
// free Formspree form and replace handleSubmit with a POST to your form URL.

const TOPICS = [
  "Research collaboration",
  "Consultancy / project work",
  "PhD / MPhil supervision",
  "Speaking / media request",
  "Student enquiry",
  "Other",
];

const EMAIL = "gashiagbor.canr@knust.edu.gh";

type Errors = { name?: string; email?: string; message?: string };

export default function ConnectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/60 focus:ring-2 focus:ring-forest/30 ${
      bad ? "border-terra" : "border-line focus:border-forest"
    }`;

  const validate = (): boolean => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email address.";
    if (message.trim().length < 10)
      e.message = "Tell Dr. Ashiagbor a little more (10+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`[Website] ${topic} — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}\nTopic: ${topic}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="data-panel p-8 text-center">
        <h3 className="mt-3 font-display text-lg font-semibold text-ink">
          Your mail app should have opened
        </h3>
        <p className="mt-2 text-sm text-[#59656d]">
          If it didn&apos;t, email directly at{" "}
          <a href={`mailto:${EMAIL}`} className="font-semibold text-[#d96b28] hover:underline">
            {EMAIL}
          </a>
          . A response typically follows within a few working days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-semibold text-[#d96b28] hover:underline"
        >
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="data-panel space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Your name
          </label>
          <input
            id="cf-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ama Serwaa"
            className={inputCls(errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-terra">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Your email
          </label>
          <input
            id="cf-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputCls(errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-terra">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="cf-topic" className="mb-1.5 block text-sm font-semibold text-ink">
          What is this about?
        </label>
        <select
          id="cf-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className={inputCls()}
        >
          {TOPICS.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-ink">
          Message
        </label>
        <textarea
          id="cf-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell him about your project, research idea, or question…"
          className={`${inputCls(errors.message)} resize-y`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-terra">{errors.message}</p>
        )}
      </div>

      <button type="submit" className="btn-primary w-full justify-center sm:w-auto">
        Send message →
      </button>
      <p className="text-xs text-muted">
        Opens your mail app addressed to {EMAIL}. Nothing is stored on this site.
      </p>
    </form>
  );
}
