"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import Image from "next/image";

type FormState = "idle" | "loading" | "success" | "error";
type Errors = Record<string, string>;

const MAX_MSG = 800;

export default function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();
  const hpId = useId(); // honeypot

  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "", // honeypot
  });

  const progress = useAnimationControls();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- Phone Formatting ---------------- */
  const formatPhone = useCallback((input: string) => {
    const hasPlus = input.trim().startsWith("+");
    if (hasPlus) return input.replace(/[^\d+()\-\s]/g, "");
    const digits = input.replace(/\D/g, "").slice(0, 15);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`.trim();
  }, []);

  const setField = useCallback(
    <K extends keyof typeof values>(k: K, v: string) => {
      const next = k === "phone" ? formatPhone(v) : v;
      setValues((s) => ({ ...s, [k]: next }));
      if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
    },
    [errors, formatPhone]
  );

  /* ---------------- Validation ---------------- */
  const validate = useCallback(
    (current = values) => {
      const e: Errors = {};
      if (!current.name.trim()) e.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.email))
        e.email = "Enter a valid email.";
      if (current.phone && !/^[+()\-\d\s]{7,}$/.test(current.phone))
        e.phone = "Enter a valid phone.";
      if (current.message.trim().length < 10)
        e.message = "Tell us a bit more (10+ characters).";
      if (current.message.length > MAX_MSG)
        e.message = `Keep it under ${MAX_MSG} characters.`;
      if (current.company) e.message = "Spam detected."; // honeypot
      return e;
    },
    [values]
  );

  function handleBlur<K extends keyof typeof values>(k: K) {
    setTouched((t) => ({ ...t, [k]: true }));
    const e = validate();
    if (e[k as string]) setErrors((prev) => ({ ...prev, [k as string]: e[k as string] }));
  }

  /* ---------------- Submit Handler ---------------- */
  const onSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault();
      const eNow = validate();
      setErrors(eNow);

      if (Object.keys(eNow).length) {
        const firstKey = Object.keys(eNow)[0];
        const node = document.getElementById(
          firstKey === "name"
            ? nameId
            : firstKey === "email"
            ? emailId
            : firstKey === "phone"
            ? phoneId
            : messageId
        );
        node?.focus();
        return;
      }

      setState("loading");
      statusRef.current?.focus();
      progress.start({ width: "20%" });

      try {
        progress.start({ width: "55%", transition: { duration: 0.5 } });
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        progress.start({ width: "90%", transition: { duration: 0.4 } });
        if (!res.ok) throw new Error("Request failed");

        setState("success");
        progress.start({ width: "100%", transition: { duration: 0.25 } });

        setValues({ name: "", email: "", phone: "", message: "", company: "" });
        setTouched({});
        setErrors({});
      } catch {
        setState("error");
      } finally {
        setTimeout(() => {
          progress.start({ width: "0%" });
          setState("idle");
        }, 3500);
      }
    },
    [validate, nameId, emailId, phoneId, messageId, values, progress]
  );

  /* ---------------- Textarea autoresize ---------------- */
  useEffect(() => {
    const ta = document.getElementById(messageId) as HTMLTextAreaElement | null;
    if (!ta) return;
    const on = () => {
      ta.style.height = "0px";
      ta.style.height = ta.scrollHeight + "px";
    };
    on();
    ta.addEventListener("input", on);
    return () => ta.removeEventListener("input", on);
  }, [messageId, values.message]);

  /* ---------------- Ctrl+Enter submit ---------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "enter") onSubmit();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSubmit]);

  const msgCount = useMemo(() => values.message.length, [values.message]);
  const msgPct = Math.min(100, Math.round((msgCount / MAX_MSG) * 100));

  /* ======================================================
     NEW — MOBILE KEYBOARD “DONE” BAR
     ====================================================== */
  const [showDone, setShowDone] = useState(false);

  useEffect(() => {
    const onFocus = () => {
      if (window.innerWidth < 640) setShowDone(true);
    };
    const onBlur = () => {
      setTimeout(() => setShowDone(false), 120);
    };

    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);

    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, []);

  const closeKeyboard = () => {
    (document.activeElement as HTMLElement)?.blur?.();
  };

  /* -------------------------------------------------- */
  /* --------------------- RETURN ---------------------- */
  /* -------------------------------------------------- */

  return (
    <div className="relative">

      {/* NEW — Floating Done button (iOS-like) */}
      {showDone && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden 
                        bg-white/95 backdrop-blur border-t border-gray-200 
                        flex justify-end px-4 py-2 z-[9999]">
          <button
            onClick={closeKeyboard}
            className="text-amber-600 font-semibold text-sm px-3 py-1"
          >
            Done
          </button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="
          relative rounded-3xl bg-white
          px-5 py-7 sm:px-10 sm:py-10
          shadow-[0_4px_30px_rgba(0,0,0,0.06)]
          border border-gray-100
          overflow-hidden
        "
      >

        {/* Hover / focus glow on larger screens */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent hidden sm:block"
          whileHover={{
            boxShadow:
              "0 0 0 1px rgba(250,204,21,0.45), 0 30px 90px -25px rgba(0,0,0,0.45)",
          }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
        />

        {/* ---------------- HEADER ---------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="font-semibold text-xl sm:text-2xl text-black leading-tight tracking-tight">
              Tell us about your project
            </h1>
            <p className="text-xs sm:text-sm text-gray-600">
              Share a few details and we’ll get back to you within one business day.
            </p>
          </div>

          <div className="flex-shrink-0 hidden md:block">
            <Image
              src="/images/fulllogo_transparent_nobuffer.png"
              className="w-16 h-14  "
              alt="Marclin Electric logo"
              width={50}
              height={50}
            />
          </div>
        </div>

        {/* Screen reader updates */}
        <div
          ref={statusRef}
          tabIndex={-1}
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {state === "loading"
            ? "Sending…"
            : state === "success"
            ? "Message sent."
            : state === "error"
            ? "Something went wrong."
            : ""}
        </div>

        {/* ---------------- INPUTS ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 md:grid-cols-2">
          <Field
            id={nameId}
            label="Full name"
            name="name"
            value={values.name}
            error={touched.name ? errors.name : ""}
            onBlur={() => handleBlur("name")}
            onChange={(v) => setField("name", v)}
            autoComplete="name"
            required
          />

          <Field
            id={emailId}
            label="Email"
            name="email"
            type="email"
            value={values.email}
            error={touched.email ? errors.email : ""}
            onBlur={() => handleBlur("email")}
            onChange={(v) => setField("email", v)}
            autoComplete="email"
            required
          />

          <Field
            id={phoneId}
            label="Phone (optional)"
            name="phone"
            type="tel"
            value={values.phone}
            error={touched.phone ? errors.phone : ""}
            onBlur={() => handleBlur("phone")}
            onChange={(v) => setField("phone", v)}
            autoComplete="tel"
          />

          {/* Honeypot */}
          <div className="hidden">
            <label htmlFor={hpId}>Company</label>
            <input
              id={hpId}
              name="company"
              value={values.company}
              onChange={(e) => setField("company", e.target.value)}
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <Textarea
              id={messageId}
              label="Project details"
              name="message"
              value={values.message}
              error={touched.message ? errors.message : ""}
              onBlur={() => handleBlur("message")}
              onChange={(v) => setField("message", v)}
              placeholder="Square footage, room types, timeline, budget, goals…"
              required
            />

            {/* Character Counter */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="h-1 w-full rounded bg-gray-100">
                <div
                  aria-hidden
                  className={`
                    h-1 rounded 
                    ${msgPct > 90
                      ? "bg-red-400"
                      : msgPct > 70
                      ? "bg-amber-400"
                      : "bg-emerald-400"}
                  `}
                  style={{ width: `${msgPct}%` }}
                />
              </div>

              <span
                className={`
                  text-[11px] sm:text-xs font-medium whitespace-nowrap
                  ${msgCount > MAX_MSG ? "text-red-600" : "text-gray-700"}
                `}
              >
                {msgCount}/{MAX_MSG}
              </span>
            </div>
          </div>
        </div>

        {/* ---------------- FOOTER BUTTON ---------------- */}
        <div className="mt-8 sm:mt-9 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-gray-500 leading-tight">
            Protected by spam checks • No marketing emails
          </p>

          <motion.button
            ref={btnRef}
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={state === "loading"}
            className="
              relative inline-flex items-center gap-2 rounded-full 
              px-6 py-3 sm:px-8 sm:py-4
              bg-red-500 hover:bg-red-500/80
              text-sm sm:text-base font-semibold text-white
              shadow-md shadow-amber-500/20
              disabled:opacity-50
              transition-all overflow-hidden cursor-pointer
            "
          >
            {/* animated loading bar */}
            <motion.span
              initial={{ width: "0%" }}
              animate={progress}
              aria-hidden
              className="absolute inset-y-0 left-0 h-full bg-white/20"
            />

            <AnimatePresence mode="wait" initial={false}>
              {state === "loading" ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Spinner /> Sending…
                </motion.span>
              ) : state === "success" ? (
                <motion.span
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Checkmark /> Sent!
                </motion.span>
              ) : state === "error" ? (
                <motion.span
                  key="error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Crossmark /> Retry
                </motion.span>
              ) : (
                <motion.span
                  key="default"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center text-center"
                >
                  Send 
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Toasts */}
        <ToastArea>
          {state === "success" && (
            <Toast intent="success" text="Thanks! We’ll be in touch shortly." />
          )}
          {state === "error" && (
            <Toast intent="error" text="Something went wrong. Please try again." />
          )}
        </ToastArea>
      </form>
    </div>
  );
}

/* =======================================================
   ---------------------- UI PRIMITIVES -------------------
   ======================================================= */

function Field(props: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const {
    id,
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    type = "text",
    autoComplete,
    required,
  } = props;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        placeholder={label}
        required={required}
        className={`
          peer block w-full rounded-xl border 
          px-4 pt-5 pb-2
          text-[15px] text-gray-900
          placeholder-transparent focus:ring-2
          ${error ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-amber-300"}
        `}
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none absolute left-4 top-2
          z-10 px-1 rounded bg-white
          text-xs text-gray-600
          transition-all
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
          peer-focus:top-2 peer-focus:text-xs
        `}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {error && (
        <p id={describedBy} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function Textarea(props: {
  id: string;
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const { id, label, name, value, onChange, onBlur, error, placeholder, required } =
    props;
  const describedBy = error ? `${id}-error` : undefined;

  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={4}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        required={required}
        className={`
          peer block w-full resize-none rounded-xl border 
          px-4 pt-7 pb-3
          text-[15px] text-gray-900
          outline-none transition
          placeholder-transparent focus:ring-2
          ${error ? "border-red-300 ring-red-200" : "border-gray-300 focus:ring-amber-300"}
        `}
      />

      <label
        htmlFor={id}
        className={`
          pointer-events-none absolute left-4 top-2 
          z-10 px-1 rounded bg-white
          text-xs text-gray-600
          transition-all
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm
          peer-focus:top-2 peer-focus:text-xs
        `}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      {error && (
        <p id={describedBy} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}

      {placeholder && (
        <p className="mt-1 text-xs text-gray-500">{placeholder}</p>
      )}
    </div>
  );
}

/* ---------------- Spinner / Icons ---------------- */

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
  );
}

function Checkmark() {
  return (
    <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <motion.path
        d="M20 6L9 17l-5-5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
    </motion.svg>
  );
}

function Crossmark() {
  return (
    <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <motion.path
        d="M18 6L6 18M6 6l12 12"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35 }}
      />
    </motion.svg>
  );
}

/* ---------------- Toast System ---------------- */

function ToastArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-3 right-3 z-50 flex flex-col gap-2"
    >
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
}

function Toast({ intent, text }: { intent: "success" | "error"; text: string }) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 16, opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={`pointer-events-auto rounded-lg px-4 py-2 text-xs sm:text-sm text-white shadow-lg backdrop-blur
        ${intent === "success" ? "bg-emerald-600/95" : "bg-red-600/95"}
      `}
      role="status"
    >
      {text}
    </motion.div>
  );
}
