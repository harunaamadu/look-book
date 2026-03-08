"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";
import Link from "next/link";

const contactMethods = [
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hello@look.com",
    note: "We reply within 24 hours",
    href: "mailto:hello@look.com",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.06 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
      </svg>
    ),
    label: "Phone",
    value: "+233 24 858 4525",
    note: "Mon–Fri, 9am–6pm GMT",
    href: "tel:+233248584525",
  },
  {
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Studio",
    value: "Anoah Road, Ga - East, Kwabenya - Ghana",
    note: "By appointment only",
    href: "https://maps.google.com/",
  },
];

type FormState = "idle" | "loading" | "success";

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [activeMethod, setActiveMethod] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
    showToast.subscribed("message sent");
  }

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-sm tracking-[0.5em] uppercase text-stone-400 mb-4">
            Get in touch
          </p>
          <h1
            className="text-5xl md:text-6xl font-normal text-stone-900 leading-none tracking-tight"
          >
            We&apos;d love to <br />
            <em className="not-italic text-stone-400">hear from you.</em>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16">
          {/* LEFT — contact methods */}
          <div className="flex flex-col gap-10">
            {/* Contact cards */}
            <div className="flex flex-col gap-4">
              {contactMethods.map((method) => (
                <Link
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveMethod(method.label)}
                  onMouseLeave={() => setActiveMethod(null)}
                  className={`group flex items-start gap-5 p-6 border transition-all duration-300 ${
                    activeMethod === method.label
                      ? "border-stone-900 bg-white shadow-sm"
                      : "border-stone-200 bg-white hover:border-stone-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-300 ${
                      activeMethod === method.label
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
                      {method.label}
                    </p>
                    <p className="text-sm text-stone-900 group-hover:text-stone-600 transition-colors">
                      {method.value}
                    </p>
                    <p className="text-xs text-stone-400">{method.note}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Response time note */}
            <div className="border-l-2 border-stone-900 pl-5">
              <p className="text-sm text-stone-600 leading-relaxed">
                Our customer care team is available Monday to Friday, 9am–6pm
                GMT. We aim to respond to all enquiries within one business day.
              </p>
            </div>

            {/* Social */}
            <div>
              <p className="text-[9px] tracking-[0.45em] uppercase text-stone-400 mb-4">
                Follow us
              </p>
              <div className="flex gap-3">
                {["Instagram", "Pinterest", "TikTok"].map((s) => (
                  <Link
                    key={s}
                    href="#"
                    className="px-4 py-2 border border-stone-200 text-xs tracking-[0.3em] uppercase text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="bg-white border border-stone-200 p-8 md:p-10">
            {formState === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12l6 6L20 6"
                      stroke="#1a1a18"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xl font-light text-stone-900 mb-2"
                  >
                    Message received.
                  </p>
                  <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
                    Thank you for reaching out. A member of our team will be in
                    touch within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="text-xs tracking-[0.35em] uppercase text-stone-400 underline underline-offset-4 hover:text-stone-900 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p
                    className="text-xl font-light text-stone-900 mb-1"
                  >
                    Send a message
                  </p>
                  <p className="text-xs text-stone-400 tracking-wide">
                    Fill out the form and we&apos;ll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="First name" name="firstName" required />
                    <Field label="Last name" name="lastName" required />
                  </div>
                  <Field
                    label="Email address"
                    name="email"
                    type="email"
                    required
                  />
                  <Field
                    label="Order number"
                    name="order"
                    placeholder="Optional — e.g. ORD-12345"
                  />

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
                      Subject
                    </label>
                    <select
                      name="subject"
                      required
                      className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 focus:outline-none focus:border-stone-900 transition-colors appearance-none"
                    >
                      <option value="">Select a topic</option>
                      <option>Order enquiry</option>
                      <option>Returns & exchanges</option>
                      <option>Product question</option>
                      <option>Shipping & delivery</option>
                      <option>Press & partnerships</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full bg-stone-900 text-white py-4 text-sm tracking-[0.35em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-60 mt-2"
                  >
                    {formState === "loading" ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-3.5 h-3.5 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="32"
                            strokeDashoffset="12"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[9px] tracking-[0.4em] uppercase text-stone-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        className="border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-900 placeholder:text-stone-300 focus:outline-none focus:border-stone-900 transition-colors"
      />
    </div>
  );
}
