import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Home, FileText, Upload, Share2, Settings, LogOut, Shield, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AuthenticatedLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Vault', href: '/vault', icon: FileText },
    { name: 'Upload', href: '/upload', icon: Upload },
    { name: 'Share', href: '/share', icon: Share2 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-vh-100 bg-light position-relative">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div 
        className="d-flex flex-column transition-smooth"
        style={{ 
          marginLeft: sidebarOpen ? '280px' : '0',
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        {/* Top Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
          <div className="container-fluid">
            {/* Mobile Menu Button */}
            <button
              className="btn btn-link p-2 text-muted d-lg-none"
              onClick={toggleSidebar}
              style={{ marginLeft: '-8px' }}
            >
              <Menu size={20} />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              className="btn btn-link p-2 text-muted d-none d-lg-block"
              onClick={toggleSidebar}
              style={{ marginLeft: '-8px' }}
            >
              <Menu size={20} />
            </button>

            {/* Page Title - Dynamic based on route */}
            <div className="navbar-brand mb-0 h1 text-primary fw-bold">
              {location.pathname === '/home' && 'Dashboard'}
              {location.pathname === '/vault' && 'Document Vault'}
              {location.pathname === '/upload' && 'Upload Documents'}
              {location.pathname === '/share' && 'Shared Documents'}
              {location.pathname === '/folders' && 'Folders'}
              {location.pathname === '/search' && 'Search'}
              {location.pathname === '/tags' && 'Tags'}
              {location.pathname === '/analytics' && 'Analytics'}
              {location.pathname === '/settings' && 'Settings'}
              {location.pathname === '/security' && 'Security'}
            </div>

            {/* Right side - User menu */}
            <div className="navbar-nav ms-auto">
              <div className="nav-item dropdown">
                <button 
                  className="nav-link dropdown-toggle btn btn-link text-dark d-flex align-items-center border-0"
                  data-bs-toggle="dropdown"
                  style={{ background: 'none' }}
                >
                  <img
                    src="https://via.placeholder.com/32x32?text=JD"
                    alt="Profile"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                  />
                  <span className="d-none d-md-inline">John Doe</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow border-0" style={{ borderRadius: '12px' }}>
                  <li>
                    <Link className="dropdown-item py-2" to="/settings">
                      <Settings className="me-2" size={16} />
                      Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item text-danger py-2" to="/">
                      <LogOut className="me-2" size={16} />
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;