import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/support', label: 'Get Support' },
    { to: '/cases', label: 'My Cases' },
  ];

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <Link to="/" className="header__brand">
          <div className="header__logo">
            <Shield size={24} />
          </div>
          <div className="header__brand-text">
            <span className="header__title">CampusCare</span>
            <span className="header__tagline">Student Support, Simplified.</span>
          </div>
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`header__link ${location.pathname === link.to ? 'header__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          className="header__menu-btn btn--icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
