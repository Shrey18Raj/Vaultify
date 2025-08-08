import React, { useState } from 'react';
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle, Clock, Smartphone } from 'lucide-react';

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);

  const securityEvents = [
    { type: 'login', message: 'Successful login from Chrome on Windows', time: '2 hours ago', status: 'success' },
    { type: 'share', message: 'Document shared: Passport.pdf', time: '5 hours ago', status: 'info' },
    { type: 'failed', message: 'Failed login attempt', time: '1 day ago', status: 'warning' },
    { type: 'download', message: 'Document downloaded: Medical_Cert.pdf', time: '2 days ago', status: 'info' }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'login': return CheckCircle;
      case 'share': return Shield;
      case 'failed': return AlertTriangle;
      case 'download': return Eye;
      default: return Clock;
    }
  };

  const getEventColor = (status) => {
    switch (status) {
      case 'success': return '#059669';
      case 'warning': return '#d97706';
      case 'info': return '#0ea5e9';
      default: return '#6b7280';
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary mb-4">Security Center</h2>
        </div>
      </div>

      {/* Security Overview */}
      <div className="row g-4 mb-4">
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="bg-success bg-opacity-10 rounded-3 p-3 d-inline-flex mb-3">
                <Shield size={24} className="text-success" />
              </div>
              <h6 className="text-success mb-1">Excellent</h6>
              <p className="text-muted small mb-0">Security Score</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3 d-inline-flex mb-3">
                <Lock size={24} className="text-primary" />
              </div>
              <h6 className="text-primary mb-1">AES-256</h6>
              <p className="text-muted small mb-0">Encryption</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="bg-info bg-opacity-10 rounded-3 p-3 d-inline-flex mb-3">
                <Key size={24} className="text-info" />
              </div>
              <h6 className="text-info mb-1">2FA Enabled</h6>
              <p className="text-muted small mb-0">Authentication</p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card border-0 shadow-sm text-center">
            <div className="card-body">
              <div className="bg-warning bg-opacity-10 rounded-3 p-3 d-inline-flex mb-3">
                <Eye size={24} className="text-warning" />
              </div>
              <h6 className="text-warning mb-1">24/7</h6>
              <p className="text-muted small mb-0">Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Security Settings */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Security Settings</h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <Smartphone size={20} className="text-primary me-3" />
                  <div>
                    <h6 className="mb-1">Two-Factor Authentication</h6>
                    <small className="text-muted">Add an extra layer of security</small>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                  />
                </div>
              </div>

              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <AlertTriangle size={20} className="text-warning me-3" />
                  <div>
                    <h6 className="mb-1">Login Alerts</h6>
                    <small className="text-muted">Get notified of login attempts</small>
                  </div>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={loginAlerts}
                    onChange={(e) => setLoginAlerts(e.target.checked)}
                  />
                </div>
              </div>

              <hr />

              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <Key size={16} className="me-2" />
                  Change Password
                </button>
                <button className="btn btn-outline-secondary">
                  <Eye size={16} className="me-2" />
                  View Active Sessions
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security Log */}
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Recent Security Events</h6>
            </div>
            <div className="card-body p-0">
              {securityEvents.map((event, index) => {
                const IconComponent = getEventIcon(event.type);
                const color = getEventColor(event.status);
                
                return (
                  <div key={index} className="border-bottom p-3">
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-3 p-2 me-3"
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <IconComponent size={16} color={color} />
                      </div>
                      <div className="flex-grow-1">
                        <p className="mb-1 small">{event.message}</p>
                        <small className="text-muted">{event.time}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Security Recommendations</h6>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="d-flex align-items-start">
                    <CheckCircle size={20} className="text-success me-3 mt-1" />
                    <div>
                      <h6 className="small fw-medium">Strong Password</h6>
                      <p className="small text-muted mb-0">Your password meets security requirements</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-start">
                    <CheckCircle size={20} className="text-success me-3 mt-1" />
                    <div>
                      <h6 className="small fw-medium">Regular Backups</h6>
                      <p className="small text-muted mb-0">Documents are automatically backed up</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="d-flex align-items-start">
                    <CheckCircle size={20} className="text-success me-3 mt-1" />
                    <div>
                      <h6 className="small fw-medium">Secure Sharing</h6>
                      <p className="small text-muted mb-0">All shares use encrypted links</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;