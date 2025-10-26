'use client';

import { useBanlist } from '../hooks/useBanlist';

interface BannedUsersPanelProps {
  showToast?: (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
}

export function BannedUsersPanel({ showToast }: BannedUsersPanelProps) {
  const { bannedUsers, loading, error, refreshBanlist, bannedCount } = useBanlist({
    showToast
  });

  return (
    <section className="blocked-users-simple">
      <div className="blocked-simple-header">
        <h3 className="blocked-count-display">Blocked Users: <span className="count-highlight">{bannedCount}</span></h3>
        {!loading && !error && (
          <button onClick={refreshBanlist} className="refresh-simple-btn">
            <i className="fas fa-sync-alt"></i>
          </button>
        )}
      </div>

      <div className="blocked-simple-content">
        {loading ? (
          <div className="blocked-skeleton-loader">
            <div className="skeleton-blocked-item"></div>
            <div className="skeleton-blocked-item"></div>
            <div className="skeleton-blocked-item"></div>
          </div>
        ) : error ? (
          <p className="error-text">Failed to load</p>
        ) : bannedCount === 0 ? (
          <p>No blocked users</p>
        ) : null}
      </div>
    </section>
  );
}