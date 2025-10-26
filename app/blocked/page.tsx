
'use client';

import Link from 'next/link';

export default function BlockedPage() {
  const developerWhatsApp = "+917003815486";
  const whatsappLink = `https://wa.me/${developerWhatsApp.replace(/[^0-9]/g, '')}?text=Hello,%20I%20am%20contacting%20you%20regarding%20my%20blocked%20access%20to%20the%20WhatsApp%20Bot%20Dashboard.`;

  return (
    <div className="blocked-page-container">
      {/* Animated Background Effects */}
      <div className="blocked-bg-effects">
        <div className="blocked-gradient-orb blocked-orb-1"></div>
        <div className="blocked-gradient-orb blocked-orb-2"></div>
        <div className="blocked-gradient-orb blocked-orb-3"></div>
        <div className="blocked-particles"></div>
      </div>

      {/* Main Content Card */}
      <div className="blocked-content-card">
        {/* Animated Header Icon */}
        <div className="blocked-icon-wrapper">
          <div className="blocked-icon-ring"></div>
          <div className="blocked-icon-ring blocked-ring-2"></div>
          <div className="blocked-icon-inner">
            <svg className="blocked-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636"></path>
              <circle cx="12" cy="12" r="9" strokeWidth="2.5"></circle>
            </svg>
          </div>
        </div>
        
        {/* Title Section */}
        <div className="blocked-title-section">
          <h1 className="blocked-main-title">Access Blocked</h1>
          <div className="blocked-subtitle-badge">
            <i className="fas fa-ban"></i>
            <span>You Are Blocked</span>
          </div>
        </div>

        {/* Reason Card */}
        <div className="blocked-reason-card">
          <div className="blocked-reason-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Reason for Block</h3>
          </div>
          <p className="blocked-reason-text">
            You've been banned for having toxic behavior with bot developers or anyone in the community.
          </p>
        </div>

        {/* Divider */}
        <div className="blocked-divider">
          <span className="blocked-divider-text">Contact Developer</span>
        </div>

        {/* Contact Section */}
        <div className="blocked-contact-section">
          <p className="blocked-contact-description">
            <i className="fas fa-info-circle"></i>
            If you believe this is an error or would like to appeal this decision, please contact the developer
          </p>

          {/* WhatsApp Contact Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="blocked-whatsapp-btn"
          >
            <div className="blocked-btn-shine"></div>
            <i className="fab fa-whatsapp blocked-whatsapp-icon"></i>
            <div className="blocked-btn-content">
              <span className="blocked-btn-label">Contact on WhatsApp</span>
              <span className="blocked-btn-number">{developerWhatsApp}</span>
            </div>
            <i className="fas fa-arrow-right blocked-btn-arrow"></i>
          </a>

          <p className="blocked-tap-hint">
            <i className="fas fa-hand-pointer"></i>
            Tap to open WhatsApp and message the developer directly
          </p>
        </div>

        {/* Back Button */}
        <div className="blocked-back-section">
          <Link href="/" className="blocked-back-btn">
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Footer Note */}
        <div className="blocked-footer-note">
          <i className="fas fa-shield-alt"></i>
          <p>This restriction is in place to maintain a positive and respectful community environment.</p>
        </div>
      </div>
    </div>
  );
}
