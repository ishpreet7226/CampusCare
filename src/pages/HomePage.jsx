import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageSquareText,
  Route,
  ClipboardCheck,
  Shield,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  return (
    <main className="home">
      {/* HERO */}
      <section className="hero">
        <div className="container hero__container">
          <div className="hero__content animate-fadeInUp">
            <div className="hero__badge badge badge--green">
              <Sparkles size={14} />
              Smart Student Support
            </div>

            <h1 className="hero__title">
              One place to find the{' '}
              <span className="hero__title-accent">right support</span>
            </h1>

            <p className="hero__subtitle">
              Get connected to the right campus service without knowing where to
              start. CampusCare uses intelligent triage to route your request to
              the perfect department — instantly.
            </p>

            <div className="hero__actions">
              <Link to="/support" className="btn btn--primary btn--large">
                Get Support
                <ArrowRight size={18} />
              </Link>
              <Link to="/cases" className="btn btn--secondary btn--large">
                View My Cases
              </Link>
            </div>
          </div>

          <div className="hero__visual animate-fadeInUp stagger-2">
            <div className="hero__card-stack">
              <div className="hero__floating-card hero__floating-card--1">
                <Shield size={20} />
                <span>Request routed</span>
                <span className="hero__card-tag">Academic Support</span>
              </div>
              <div className="hero__floating-card hero__floating-card--2">
                <Zap size={20} />
                <span>Case created</span>
                <span className="hero__card-tag hero__card-tag--green">SN-1024</span>
              </div>
              <div className="hero__floating-card hero__floating-card--3">
                <Users size={20} />
                <span>Advisor assigned</span>
                <span className="hero__card-tag hero__card-tag--blue">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header animate-fadeInUp">
            <h2 className="section-title">How CampusCare Works</h2>
            <p className="section-subtitle">
              Three simple steps to get the help you need
            </p>
          </div>

          <div className="steps-grid">
            <div className="step-card card animate-fadeInUp stagger-1">
              <div className="step-card__number">1</div>
              <div className="step-card__icon" style={{ background: 'rgba(59, 130, 246, 0.12)', color: '#60a5fa' }}>
                <MessageSquareText size={28} />
              </div>
              <h3 className="step-card__title">Tell us what you need</h3>
              <p className="step-card__desc">
                Describe your situation in your own words. No forms, no
                jargon — just tell us what's going on.
              </p>
            </div>

            <div className="step-card card animate-fadeInUp stagger-2">
              <div className="step-card__number">2</div>
              <div className="step-card__icon" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
                <Route size={28} />
              </div>
              <h3 className="step-card__title">Get routed to the right support</h3>
              <p className="step-card__desc">
                Our intelligent triage system analyses your request and
                identifies the best campus service to help you.
              </p>
            </div>

            <div className="step-card card animate-fadeInUp stagger-3">
              <div className="step-card__number">3</div>
              <div className="step-card__icon" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#a78bfa' }}>
                <ClipboardCheck size={28} />
              </div>
              <h3 className="step-card__title">Track your request</h3>
              <p className="step-card__desc">
                A support case is created and assigned. Track progress and
                get updates all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card card card--elevated animate-fadeInUp">
            <h2 className="cta-card__title">Ready to get the help you need?</h2>
            <p className="cta-card__desc">
              It takes less than two minutes to describe your situation and get
              connected to the right campus service.
            </p>
            <Link to="/support" className="btn btn--primary btn--large">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
