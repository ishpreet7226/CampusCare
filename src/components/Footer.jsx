import { Shield } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Shield size={18} />
          <span className="footer__name">CampusCare</span>
        </div>
        <p className="footer__text">
          Smart Student Support & Triage — Hackathon Prototype
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} CampusCare · ServiceNow Co-Innovation Day
        </p>
      </div>
    </footer>
  );
}
