'use client';

interface HeaderProps {
  onRefresh?: () => void;
  showRefreshButton?: boolean;
}

export function Header({ onRefresh, showRefreshButton = false }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <a 
            href="https://x-kira-html.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ 
              padding: '6px 12px',
              fontSize: '0.7rem',
              minHeight: '28px',
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid transparent',
              backdropFilter: 'blur(8px)',
              gap: '6px'
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: '0.8rem' }}></i>
            <span>Back to Dashboard</span>
          </a>
          <i className="fab fa-whatsapp header-icon" style={{ marginLeft: '12px' }}></i>
        </div>
        <div className="header-right">
          <a 
            href="https://chat.whatsapp.com/CQyxExEBMGvEnkA32zqbNY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-support" 
            title="Join Support Group"
          >
            <i className="fab fa-whatsapp"></i>
            <span className="support-text">Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}