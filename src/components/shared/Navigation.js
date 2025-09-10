import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Snowflake, Crown } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/pricing', label: 'Pricing', icon: Crown },
    { path: '/how-it-works', label: 'How it Works' },
    { path: '/faq', label: 'FAQ' },
    { path: '/about', label: 'About' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo flex items-center gap-2">
          <Snowflake className="h-6 w-6" />
          Snow Day Calc
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link 
                to={link.path}
                className={`nav-link flex items-center gap-1 ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.icon && <link.icon className="h-4 w-4" />}
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <ul className="nav-links mobile-open">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`nav-link flex items-center gap-2 ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
