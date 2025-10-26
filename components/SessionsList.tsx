
'use client';

import { useSessions } from '../hooks/useSessions';
import { Loader } from './Loader';

interface SessionsListProps {
  showToast?: (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

interface SessionCardProps {
  session: {
    id: string;
    number: string;
    status?: string;
    lastSeen?: string;
    platform?: string;
    user?: string;
  };
}

function SessionCard({ session }: SessionCardProps) {
  // Clean the number to show only digits
  const cleanNumber = session.number.replace(/[^0-9]/g, '');
  const statusColor = session.status === 'Connected' ? '#25D366' : '#FFA500';
  
  return (
    <div className="session-item-compact">
      <i className="fas fa-circle session-indicator" style={{ color: statusColor }}></i>
      <span className="session-phone">+{cleanNumber}</span>
    </div>
  );
}

export function SessionsList({ showToast }: SessionsListProps) {
  const { sessions, loading, error, refreshSessions, sessionsCount } = useSessions({
    showToast
  });

  if (loading) {
    return (
      <section className="card sessions-section-compact">
        <div className="card-header-compact">
          <h2><i className="fas fa-users"></i> Active Sessions <span className="session-badge">...</span></h2>
        </div>
        <div className="card-content-compact">
          <div className="sessions-list-compact">
            <div className="skeleton-session-item"></div>
            <div className="skeleton-session-item"></div>
            <div className="skeleton-session-item"></div>
            <div className="skeleton-session-item"></div>
            <div className="skeleton-session-item"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="card sessions-section">
        <div className="card-header">
          <h2><i className="fas fa-users"></i> Active Sessions</h2>
          <div className="card-actions">
            <div className="session-count">0 sessions</div>
          </div>
        </div>
        <div className="card-content">
          <div className="error-state">
            <div className="error-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Failed to Load Sessions</h3>
            <p>{error}</p>
            <button onClick={refreshSessions} className="btn btn-primary">
              <i className="fas fa-redo"></i>
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="card sessions-section-compact">
      <div className="card-header-compact">
        <h2><i className="fas fa-users"></i> Active Sessions <span className="session-badge">{sessionsCount}</span></h2>
      </div>
      <div className="card-content-compact">
        {sessionsCount === 0 ? (
          <div className="empty-state-compact">
            <i className="fas fa-users"></i>
            <span>No paired numbers found</span>
          </div>
        ) : (
          <div className="sessions-list-compact">
            {sessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
