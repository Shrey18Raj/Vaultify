import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Folder, 
  Search, 
  Tags, 
  BarChart3, 
  Settings, 
  Shield,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/home', icon: Home },
    { name: 'Documents', href: '/vault', icon: FileText },
    { name: 'Folders', href: '/folders', icon: Folder },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Tags', href: '/tags', icon: Tags },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Security', href: '/security', icon: Shield },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div 
        className={`position-fixed top-0 start-0 h-100 bg-white border-end transition-smooth ${
          isOpen ? 'translate-x-0' : 'translate-x-n100'
        } d-flex flex-column`}
        style={{ 
          width: '280px', 
          zIndex: 1050,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
          borderColor: 'var(--violet-200)',
          boxShadow: '0 4px 20px rgba(124, 58, 237, 0.1)'
        }}
      >
        {/* Header */}
        <div className="p-4 border-bottom" style={{ borderColor: 'var(--violet-200)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="gradient-primary p-2 rounded me-2">
                <Shield size={20} color="white" />
              </div>
              <div>
                <h6 className="mb-0 fw-bold text-primary">Identity Vault</h6>
                <small className="text-muted">Secure Portal</small>
              </div>
            </div>
            <button 
              className="btn btn-link p-0 d-lg-none text-muted"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-grow-1 p-3">
          <ul className="list-unstyled mb-0">
            {navigation.map((item) => (
              <li key={item.name} className="mb-1">
                <Link
                  to={item.href}
                  className={`d-flex align-items-center px-3 py-2 rounded text-decoration-none transition-smooth ${
                    isActive(item.href)
                      ? 'text-white'
                      : 'text-muted'
                  }`}
                  style={{
                    background: isActive(item.href) 
                      ? 'var(--gradient-primary)' 
                      : 'transparent',
                    fontSize: '14px',
                    fontWeight: isActive(item.href) ? '600' : '500'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.backgroundColor = 'var(--bg-violet-light)';
                      e.target.style.color = 'var(--violet-600)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6c757d';
                    }
                  }}
                  onClick={() => {
                    // Close sidebar on mobile after navigation
                    if (window.innerWidth < 992) {
                      toggleSidebar();
                    }
                  }}
                >
                  <item.icon 
                    className="me-3" 
                    size={18} 
                    color={isActive(item.href) ? 'white' : 'currentColor'}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-top" style={{ borderColor: 'var(--violet-200)' }}>
          <div className="d-flex align-items-center">
            <img
              src="https://via.placeholder.com/32x32?text=JD"
              alt="Profile"
              className="rounded-circle me-2"
              width="32"
              height="32"
            />
            <div className="flex-grow-1">
              <div className="fw-medium small text-dark">John Doe</div>
              <div className="text-muted" style={{ fontSize: '12px' }}>Premium Plan</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;