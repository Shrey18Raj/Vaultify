import React from 'react';
import { BarChart3, TrendingUp, Eye, Download, Share2, Clock, FileText, Users } from 'lucide-react';

const Analytics = () => {
  const stats = [
    { label: 'Total Documents', value: '24', icon: FileText, color: '#7c3aed', change: '+12%' },
    { label: 'Total Views', value: '1,247', icon: Eye, color: '#059669', change: '+8%' },
    { label: 'Downloads', value: '89', icon: Download, color: '#d97706', change: '+23%' },
    { label: 'Shares', value: '15', icon: Share2, color: '#dc2626', change: '+5%' }
  ];

  const recentActivity = [
    { action: 'Document viewed', document: 'Passport.pdf', time: '2 minutes ago' },
    { action: 'Document shared', document: 'Medical_Cert.pdf', time: '1 hour ago' },
    { action: 'Document uploaded', document: 'License.jpg', time: '3 hours ago' },
    { action: 'Document downloaded', document: 'Diploma.pdf', time: '5 hours ago' }
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary mb-4">Analytics Dashboard</h2>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-lg-3 col-md-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <p className="text-muted small mb-1">{stat.label}</p>
                    <h3 className="h4 fw-bold mb-0" style={{ color: stat.color }}>
                      {stat.value}
                    </h3>
                    <small className="text-success">
                      <TrendingUp size={12} className="me-1" />
                      {stat.change}
                    </small>
                  </div>
                  <div 
                    className="rounded-3 p-3"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon size={24} color={stat.color} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Chart Placeholder */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Document Activity</h6>
            </div>
            <div className="card-body text-center py-5">
              <BarChart3 size={64} className="text-muted mb-3" />
              <h6 className="text-muted">Document Activity Chart</h6>
              <p className="text-muted small">View trends and usage patterns over time</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Recent Activity</h6>
            </div>
            <div className="card-body p-0">
              {recentActivity.map((activity, index) => (
                <div key={index} className="border-bottom p-3">
                  <div className="d-flex align-items-center">
                    <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                      <Clock size={14} className="text-primary" />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-1 small fw-medium">{activity.action}</p>
                      <p className="mb-1 small text-primary">{activity.document}</p>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Document Performance */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Top Performing Documents</h6>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Document</th>
                      <th>Views</th>
                      <th>Downloads</th>
                      <th>Shares</th>
                      <th>Last Accessed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <FileText size={16} className="text-primary me-2" />
                          Passport.pdf
                        </div>
                      </td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">45</span></td>
                      <td><span className="badge bg-info bg-opacity-10 text-info">12</span></td>
                      <td><span className="badge bg-warning bg-opacity-10 text-warning">3</span></td>
                      <td><small className="text-muted">2 minutes ago</small></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <FileText size={16} className="text-primary me-2" />
                          Medical_Certificate.pdf
                        </div>
                      </td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">32</span></td>
                      <td><span className="badge bg-info bg-opacity-10 text-info">8</span></td>
                      <td><span className="badge bg-warning bg-opacity-10 text-warning">2</span></td>
                      <td><small className="text-muted">1 hour ago</small></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <FileText size={16} className="text-primary me-2" />
                          Diploma.pdf
                        </div>
                      </td>
                      <td><span className="badge bg-success bg-opacity-10 text-success">28</span></td>
                      <td><span className="badge bg-info bg-opacity-10 text-info">15</span></td>
                      <td><span className="badge bg-warning bg-opacity-10 text-warning">5</span></td>
                      <td><small className="text-muted">3 hours ago</small></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;