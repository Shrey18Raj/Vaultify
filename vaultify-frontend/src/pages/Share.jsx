import React, { useState } from 'react';
import { Share2, Link, Eye, Clock, Download, Copy, Check, X, Plus } from 'lucide-react';

const Share = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(null);

  const sharedLinks = [
    {
      id: 1,
      documentName: 'Passport.pdf',
      recipientEmail: 'john@example.com',
      shareLink: 'https://vault.app/share/abc123',
      expiresAt: '2024-02-15',
      views: 3,
      downloads: 1,
      status: 'active',
      createdAt: '2024-01-15',
      allowDownload: true,
      passwordProtected: true
    },
    {
      id: 2,
      documentName: 'Medical_Certificate.pdf',
      recipientEmail: 'doctor@clinic.com',
      shareLink: 'https://vault.app/share/def456',
      expiresAt: '2024-02-20',
      views: 8,
      downloads: 2,
      status: 'active',
      createdAt: '2024-01-18',
      allowDownload: false,
      passwordProtected: false
    },
    {
      id: 3,
      documentName: 'License.jpg',
      recipientEmail: 'admin@company.com',
      shareLink: 'https://vault.app/share/ghi789',
      expiresAt: '2024-01-25',
      views: 12,
      downloads: 0,
      status: 'expired',
      createdAt: '2024-01-10',
      allowDownload: true,
      passwordProtected: true
    },
  ];

  const activeLinks = sharedLinks.filter(link => link.status === 'active');
  const expiredLinks = sharedLinks.filter(link => link.status === 'expired');

  const copyToClipboard = async (link, id) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(link);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const revokeLink = (id) => {
    // Handle link revocation
    console.log('Revoking link:', id);
  };

  const ShareLinkCard = ({ link }) => (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-md-4">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                <Share2 className="text-primary" size={18} />
              </div>
              <div>
                <h6 className="mb-1 text-primary">{link.documentName}</h6>
                <small className="text-muted">{link.recipientEmail}</small>
              </div>
            </div>
          </div>
          
          <div className="col-md-2 text-center">
            <small className="text-muted d-block">Views / Downloads</small>
            <strong className="small">{link.views} / {link.downloads}</strong>
          </div>
          
          <div className="col-md-2 text-center">
            <small className="text-muted d-block">Expires</small>
            <strong className="small">{link.expiresAt}</strong>
          </div>
          
          <div className="col-md-2 text-center">
            <div className="d-flex flex-column align-items-center gap-1">
              {link.passwordProtected && (
                <span className="badge bg-warning bg-opacity-10 text-warning small">Protected</span>
              )}
              {link.allowDownload ? (
                <span className="badge bg-success bg-opacity-10 text-success small">Download OK</span>
              ) : (
                <span className="badge bg-secondary bg-opacity-10 text-secondary small">View Only</span>
              )}
            </div>
          </div>
          
          <div className="col-md-2 text-end">
            <div className="d-flex gap-1 justify-content-end">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => copyToClipboard(link.shareLink, link.id)}
                title="Copy Link"
              >
                {copiedLink === link.shareLink ? <Check size={14} /> : <Copy size={14} />}
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                title="View Details"
              >
                <Eye size={14} />
              </button>
              {link.status === 'active' && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => revokeLink(link.id)}
                  title="Revoke Access"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary mb-0">Shared Documents</h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              <Plus className="me-2" size={16} />
              Create Share Link
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="h4 text-primary mb-1">{activeLinks.length}</h3>
              <p className="text-muted mb-0 small">Active Links</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="h4 text-success mb-1">
                {activeLinks.reduce((sum, link) => sum + link.views, 0)}
              </h3>
              <p className="text-muted mb-0 small">Total Views</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="h4 text-info mb-1">
                {activeLinks.reduce((sum, link) => sum + link.downloads, 0)}
              </h3>
              <p className="text-muted mb-0 small">Total Downloads</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h3 className="h4 text-warning mb-1">{expiredLinks.length}</h3>
              <p className="text-muted mb-0 small">Expired Links</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-transparent border-0">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'active' ? 'active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                <Clock className="me-2" size={16} />
                Active Links ({activeLinks.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'expired' ? 'active' : ''}`}
                onClick={() => setActiveTab('expired')}
              >
                <X className="me-2" size={16} />
                Expired Links ({expiredLinks.length})
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body">
          {activeTab === 'active' ? (
            <div>
              {activeLinks.length > 0 ? (
                activeLinks.map(link => <ShareLinkCard key={link.id} link={link} />)
              ) : (
                <div className="text-center py-5">
                  <Share2 size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No active shared links</h5>
                  <p className="text-muted">Create your first share link to get started.</p>
                </div>
              )}
            </div>
          ) : (
            <div>
              {expiredLinks.length > 0 ? (
                expiredLinks.map(link => <ShareLinkCard key={link.id} link={link} />)
              ) : (
                <div className="text-center py-5">
                  <Clock size={48} className="text-muted mb-3" />
                  <h5 className="text-muted">No expired links</h5>
                  <p className="text-muted">Expired share links will appear here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Share Modal */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-primary">Create Share Link</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Document</label>
                    <select className="form-select">
                      <option>Select document to share</option>
                      <option>Passport.pdf</option>
                      <option>License.jpg</option>
                      <option>Certificate.pdf</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Recipient Email</label>
                    <input type="email" className="form-control" placeholder="recipient@example.com" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Expiry Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="allowDownload" />
                      <label className="form-check-label" htmlFor="allowDownload">
                        Allow download
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="passwordProtect" />
                      <label className="form-check-label" htmlFor="passwordProtect">
                        Password protect
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Create Share Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;