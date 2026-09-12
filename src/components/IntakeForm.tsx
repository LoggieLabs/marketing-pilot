import { useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { submitRequestAccess, type RequestFormData } from '../lib/requestAccess';

/**
 * The mailing-list form.
 *
 * It is also the smallest working demonstration of the product's thesis: what
 * you type is encrypted in your browser, the server stores ciphertext it cannot
 * read, and only an offline key on a laptop that is not connected to this site
 * can open it. The schema has no plaintext column — that is structural, not a
 * promise.
 *
 * The submit button's string, "Encrypting & Submitting…", is kept verbatim from
 * the previous build. It is the most honest sentence on the old site and it is
 * literally true.
 */
export function IntakeForm({ onSuccess }: { onSuccess?: () => void } = {}) {
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  // Bot bait. A real person never fills this in; the Worker rejects any
  // submission that carries a value.
  const [trap, setTrap] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // The wire shape is unchanged so the Worker and the offline decrypt tooling
    // keep working; the fields this form no longer asks for are simply empty.
    const payload: RequestFormData = {
      email,
      company: '',
      system: '',
      useCase: note,
      timeline: '',
      compliance: [],
    };

    try {
      const result = await submitRequestAccess(payload, 'request_access', trap);
      if (result.ok) {
        setIsSubmitted(true);
        onSuccess?.();
      } else {
        setSubmitError(result.error || 'That did not send. Try again, or email hello@loggielabs.com.');
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'That did not send. Try again, or email hello@loggielabs.com.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="card-material rounded-xl p-6">
        <p className="flex items-center gap-2.5 text-green-400 font-medium">
          <Check className="w-5 h-5 shrink-0" aria-hidden="true" />
          Encrypted and sent.
        </p>
        <p className="mt-3 text-sm text-gray-400 leading-relaxed">
          We'll write when mainnet opens. Nothing else — there is no newsletter.
        </p>
        <p className="mono text-2xs text-gray-400 mt-4">loggie.intake.v1</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-material rounded-xl p-6 relative">
      <label htmlFor="intake-email" className="block text-sm font-medium text-white mb-2">
        Your email
      </label>
      <input
        id="intake-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="input"
      />

      <label htmlFor="intake-note" className="block text-sm font-medium text-white mt-5 mb-2">
        Anything you want to tell us <span className="font-normal text-gray-400">(optional)</span>
      </label>
      <textarea
        id="intake-note"
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What you'd use it for, what put you off, what you'd need before you'd trust it."
        className="input resize-y"
      />

      {submitError ? (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {submitError}
        </p>
      ) : null}

      {/* Honeypot. Off-screen rather than display:none so naive bots still see it;
          hidden from assistive tech and skipped by the keyboard. */}
      <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
        <label htmlFor="intake-website">Website</label>
        <input
          id="intake-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !email}
        title="Your message is encrypted in your browser before it is sent. Our server stores the ciphertext and cannot read it."
        className="btn-primary w-full mt-6 py-3 inline-flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Encrypting &amp; Submitting…
          </>
        ) : (
          'Encrypt and send'
        )}
      </button>

      <p className="mono text-2xs text-gray-400 mt-4">loggie.intake.v1</p>
    </form>
  );
}
