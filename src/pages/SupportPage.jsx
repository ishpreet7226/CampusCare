import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Sparkles,
  GraduationCap,
  Heart,
  DollarSign,
  Home,
  Briefcase,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Edit3,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Play,
} from 'lucide-react';
import {
  classifyRequest,
  generateReason,
  assignPriority,
  generateCaseId,
  DEMO_EXAMPLES,
} from '../data/triageData';
import './SupportPage.css';

const ICON_MAP = {
  GraduationCap: GraduationCap,
  Heart: Heart,
  DollarSign: DollarSign,
  Home: Home,
  Briefcase: Briefcase,
  HelpCircle: HelpCircle,
};

const CHIP_EXAMPLES = [
  'Academic difficulty',
  'Feeling overwhelmed',
  'Financial concern',
  'Accommodation issue',
  'Career guidance',
];

const CHIP_MAP = {
  'Academic difficulty': "I'm struggling to keep up with my coursework and don't know who to contact.",
  'Feeling overwhelmed': "I've been feeling really stressed and overwhelmed with everything lately.",
  'Financial concern': "I'm worried about paying my tuition fees and other expenses this semester.",
  'Accommodation issue': 'I need help with my campus housing situation and room allocation.',
  'Career guidance': "I'm looking for guidance on finding an internship or work placement.",
};

export default function SupportPage() {
  const navigate = useNavigate();

  // Steps: 'input' → 'analyzing' → 'result' → 'creating' → 'success'
  const [step, setStep] = useState('input');
  const [message, setMessage] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState('');
  const [demoOpen, setDemoOpen] = useState(false);

  function handleChipClick(chip) {
    setMessage(CHIP_MAP[chip] || chip);
    setError('');
  }

  function handleSubmit() {
    if (!message.trim()) {
      setError('Please describe what you need help with.');
      return;
    }
    if (message.trim().length < 5) {
      setError('Please provide a bit more detail so we can help you.');
      return;
    }
    setError('');
    setStep('analyzing');

    // Simulate AI analysis
    setTimeout(() => {
      const category = classifyRequest(message);
      const reason = generateReason(message, category);
      const priority = assignPriority(message, category);
      setTriageResult({ category, reason, priority });
      setStep('result');
    }, 1800);
  }

  function handleCreateCase() {
    setStep('creating');

    setTimeout(() => {
      const caseId = generateCaseId();
      const newCase = {
        id: caseId,
        message: message,
        category: triageResult.category.label,
        department: triageResult.category.department,
        service: triageResult.category.service,
        priority: triageResult.priority,
        reason: triageResult.reason,
        status: 'Open',
        progressStep: 1, // 0=Submitted, 1=Assigned, 2=In Progress, 3=Resolved
        createdAt: new Date().toISOString(),
        color: triageResult.category.color,
        responseTime: triageResult.category.responseTime,
      };

      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('campuscare_cases') || '[]');
      existing.unshift(newCase);
      localStorage.setItem('campuscare_cases', JSON.stringify(existing));

      setCaseData(newCase);
      setStep('success');
    }, 1200);
  }

  function handleEditRequest() {
    setStep('input');
    setTriageResult(null);
    setCaseData(null);
  }

  function handleDemoExample(example) {
    setMessage(example.text);
    setStep('input');
    setTriageResult(null);
    setCaseData(null);
    setError('');
    setDemoOpen(false);
  }

  function handleReset() {
    setStep('input');
    setMessage('');
    setTriageResult(null);
    setCaseData(null);
    setError('');
  }

  const CategoryIcon = triageResult ? ICON_MAP[triageResult.category.icon] : null;

  return (
    <main className="support-page">
      <div className="container container--narrow">

        {/* ===== DEMO PANEL ===== */}
        <div className="demo-panel animate-fadeIn">
          <button
            className="demo-panel__toggle"
            onClick={() => setDemoOpen(!demoOpen)}
          >
            <Play size={16} />
            <span>Demo Examples</span>
            {demoOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {demoOpen && (
            <div className="demo-panel__content animate-fadeIn">
              <p className="demo-panel__hint">
                Click an example to pre-fill the input and test Smart Triage:
              </p>
              <div className="demo-panel__list">
                {DEMO_EXAMPLES.map((example, idx) => (
                  <button
                    key={idx}
                    className="demo-panel__item"
                    onClick={() => handleDemoExample(example)}
                  >
                    <span className="demo-panel__item-label">{example.label}</span>
                    <span className="demo-panel__item-text">"{example.text}"</span>
                    <span
                      className="demo-panel__item-tag"
                      style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        color: 'var(--green-400)',
                      }}
                    >
                      → {example.expectedCategory}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ===== STEP: INPUT ===== */}
        {step === 'input' && (
          <div className="support-input animate-fadeInUp">
            <div className="support-input__header">
              <h1 className="support-input__title">How can we help?</h1>
              <p className="support-input__subtitle">
                Tell us what's going on. We'll help connect you with the right support.
              </p>
            </div>

            <div className="support-input__textarea-wrap">
              <textarea
                className="support-input__textarea"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Example: I'm struggling to keep up with my coursework and don't know who to contact."
                rows={5}
                maxLength={500}
              />
              <span className="support-input__char-count">
                {message.length}/500
              </span>
            </div>

            {error && (
              <div className="support-input__error animate-fadeIn">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="support-input__chips">
              {CHIP_EXAMPLES.map((chip) => (
                <button
                  key={chip}
                  className="support-input__chip"
                  onClick={() => handleChipClick(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            <button className="btn btn--primary btn--large support-input__submit" onClick={handleSubmit}>
              <Sparkles size={18} />
              Find My Support
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* ===== STEP: ANALYZING ===== */}
        {step === 'analyzing' && (
          <div className="analyzing animate-scaleIn">
            <div className="analyzing__card card card--elevated">
              <div className="spinner spinner--large" />
              <h2 className="analyzing__title">Analyzing your request…</h2>
              <p className="analyzing__text">
                Our Smart Triage system is identifying the best support service for you.
              </p>
              <div className="analyzing__shimmer" />
            </div>
          </div>
        )}

        {/* ===== STEP: RESULT ===== */}
        {step === 'result' && triageResult && (
          <div className="triage-result animate-fadeInUp">
            <div className="triage-result__header">
              <CheckCircle2 size={22} className="triage-result__check" />
              <p className="triage-result__intro">
                Based on what you've told us, we recommend:
              </p>
            </div>

            <div className="triage-result__card card card--elevated">
              <div className="triage-result__category-row">
                <div
                  className="triage-result__icon"
                  style={{
                    background: `${triageResult.category.color}20`,
                    color: triageResult.category.color,
                  }}
                >
                  {CategoryIcon && <CategoryIcon size={28} />}
                </div>
                <div>
                  <h2 className="triage-result__category">
                    {triageResult.category.label}
                  </h2>
                  <p className="triage-result__service">
                    Recommended service: <strong>{triageResult.category.service}</strong>
                  </p>
                </div>
              </div>

              <div className="triage-result__details">
                <div className="triage-result__detail">
                  <span className="triage-result__detail-label">Priority</span>
                  <span className={`badge ${triageResult.priority === 'High' ? 'badge--pink' : 'badge--green'}`}>
                    {triageResult.priority}
                  </span>
                </div>
                <div className="triage-result__detail">
                  <span className="triage-result__detail-label">Response Time</span>
                  <span className="triage-result__detail-value">
                    <Clock size={14} />
                    {triageResult.category.responseTime}
                  </span>
                </div>
              </div>

              <div className="triage-result__reason">
                <span className="triage-result__reason-label">Reason</span>
                <p>{triageResult.reason}</p>
              </div>

              <div className="triage-result__next-step">
                <span className="triage-result__reason-label">Next Step</span>
                <p>Create a support request with {triageResult.category.department}.</p>
              </div>
            </div>

            <div className="triage-result__actions">
              <button className="btn btn--primary btn--large" onClick={handleCreateCase}>
                <Send size={18} />
                Create Support Request
              </button>
              <button className="btn btn--secondary" onClick={handleEditRequest}>
                <Edit3 size={16} />
                Edit My Request
              </button>
            </div>
          </div>
        )}

        {/* ===== STEP: CREATING ===== */}
        {step === 'creating' && (
          <div className="analyzing animate-scaleIn">
            <div className="analyzing__card card card--elevated">
              <div className="spinner spinner--large" />
              <h2 className="analyzing__title">Creating your support request…</h2>
              <p className="analyzing__text">
                Assigning your case to {triageResult?.category.department}.
              </p>
              <div className="analyzing__shimmer" />
            </div>
          </div>
        )}

        {/* ===== STEP: SUCCESS ===== */}
        {step === 'success' && caseData && (
          <div className="case-success animate-fadeInUp">
            <div className="case-success__header">
              <div className="case-success__icon-wrap animate-scaleIn">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="case-success__title">Support request created</h2>
              <p className="case-success__subtitle">
                Your request has been submitted and assigned to the appropriate team.
              </p>
            </div>

            <div className="case-success__card card card--elevated">
              <div className="case-success__grid">
                <div className="case-success__field">
                  <span className="case-success__label">Case ID</span>
                  <span className="case-success__value case-success__value--id">
                    {caseData.id}
                  </span>
                </div>
                <div className="case-success__field">
                  <span className="case-success__label">Assigned to</span>
                  <span className="case-success__value">{caseData.department}</span>
                </div>
                <div className="case-success__field">
                  <span className="case-success__label">Status</span>
                  <span className="badge badge--green">Open</span>
                </div>
                <div className="case-success__field">
                  <span className="case-success__label">Expected response</span>
                  <span className="case-success__value">
                    <Clock size={14} />
                    {caseData.responseTime}
                  </span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="progress-tracker">
                {['Submitted', 'Assigned', 'In Progress', 'Resolved'].map(
                  (label, idx) => (
                    <div
                      key={label}
                      className={`progress-tracker__step ${
                        idx <= caseData.progressStep
                          ? 'progress-tracker__step--active'
                          : ''
                      }`}
                    >
                      <div className="progress-tracker__dot" />
                      <span className="progress-tracker__label">{label}</span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="case-success__actions">
              <button
                className="btn btn--primary btn--large"
                onClick={() => navigate('/cases')}
              >
                View My Cases
                <ArrowRight size={18} />
              </button>
              <button className="btn btn--secondary" onClick={handleReset}>
                Submit Another Request
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
