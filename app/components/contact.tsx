'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type Errors = Record<string, string>;

const MAX_MSG = 800;

export default function ContactForm() {
  const nameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const messageId = useId();
  const hpId = useId(); // honeypot

  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: '', // honeypot
  });

  const progress = useAnimationControls();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  // Phone auto-format: (XXX) XXX-XXXX or +.. preserved
  function formatPhone(input: string) {
    const hasPlus = input.trim().startsWith('+');
    if (hasPlus) return input.replace(/[^\d+()\-\s]/g, '');
    const digits = input.replace(/\D/g, '').slice(0, 15);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`.trim();
  }

  function setField<K extends keyof typeof values>(k: K, v: string) {
    const next = k === 'phone' ? formatPhone(v) : v;
    setValues((s) => ({ ...s, [k]: next }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: '' }));
  }

  function validate(current = values) {
    const e: Errors = {};
    if (!current.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.email)) e.email = 'Enter a valid email.';
    if (current.phone && !/^[+()\-\d\s]{7,}$/.test(current.phone)) e.phone = 'Enter a valid phone.';
    if (current.message.trim().length < 10) e.message = 'Tell us a bit more (10+ chars).';
    if (current.message.length > MAX_MSG) e.message = `Keep it under ${MAX_MSG} characters.`;
    if (current.company) e.message = 'Spam detected.'; // honeypot
    return e;
  }

  function handleBlur<K extends keyof typeof values>(k: K) {
    setTouched((t) => ({ ...t, [k]: true }));
    const e = validate();
    if (e[k as string]) setErrors((prev) => ({ ...prev, [k as string]: e[k as string] }));
  }

  async function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const eNow = validate();
    setErrors(eNow);
    if (Object.keys(eNow).length) {
      // focus first field with error
      const firstKey = Object.keys(eNow)[0];
      const node = document.getElementById(
        firstKey === 'name' ? nameId :
        firstKey === 'email' ? emailId :
        firstKey === 'phone' ? phoneId :
        messageId
      );
      node?.focus();
      return;
    }

    setState('loading');
    statusRef.current?.focus();
    progress.start({ width: '20%' });
    try {
      progress.start({ width: '55%', transition: { duration: 0.5 } });
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      progress.start({ width: '90%', transition: { duration: 0.4 } });
      if (!res.ok) throw new Error('Request failed');
      setState('success');
      progress.start({ width: '100%', transition: { duration: 0.25 } });
      setValues({ name: '', email: '', phone: '', message: '', company: '' });
      setTouched({});
      setErrors({});
    } catch {
      setState('error');
    } finally {
      setTimeout(() => {
        progress.start({ width: '0%' }); // reset bar for next submit
        setState('idle');
      }, 3500);
    }
  }

  // textarea autoresize
  useEffect(() => {
    const ta = document.getElementById(messageId) as HTMLTextAreaElement | null;
    if (!ta) return;
    const on = () => { ta.style.height = '0px'; ta.style.height = ta.scrollHeight + 'px'; };
    on(); ta.addEventListener('input', on);
    return () => ta.removeEventListener('input', on);
  }, [messageId, values.message]);

  // Cmd/Ctrl+Enter to submit
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'enter') onSubmit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [values]);

  const msgCount = useMemo(() => values.message.length, [values.message]);
  const msgPct = Math.min(100, Math.round((msgCount / MAX_MSG) * 100));

  return (
    <div className="relative mx-auto max-w-4xl py-10">
      {/* Ambient gradient */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl"
        style={{
          background:
            'radial-gradient(80% 60% at 10% 0%, rgba(30,58,138,0.06), transparent 60%), radial-gradient(60% 50% at 100% 0%, rgba(245,158,11,0.08), transparent 60%)',
        }}
      />

      <form
        onSubmit={onSubmit}
        className="group relative overflow-hidden rounded-3xl border bg-white/80 p-6 shadow backdrop-blur-xl sm:p-8"
        style={{ borderColor: 'rgba(30,58,138,0.12)' }}
      >
        {/* interactive border glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-transparent"
          whileHover={{ boxShadow: '0 0 0 2px rgba(245,158,11,0.35), 0 30px 80px -40px rgba(30,58,138,0.35)' }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        />
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tell us about your project</h3>
            <p className="mt-1 text-sm text-gray-600">We’ll get back within 1 business day.</p>
          </div>
          {/* Status live region for SR */}
          <div
            ref={statusRef}
            tabIndex={-1}
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {state === 'loading' ? 'Sending…' : state === 'success' ? 'Message sent.' : state === 'error' ? 'Something went wrong.' : ''}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Name */}
          <Field
            id={nameId}
            label="Full name"
            value={values.name}
            error={touched.name ? errors.name : ''}
            onBlur={() => handleBlur('name')}
            onChange={(v) => setField('name', v)}
            autoComplete="name"
          />
          {/* Email */}
          <Field
            id={emailId}
            label="Email"
            type="email"
            value={values.email}
            error={touched.email ? errors.email : ''}
            onBlur={() => handleBlur('email')}
            onChange={(v) => setField('email', v)}
            autoComplete="email"
          />
          {/* Phone */}
          <Field
            id={phoneId}
            label="Phone (optional)"
            value={values.phone}
            error={touched.phone ? errors.phone : ''}
            onBlur={() => handleBlur('phone')}
            onChange={(v) => setField('phone', v)}
            autoComplete="tel"
          />

          {/* Honeypot (hidden) */}
          <div className="hidden">
            <label htmlFor={hpId}>Company</label>
            <input
              id={hpId}
              name="company"
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
            />
          </div>

          {/* Message (full width) */}
          <div className="md:col-span-2">
            <Textarea
              id={messageId}
              label="Project details"
              value={values.message}
              error={touched.message ? errors.message : ''}
              onBlur={() => handleBlur('message')}
              onChange={(v) => setField('message', v)}
              placeholder="Square footage, room types, timeline, budget range…"
            />
            {/* Character counter + progress */}
            <div className="mt-2 flex items-center justify-between">
              <div className="h-1 w-full rounded bg-gray-100">
                <div
                  className={`h-1 rounded ${msgPct > 90 ? 'bg-red-400' : msgPct > 70 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                  style={{ width: `${msgPct}%` }}
                  aria-hidden
                />
              </div>
              <span className={`ml-3 text-xs ${msgCount > MAX_MSG ? 'text-red-600' : 'text-gray-500'}`}>
                {msgCount}/{MAX_MSG}
              </span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500">
            Protected by spam checks • No marketing emails
          </span>

          <motion.button
            ref={btnRef}
            type="submit"
            whileTap={{ scale: 0.98 }}
            disabled={state === 'loading'}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-amber-600 disabled:opacity-60"
          >
            {/* progress bar inside button */}
            <motion.span
              initial={{ width: '0%' }}
              animate={progress}
              className="absolute left-0 top-0 h-full bg-white/15"
              aria-hidden
            />
            <AnimatePresence initial={false} mode="wait">
              {state === 'loading' ? (
                <motion.span
                  key="sending"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Spinner /> Sending…
                </motion.span>
              ) : state === 'success' ? (
                <motion.span
                  key="sent"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-2"
                >
                  <Checkmark /> Sent!
                </motion.span>
              ) : state === 'error' ? (
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
                >
                  Send message →
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Toasts */}
        <ToastArea>
          {state === 'success' && (
            <Toast intent="success" text="Thanks! We’ll be in touch shortly." />
          )}
          {state === 'error' && (
            <Toast intent="error" text="Something went wrong. Please try again." />
          )}
        </ToastArea>
      </form>
    </div>
  );
}

/* ---------- UI primitives ---------- */

function Field(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  const { id, label, value, onChange, onBlur, error, type = 'text', autoComplete } = props;
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`peer block w-full rounded-xl border px-4 pt-5 pb-2 text-sm text-gray-900 outline-none transition
          placeholder-transparent focus:ring-2
          ${error ? 'border-red-300 ring-red-200' : 'border-gray-200 focus:ring-amber-200'}`}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3 top-2.5 z-10 px-1 text-xs transition-all
          bg-white text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
          peer-focus:top-2.5 peer-focus:text-xs`}
      >
        {label}
      </label>
      {error && <p id={describedBy} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function Textarea(props: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
}) {
  const { id, label, value, onChange, onBlur, error, placeholder } = props;
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        rows={4}
        placeholder={label}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={`peer block w-full resize-none rounded-xl border px-4 pt-5 pb-2 text-sm text-gray-900 outline-none transition
          placeholder-transparent focus:ring-2
          ${error ? 'border-red-300 ring-red-200' : 'border-gray-200 focus:ring-amber-200'}`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-3 top-2.5 z-10 px-1 text-xs transition-all
          bg-white text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm
          peer-focus:top-2.5 peer-focus:text-xs`}
      >
        {label}
      </label>
      {error && <p id={describedBy} className="mt-1 text-xs text-red-600">{error}</p>}
      {placeholder && (
        <p className="mt-1 text-xs text-gray-500">{placeholder}</p>
      )}
    </div>
  );
}

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

/* Toast system (stackable) */
function ToastArea({ children }: { children: React.ReactNode }) {
  return (
    <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-3 right-3 z-50 flex flex-col gap-2">
      <AnimatePresence>{children}</AnimatePresence>
    </div>
  );
}

function Toast({ intent, text }: { intent: 'success' | 'error'; text: string }) {
  return (
    <motion.div
      initial={{ y: 16, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 16, opacity: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
      className={`pointer-events-auto rounded-lg px-4 py-2 text-sm text-white shadow-lg backdrop-blur
        ${intent === 'success' ? 'bg-emerald-600/95' : 'bg-red-600/95'}`}
      role="status"
    >
      {text}
    </motion.div>
  );
}
