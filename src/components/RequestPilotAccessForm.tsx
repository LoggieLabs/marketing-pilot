import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, Mail, Copy, Check } from 'lucide-react';

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
}

export function RequestPilotAccessForm({ onSuccess, compact = false }: RequestPilotAccessFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    system: '',
    useCase: '',
    timeline: '',
    compliance: [] as string[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate brief processing delay then show success
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 300);
  };

  // Build email content
  const getEmailSubject = () => 'Loggie Pilot Evaluation Request';

  const getUseCaseLabel = (value: string) =>
    useCaseOptions.find(o => o.value === value)?.label || value || 'Not specified';

  const getEmailBody = () =>
    `Pilot Evaluation Request\n\n` +
    `Email: ${formData.email}\n` +
    `Company/Organization: ${formData.company}\n` +
    `System/Workflow: ${formData.system || 'Not specified'}\n` +
    `Use Case: ${getUseCaseLabel(formData.useCase)}\n` +
    `Timeline: ${formData.timeline || 'Not specified'}\n` +
    `Compliance Requirements: ${formData.compliance.join(', ') || 'None specified'}`;

  const getMailtoLink = () => {
    const subject = encodeURIComponent(getEmailSubject());
    const body = encodeURIComponent(getEmailBody());
    return `mailto:contact@omnituum.com?subject=${subject}&body=${body}`;
  };

  const handleCopyMessage = async () => {
    const message = `Subject: ${getEmailSubject()}\n\n${getEmailBody()}`;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = message;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
          Draft Ready
        </h3>
        <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto">
          Your pilot evaluation request is ready. Choose how to send:
        </p>
        <p className="text-gray-500 text-xs mb-6 max-w-xs mx-auto">
          We typically reply within 1–2 business days with next steps.
        </p>

        {/* Primary: Open Email Draft */}
        <a
          href={getMailtoLink()}
          className="flex items-center justify-center gap-2 w-full px-5 py-3
                     bg-loggie-purple hover:bg-loggie-purple/90
                     text-white font-semibold rounded-lg transition-colors mb-3"
        >
          <Mail className="w-5 h-5" />
          Open Email Draft
        </a>

        {/* Secondary: Copy Message */}
        <button
          onClick={handleCopyMessage}
          className="flex items-center justify-center gap-2 w-full px-5 py-3
                     bg-loggie-dark border border-gray-700 hover:border-gray-600
                     text-gray-300 hover:text-white font-medium rounded-lg transition-colors mb-5"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              Copy Message
            </>
          )}
        </button>

        {/* Tertiary: Direct email */}
        <p className="text-gray-500 text-xs mb-4">
          Or email us directly at{' '}
          <span className="text-gray-400 select-all">contact@omnituum.com</span>
        </p>

        <button
          onClick={() => {
            resetForm();
            setCopied(false);
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
            Submitting...
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
