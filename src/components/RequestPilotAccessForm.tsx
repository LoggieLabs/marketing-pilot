import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { submitRequestAccess, type RequestFormData } from '../lib/requestAccess';

const useCaseOptions = [
  { value: '', label: 'Select use case...' },
  { value: 'ai-audit', label: 'Automated decision traceability' },
  { value: 'compliance', label: 'Audit / regulatory record integrity' },
  { value: 'legal', label: 'Evidence integrity / chain-of-custody' },
  { value: 'data-integrity', label: 'System log integrity' },
  { value: 'files', label: 'Document notarization' },
  { value: 'other', label: 'Other' },
];

const timelineOptions = [
  { value: '', label: 'Select timeline...' },
  { value: '0-30', label: '0-30 days' },
  { value: '30-90', label: '30-90 days' },
  { value: '90+', label: '90+ days' },
];

const complianceOptions = [
  { value: 'hipaa', label: 'HIPAA' },
  { value: 'cjis', label: 'CJIS' },
  { value: 'glba', label: 'GLBA' },
  { value: 'finra', label: 'SEC / FINRA' },
  { value: 'sox', label: 'SOX' },
  { value: 'fedramp', label: 'FedRAMP' },
  { value: 'soc2', label: 'SOC 2' },
  { value: 'gov', label: 'Government' },
  { value: 'state', label: 'State regulators' },
];

interface RequestPilotAccessFormProps {
  /** Called after successful form submission */
  onSuccess?: () => void;
  /** Compact mode for modal display */
  compact?: boolean;
  /** Request kind for categorization */
  kind?: 'request_access' | 'request_pilot_access';
}

export function RequestPilotAccessForm({
  onSuccess,
  compact = false,
  kind = 'request_pilot_access'
}: RequestPilotAccessFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    email: '',
    company: '',
    system: '',
    useCase: '',
    timeline: '',
    compliance: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitRequestAccess(formData, kind);

      if (result.ok) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComplianceChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      compliance: prev.compliance.includes(value)
        ? prev.compliance.filter(c => c !== value)
        : [...prev.compliance, value],
    }));
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      email: '',
      company: '',
      system: '',
      useCase: '',
      timeline: '',
      compliance: [],
    });
  };

  if (isSubmitted) {
    return (
      <div className={`text-center ${compact ? 'py-6' : 'py-10'}`}>
        <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20
                        flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          Request Submitted
        </h3>
        <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto">
          Your pilot evaluation request has been securely submitted.
        </p>
        <p className="text-gray-500 text-xs mb-6 max-w-xs mx-auto">
          We typically respond within 1–2 business days to schedule a scoping call.
        </p>

        <button
          onClick={() => {
            resetForm();
            onSuccess?.();
          }}
          className="text-loggie-purple hover:text-loggie-cyan transition-colors text-sm"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label htmlFor="pilot-email" className="block text-sm font-medium text-gray-300 mb-2">
          Work Email *
        </label>
        <input
          type="email"
          id="pilot-email"
          required
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input"
          placeholder="you@company.com"
        />
      </div>

      {/* Company */}
      <div>
        <label htmlFor="pilot-company" className="block text-sm font-medium text-gray-300 mb-2">
          Company / Organization *
        </label>
        <input
          type="text"
          id="pilot-company"
          required
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="input"
          placeholder="Acme Corp"
        />
      </div>

      {/* System / Workflow */}
      <div>
        <label htmlFor="pilot-system" className="block text-sm font-medium text-gray-300 mb-2">
          System / workflow to evaluate (1–2 sentences)
        </label>
        <textarea
          id="pilot-system"
          value={formData.system}
          onChange={(e) => setFormData({ ...formData, system: e.target.value })}
          className="input min-h-[80px] resize-none"
          placeholder="E.g., AI underwriting assist, document intake, approval audit trail..."
        />
      </div>

      {/* Use Case */}
      <div>
        <label htmlFor="pilot-usecase" className="block text-sm font-medium text-gray-300 mb-2">
          Primary Use Case *
        </label>
        <select
          id="pilot-usecase"
          required
          value={formData.useCase}
          onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
          className="input"
        >
          {useCaseOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="pilot-timeline" className="block text-sm font-medium text-gray-300 mb-2">
          Implementation Timeline
        </label>
        <select
          id="pilot-timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          className="input"
        >
          {timelineOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Compliance */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Compliance Requirements (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {complianceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleComplianceChange(opt.value)}
              className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                formData.compliance.includes(opt.value)
                  ? 'bg-loggie-purple/20 border-loggie-purple text-loggie-purple'
                  : 'bg-loggie-dark border-gray-700 text-gray-400 hover:border-gray-600'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error message */}
      {submitError && (
        <div className="flex items-start gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{submitError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-loggie-purple/90 hover:bg-loggie-purple disabled:opacity-50
                   text-white font-semibold rounded-lg transition-colors
                   flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Encrypting & Submitting...
          </>
        ) : (
          <>
            Request Pilot Evaluation
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Pilot scope hint */}
      <p className="text-gray-500 text-xs text-center pt-1">
        Typical pilot: 60–90 days · scoped to one system/workflow · evaluation-focused
      </p>

      <p className="text-gray-500 text-xs text-center pt-2">
        We'll respond by email to schedule a short scoping call. Sensitive details can be shared after NDA if needed.
      </p>
    </form>
  );
}
