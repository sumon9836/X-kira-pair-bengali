'use client';

import { Header } from '../components/Header';
import { SessionsList } from '../components/SessionsList';
import { BannedUsersPanel } from '../components/BannedUsersPanel';
import { ToastContainer } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { useSessions } from '../hooks/useSessions';
import { useBanlist } from '../hooks/useBanlist';
import Link from 'next/link';
import { useEffect, type CSSProperties } from 'react';

export default function Dashboard() {
  const { toasts, showToast, removeToast } = useToast();
  const { sessions, sessionsCount, loading: sessionsLoading } = useSessions({ showToast });
  const { bannedCount, loading: bannedLoading } = useBanlist({ showToast });

  const handleRefresh = () => {
    window.location.reload();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.scroll-animate').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sessionsLoading, bannedLoading]);

  return (
    <>
      <Header onRefresh={handleRefresh} showRefreshButton={true} />
      
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section-compact scroll-animate" style={{ '--animation-order': 0 } as CSSProperties}>
          <div className="hero-content-compact">
            <div className="hero-icon-compact">
              <i className="fab fa-whatsapp"></i>
            </div>
            <h1 className="hero-title-compact">Welcome to X-kira WhatsApp Bot</h1>
            <p className="hero-subtitle-compact" style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
              🇧🇩 Proudly Serving Bangladesh & Beyond
            </p>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(255, 27, 107, 0.1), rgba(0, 212, 255, 0.1))',
              padding: '20px',
              borderRadius: '16px',
              marginBottom: '20px',
              border: '1px solid rgba(255, 27, 107, 0.2)',
              maxWidth: '600px',
              margin: '0 auto 20px'
            }}>
              <p style={{ 
                color: 'var(--blue-text)', 
                fontSize: '1rem',
                lineHeight: '1.8',
                margin: '0 0 10px 0'
              }}>
                ✨ The most advanced WhatsApp automation bot for Bangladesh
              </p>
              <p style={{ 
                color: 'var(--gray-light)', 
                fontSize: '0.95rem',
                lineHeight: '1.6',
                margin: 0
              }}>
                Free Forever • No Server Required • Lightning Fast Setup<br/>
                Join thousands of satisfied users across Bangladesh
              </p>
            </div>
            
            <Link href="/pair" className="btn btn-hero-bright">
              <i className="fas fa-rocket"></i>
              <span>Start Your Bot Journey</span>
              <div className="btn-glow"></div>
            </Link>
            
            <p style={{ 
              marginTop: '15px', 
              color: 'var(--gray-light)', 
              fontSize: '0.85rem',
              opacity: 0.8
            }}>
              🎯 Setup takes less than 2 minutes • No technical knowledge needed
            </p>
          </div>
        </section>

        {/* Dashboard Layout */}
        <div className="dashboard-layout scroll-animate" style={{ '--animation-order': 1 } as CSSProperties}>
          {/* Left Sidebar */}
          <aside className="dashboard-sidebar">
            {/* Active Sessions Count */}
            <div className="sidebar-card" style={{ 
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.08), rgba(18, 140, 126, 0.05))',
              borderColor: 'rgba(37, 211, 102, 0.2)'
            }}>
              <div className="sidebar-card-header">
                <i className="fas fa-users" style={{ color: '#25D366' }}></i>
                <h3>Active Bots</h3>
              </div>
              <div className="sidebar-card-value">
                {sessionsLoading ? (
                  <div className="sidebar-skeleton"></div>
                ) : (
                  <span className="count-big" style={{ 
                    background: 'linear-gradient(135deg, #25D366, #128C7E)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>{sessionsCount}</span>
                )}
              </div>
              <p className="sidebar-card-label">running now</p>
            </div>

            {/* Blocked Users Count */}
            <div className="sidebar-card" style={{ 
              background: 'linear-gradient(135deg, rgba(255, 27, 107, 0.08), rgba(255, 107, 157, 0.05))',
              borderColor: 'rgba(255, 27, 107, 0.2)'
            }}>
              <div className="sidebar-card-header">
                <i className="fas fa-shield-alt" style={{ color: 'var(--pink-primary)' }}></i>
                <h3>Protected</h3>
              </div>
              <div className="sidebar-card-value">
                {bannedLoading ? (
                  <div className="sidebar-skeleton"></div>
                ) : (
                  <span className="count-big" style={{ 
                    background: 'linear-gradient(135deg, var(--pink-primary), var(--pink-light))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>{bannedCount}</span>
                )}
              </div>
              <p className="sidebar-card-label">users secured</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="dashboard-main">
            {/* Active Sessions List */}
            <section className="sessions-list-section">
              <h2 className="section-title-small" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                marginBottom: '20px'
              }}>
                <i className="fas fa-signal" style={{ 
                  background: 'linear-gradient(135deg, #25D366, var(--blue-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}></i>
                <span>Live Active Sessions</span>
                <span style={{ 
                  fontSize: '0.7rem',
                  color: 'var(--gray-light)',
                  fontWeight: '400',
                  marginLeft: 'auto'
                }}>🔴 Real-time</span>
              </h2>
              
              {sessionsLoading ? (
                <div className="sessions-loading">
                  <div className="skeleton-session-item"></div>
                  <div className="skeleton-session-item"></div>
                  <div className="skeleton-session-item"></div>
                  <div className="skeleton-session-item"></div>
                  <div className="skeleton-session-item"></div>
                </div>
              ) : sessionsCount === 0 ? (
                <div className="empty-state-compact">
                  <i className="fas fa-users"></i>
                  <span>No active sessions found</span>
                </div>
              ) : (
                <div className="sessions-number-list">
                  {sessions.map((session, index) => {
                    const cleanNumber = session.number.replace(/[^0-9]/g, '');
                    return (
                      <div 
                        key={session.id} 
                        className="session-number-item scroll-animate"
                        style={{ '--animation-order': index } as CSSProperties}
                      >
                        <div className="session-number-left">
                          <i className="fas fa-circle session-status-dot"></i>
                          <span className="session-number-text">+{cleanNumber}</span>
                        </div>
                        <span className="session-status-badge">Online</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
