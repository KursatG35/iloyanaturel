type SidebarProps = {
  activeSection: string
  onSectionChange: (section: any) => void
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'products', icon: '📦', label: 'Ürünler' },
    { id: 'sales', icon: '💰', label: 'Satışlar' },
    { id: 'purchases', icon: '🛒', label: 'Alımlar' },
    { id: 'expenses', icon: '💸', label: 'Giderler' },
    { id: 'reports', icon: '📈', label: 'Raporlar' },
  ]

  return (
    <aside className="sidebar">
      <div className="logo">
        İloya <span>ERP</span>
      </div>
      
      <nav>
        {navItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSectionChange(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <style jsx>{`
        .sidebar {
          width: 280px;
          background: var(--primary);
          color: white;
          padding: 2rem 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          box-shadow: 4px 0 20px rgba(0,0,0,0.1);
        }

        .logo {
          font-family: var(--font-playfair), serif;
          font-size: 1.75rem;
          font-weight: 700;
          padding: 0 2rem;
          margin-bottom: 3rem;
          letter-spacing: -0.5px;
        }

        .logo span {
          color: var(--accent);
        }

        .nav-item {
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.1);
          border-left-color: var(--accent);
        }

        .nav-item.active {
          background: rgba(255,255,255,0.15);
          border-left-color: var(--accent);
          color: var(--accent);
        }

        .nav-icon {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            position: relative;
            height: auto;
          }
        }
      `}</style>
    </aside>
  )
}
