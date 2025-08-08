import React, { useState } from 'react';
import { User, Shield, Settings as SettingsIcon, LogOut, Bell, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    browser: false,
    security: true
  });

  const ProfileSettings = () => (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary mb-4">Profile Information</h5>
        
        <div className="row">
          <div className="col-md-4 text-center mb-4">
            <div className="position-relative d-inline-block">
              <img
                src="https://via.placeholder.com/120x120?text=JD"
                alt="Profile"
                className="rounded-circle border border-3 border-primary"
                width="120"
                height="120"
              />
              <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                <User size={14} />
              </button>
            </div>
            <div className="mt-3">
              <button className="btn btn-outline-primary btn-sm">Change Photo</button>
            </div>
          </div>
          
          <div className="col-md-8">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input type="text" className="form-control" defaultValue="John" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input type="text" className="form-control" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" defaultValue="john.doe@example.com" />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" defaultValue="+1 (555) 123-4567" />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Current Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" placeholder="Enter new password" />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" placeholder="Confirm new password" />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title text-primary mb-4">Two-Factor Authentication</h5>
            
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h6 className="mb-1">2FA Status</h6>
                <small className="text-muted">Add an extra layer of security</small>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                />
              </div>
            </div>
            
            {twoFactorEnabled && (
              <div className="alert alert-success">
                <Smartphone className="me-2" size={16} />
                Two-factor authentication is enabled
              </div>
            )}
            
            <div className="d-grid">
              <button className="btn btn-outline-primary">
                {twoFactorEnabled ? 'Manage 2FA' : 'Setup 2FA'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6 mb-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-body">
            <h5 className="card-title text-primary mb-4">Login History</h5>
            
            <div className="list-group list-group-flush">
              <div className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="mb-1">Current Session</h6>
                    <small className="text-muted">Chrome on Windows • 192.168.1.1</small>
                  </div>
                  <small className="text-success">Active</small>
                </div>
              </div>
              <div className="list-group-item border-0 px-0">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="mb-1">Previous Login</h6>
                    <small className="text-muted">Safari on iPhone • 192.168.1.100</small>
                  </div>
                  <small className="text-muted">2 hours ago</small>
                </div>
              </div>
            </div>
            
            <div className="d-grid">
              <button className="btn btn-outline-danger">Logout All Devices</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary mb-4">Security Preferences</h5>
            
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Session Timeout</label>
                  <select className="form-select">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Default Share Expiry</label>
                  <select className="form-select">
                    <option>24 hours</option>
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" defaultChecked />
              <label className="form-check-label">
                Require password for all shared documents
              </label>
            </div>
            
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                Allow document downloads by default
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title text-primary mb-4">Notification Preferences</h5>
        
        <div className="list-group list-group-flush">
          <div className="list-group-item border-0 px-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Email Notifications</h6>
                <small className="text-muted">Receive updates via email</small>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications(prev => ({ ...prev, email: e.target.checked }))}
                />
              </div>
            </div>
          </div>
          
          <div className="list-group-item border-0 px-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Browser Notifications</h6>
                <small className="text-muted">Show notifications in browser</small>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.browser}
                  onChange={(e) => setNotifications(prev => ({ ...prev, browser: e.target.checked }))}
                />
              </div>
            </div>
          </div>
          
          <div className="list-group-item border-0 px-0">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="mb-1">Security Alerts</h6>
                <small className="text-muted">Important security notifications</small>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={notifications.security}
                  onChange={(e) => setNotifications(prev => ({ ...prev, security: e.target.checked }))}
                />
              </div>
            </div>
          </div>
        </div>
        
        <hr />
        
        <h6 className="text-primary mb-3">Email Frequency</h6>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="frequency" defaultChecked />
          <label className="form-check-label">Immediately</label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="radio" name="frequency" />
          <label className="form-check-label">Daily digest</label>
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" type="radio" name="frequency" />
          <label className="form-check-label">Weekly summary</label>
        </div>
        
        <button className="btn btn-primary">Save Preferences</button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary mb-0">Settings</h2>
            <button className="btn btn-outline-danger">
              <LogOut className="me-2" size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
              <div className="list-group list-group-flush">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`list-group-item list-group-item-action border-0 d-flex align-items-center ${
                      activeTab === tab.id ? 'active bg-primary text-white' : ''
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="me-3" size={18} />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
        </div>
      </div>
    </div>
  );
};

export default Settings;