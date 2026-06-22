"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Smile, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const contactDetails = [
  { icon: Phone, text: "+1 (555) 234-5678" },
  { icon: Mail, text: "hello@recipestudio.com" },
  { icon: MapPin, text: "123 Culinary Way, Suite 100, San Francisco" },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      // Replace with real API call when ready
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="relative min-h-screen bg-[#FFFDFB] px-6 py-20 lg:px-8">
      <div className="pointer-events-none absolute -top-40 right-1/4 h-80 w-80 rounded-full bg-orange-100/30 blur-3xl" />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-orange-600 ring-1 ring-orange-100/50">
            Get in touch
          </span>
          <h1 className="mt-4 font-serif text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl">
            Contact Our Kitchen
          </h1>
          <p className="mx-auto mt-3 max-w-md text-stone-500">
            Have questions about recipes, partnerships, or want to share
            feedback? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-stone-100 bg-white shadow-xl shadow-stone-100/40">
          <div className="grid md:grid-cols-[1.2fr_2fr]">
            {/* Left panel */}
            <div className="flex flex-col justify-between bg-gradient-to-br from-orange-500 to-rose-500 p-8 text-white md:p-10">
              <div className="space-y-8">
                <h2 className="font-serif text-2xl font-bold">Contact Info</h2>
                <p className="text-sm leading-relaxed text-orange-50/80">
                  Fill out the form and our culinary team will respond within 24
                  hours.
                </p>
                <div className="space-y-5 pt-4">
                  {contactDetails.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-3.5 text-sm"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                        <Icon size={16} />
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 text-xs text-orange-100/50">
                © 2026 Recipe Studio Inc.
              </div>
            </div>

            {/* Right panel — form or success */}
            <div className="bg-white p-8 md:p-10">
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="mx-auto mb-4 flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-orange-50 text-orange-500">
                    <Smile size={28} />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    Message Sent!
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-stone-500">
                    Thanks for reaching out! We will review your message and
                    reply as soon as possible.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 rounded-full bg-orange-500 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-orange-500/10 transition hover:bg-orange-600"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 animate-in fade-in duration-300"
                >
                  {[
                    {
                      id: "name",
                      label: "Name",
                      type: "text",
                      placeholder: "Your name",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      placeholder: "you@example.com",
                    },
                  ].map(({ id, label, type, placeholder }) => (
                    <div key={id}>
                      <label
                        htmlFor={id}
                        className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-400"
                      >
                        {label}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        required
                        value={form[id as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white"
                      />
                    </div>
                  ))}

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-400"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you cook today?"
                      className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-3.5 text-sm font-semibold text-white shadow-md shadow-orange-500/10 transition hover:bg-orange-600 disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending message…</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>

                  {status === "error" && (
                    <p className="mt-2 text-center text-xs font-semibold text-red-500">
                      Something went wrong. Please check your connection and try
                      again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
