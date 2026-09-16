'use client';

import { useId, useState, type FormEvent } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SERVICES, site } from '@/lib/site';
import { cn } from '@/lib/cn';

/**
 * CONNECTING A BACKEND
 * --------------------
 * Set NEXT_PUBLIC_QUOTE_ENDPOINT to any URL that accepts a JSON POST -
 * a Netlify Function, Formspree, HighLevel webhook, a /api route, anything.
 * The payload shape is the `QuotePayload` type below.
 *
 * With no endpoint configured the form validates, shows the real submitting
 * and success states, and logs the payload - so the flow can be demonstrated
 * end to end without wiring anything up first.
 */
const ENDPOINT = process.env.NEXT_PUBLIC_QUOTE_ENDPOINT;

export type QuotePayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  details: string;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<keyof QuotePayload, string>>;

const EMPTY: QuotePayload = { name: '', phone: '', email: '', service: '', details: '' };

function validate(values: QuotePayload): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.phone.trim()) {
    errors.phone = 'Please enter a phone number.';
  } else if (values.phone.replace(/\D/g, '').length < 10) {
    errors.phone = 'Please enter a full 10-digit phone number.';
  }
  if (!values.email.trim()) {
    errors.email = 'Please enter an email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please check this email address.';
  }
  if (!values.service) errors.service = 'Please choose a service.';
  return errors;
}

export function QuoteForm() {
  const [values, setValues] = useState<QuotePayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formId = useId();

  const set = (key: keyof QuotePayload) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the field is being corrected.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = document.getElementById(`${formId}-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }

    setStatus('submitting');
    try {
      if (ENDPOINT) {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      } else {
        // eslint-disable-next-line no-console
        console.info('[quote form] no endpoint configured. Payload:', values);
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setStatus('success');
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-lift sm:min-h-[32rem] sm:rounded-3xl sm:p-12"
        role="status"
        aria-live="polite"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="size-7" strokeWidth={1.9} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">Request received</h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-600">
          Thanks for getting in touch. We will review the details and get back to you with a free
          quote. If it is urgent, calling is the fastest way to reach us.
        </p>
        <Button href={`tel:${site.phone.raw}`} variant="dark" size="lg" className="mt-7">
          <Phone className="size-4" strokeWidth={2.25} aria-hidden="true" />
          <span className="tnum">{site.phone.display}</span>
        </Button>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-5 text-sm font-medium text-ink-500 underline underline-offset-4 transition-colors hover:text-ink-900"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-title`}
      className="rounded-2xl bg-white p-5 shadow-lift sm:rounded-3xl sm:p-8 lg:p-10"
    >
      <h3 id={`${formId}-title`} className="font-display text-xl font-bold text-ink-900">
        Request a free quote
      </h3>
      <p className="mt-1.5 text-sm text-ink-500">
        Takes about a minute. No obligation, no pressure.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-7 sm:gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          label="Name"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
        <Field
          id={`${formId}-phone`}
          label="Phone"
          type="tel"
          required
          inputMode="tel"
          autoComplete="tel"
          placeholder="(909) 555-0134"
          value={values.phone}
          onChange={set('phone')}
          error={errors.phone}
        />
        <Field
          id={`${formId}-email`}
          label="Email"
          type="email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="jane@example.com"
          value={values.email}
          onChange={set('email')}
          error={errors.email}
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-service`} required>
            Service needed
          </Label>
          <div className="relative">
            <select
              id={`${formId}-service`}
              name="service"
              required
              value={values.service}
              onChange={(e) => set('service')(e.target.value)}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={errors.service ? `${formId}-service-error` : undefined}
              className={cn(
                'w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-11 text-[0.9375rem] text-ink-900 transition-colors duration-200',
                'focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12 focus:outline-none',
                values.service === '' && 'text-ink-400',
                errors.service ? 'border-red-400' : 'border-ink-900/12 hover:border-ink-900/25',
              )}
            >
              <option value="">Select a service</option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
              <option value="Multiple services">Multiple services</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-400"
            >
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                <path
                  d="M1 1.5 6 6.5l5-5"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          <FieldError id={`${formId}-service-error`} message={errors.service} />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor={`${formId}-details`}>Property or project details</Label>
          <textarea
            id={`${formId}-details`}
            name="details"
            rows={4}
            value={values.details}
            onChange={(e) => set('details')(e.target.value)}
            placeholder="Roughly what needs cleaning, the property type, and anything we should know about access."
            className="w-full resize-y rounded-xl border border-ink-900/12 bg-white px-4 py-3 text-[0.9375rem] text-ink-900 transition-colors duration-200 placeholder:text-ink-400 hover:border-ink-900/25 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12 focus:outline-none"
          />
        </div>
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>
            Something went wrong sending that. Please try again, or call us at{' '}
            <a href={`tel:${site.phone.raw}`} className="tnum font-semibold underline">
              {site.phone.display}
            </a>
            .
          </span>
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="size-4 animate-spin" strokeWidth={2.5} aria-hidden="true" />
            Sending&hellip;
          </>
        ) : (
          <>
            Request a Free Quote
            <ArrowRight
              className="size-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover/btn:translate-x-1"
              strokeWidth={2.5}
              aria-hidden="true"
            />
          </>
        )}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-ink-400">
        We use your details to prepare your quote and get back to you. Nothing else.
      </p>
    </form>
  );
}

/* ---------------------------------------------------------------- pieces -- */

function Label({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.8125rem] font-semibold tracking-wide text-ink-700"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-brand-600" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-red-600">
      <AlertCircle className="size-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = 'text',
  className,
  ...rest
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  type?: string;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'id' | 'value' | 'onChange' | 'type' | 'className'>) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id.split('-').pop()}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-3 text-[0.9375rem] text-ink-900 transition-colors duration-200',
          'placeholder:text-ink-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/12 focus:outline-none',
          error ? 'border-red-400' : 'border-ink-900/12 hover:border-ink-900/25',
        )}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
