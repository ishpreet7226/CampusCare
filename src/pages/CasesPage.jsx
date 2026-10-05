import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  AlertCircle,
  Inbox,
  ArrowRight,
  MessageCircle,
  Calendar,
  Tag,
  Building2,
  FileText,
} from 'lucide-react';
import './CasesPage.css';

export default function CasesPage() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('campuscare_cases') || '[]');
    setCases(stored);
  }, []);

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function getPriorityBadge(priority) {
    if (priority === 'High') return 'badge--pink';
    return 'badge--green';
  }

  return (
    <main className="cases-page">
      <div className="container container--narrow">
        <div className="cases-page__header animate-fadeInUp">
          <h1 className="cases-page__title">My Cases</h1>
          <p className="cases-page__subtitle">
            Track and manage your support requests.
          </p>
        </div>

        {cases.length === 0 ? (
          <div className="cases-empty animate-fadeInUp stagger-1">
            <div className="cases-empty__icon">
              <Inbox size={48} />
            </div>
            <h2 className="cases-empty__title">No cases yet</h2>
            <p className="cases-empty__text">
              When you submit a support request, it will appear here for tracking.
            </p>
            <Link to="/support" className="btn btn--primary btn--large">
              Get Support
              <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="cases-list">
            {cases.map((c, idx) => (
              <div
                key={c.id + idx}
                className="case-card card card--elevated animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="case-card__top">
                  <div className="case-card__id-wrap">
                    <span className="case-card__id">{c.id}</span>
                    <span className={`badge ${getPriorityBadge(c.priority)}`}>
                      {c.priority}
                    </span>
                    <span className="badge badge--blue">
                      {c.status}
                    </span>
                  </div>
                </div>

                <div className="case-card__body">
                  <div className="case-card__info-grid">
                    <div className="case-card__info">
                      <Tag size={14} />
                      <span className="case-card__info-label">Category</span>
                      <span className="case-card__info-value">{c.category}</span>
                    </div>
                    <div className="case-card__info">
                      <Building2 size={14} />
                      <span className="case-card__info-label">Department</span>
                      <span className="case-card__info-value">{c.department}</span>
                    </div>
                    <div className="case-card__info">
                      <Calendar size={14} />
                      <span className="case-card__info-label">Created</span>
                      <span className="case-card__info-value">{formatDate(c.createdAt)}</span>
                    </div>
                    <div className="case-card__info">
                      <Clock size={14} />
                      <span className="case-card__info-label">Response</span>
                      <span className="case-card__info-value">{c.responseTime}</span>
                    </div>
                  </div>

                  <div className="case-card__message">
                    <FileText size={14} />
                    <p>{c.message}</p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="progress-tracker progress-tracker--compact">
                    {['Submitted', 'Assigned', 'In Progress', 'Resolved'].map(
                      (label, stepIdx) => (
                        <div
                          key={label}
                          className={`progress-tracker__step ${
                            stepIdx <= (c.progressStep || 0)
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
              </div>
            ))}

            {/* Need more help section */}
            <div className="cases-help card animate-fadeInUp">
              <div className="cases-help__content">
                <h3 className="cases-help__title">Need more help?</h3>
                <p className="cases-help__text">
                  If your issue hasn't been resolved, submit a new request or contact our support team directly.
                </p>
              </div>
              <div className="cases-help__actions">
                <Link to="/support" className="btn btn--primary">
                  <MessageCircle size={16} />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
