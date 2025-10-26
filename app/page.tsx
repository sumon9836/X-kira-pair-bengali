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
            <h1 className="hero-title-compact">X-kira WhatsApp Bot</h1>
            <p className="hero-subtitle-compact">
              Free WhatsApp Bot - No Panel, No Server Required!
            </p>
            
            <Link href="/pair" className="btn btn-hero-bright">
              <i className="fas fa-plus-circle"></i>
              <span>Pair Your Bot Now</span>
              <div className="btn-glow"></div>
            </Link>
          </div>
        </section>

        {/* Dashboard Layout */}
        <div className="dashboard-layout scroll-animate" style={{ '--animation-order': 1 } as CSSProperties}>
          {/* Left Sidebar */}
          <aside className="dashboard-sidebar">
            {/* Active Sessions Count */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <i className="fas fa-users"></i>
                <h3>Active Sessions</h3>
              </div>
              <div className="sidebar-card-value">
                {sessionsLoading ? (
                  <div className="sidebar-skeleton"></div>
                ) : (
                  <span className="count-big">{sessionsCount}</span>
                )}
              </div>
              <p className="sidebar-card-label">bots online</p>
            </div>

            {/* Blocked Users Count */}
            <div className="sidebar-card">
              <div className="sidebar-card-header">
                <i className="fas fa-ban"></i>
                <h3>Blocked Users</h3>
              </div>
              <div className="sidebar-card-value">
                {bannedLoading ? (
                  <div className="sidebar-skeleton"></div>
                ) : (
                  <span className="count-big">{bannedCount}</span>
                )}
              </div>
              <p className="sidebar-card-label">users blocked</p>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="dashboard-main">
            {/* Active Sessions List */}
            <section className="sessions-list-section">
              <h2 className="section-title-small">
                <i className="fas fa-signal"></i>
                All Active Sessions
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
