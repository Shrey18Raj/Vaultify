import React, { useState } from 'react';
import { Upload, Share2, FileText, Clock, Shield, Users, FolderPlus, Tag, TrendingUp, Activity, Calendar, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Home = () => {
  const [folderName, setFolderName] = useState('');
  const [tagName, setTagName] = useState('');
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [showTagDialog, setShowTagDialog] = useState(false);

  const recentActivities = [
    { id: 1, action: 'Uploaded', document: 'Passport.pdf', time: '2 hours ago', type: 'upload' },
    { id: 2, action: 'Shared', document: 'License.pdf', time: '5 hours ago', type: 'share' },
    { id: 3, action: 'Accessed', document: 'Certificate.pdf', time: '1 day ago', type: 'access' },
    { id: 4, action: 'Created', document: 'Birth Certificate.pdf', time: '3 days ago', type: 'upload' },
    { id: 5, action: 'Downloaded', document: 'Insurance Policy.pdf', time: '5 days ago', type: 'download' },
  ];

  const stats = [
    { label: 'Total Documents', value: '24', icon: FileText, color: 'primary' },
    { label: 'Secure Shares', value: '12', icon: Share2, color: 'success' },
    { label: 'Active Links', value: '8', icon: Users, color: 'info' },
    { label: 'Storage Used', value: '2.4GB', icon: TrendingUp, color: 'warning' },
  ];

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      console.log('Creating folder:', folderName);
      setFolderName('');
      setShowFolderDialog(false);
    }
  };

  const handleCreateTag = () => {
    if (tagName.trim()) {
      console.log('Creating tag:', tagName);
      setTagName('');
      setShowTagDialog(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="text-primary mb-1">Welcome back, John!</h2>
              <p className="text-muted mb-0">Your digital identity vault is secure and ready.</p>
            </div>
            <div className="d-flex align-items-center">
              <Shield className="text-success me-2" size={24} />
              <span className="badge bg-success">Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-xl-3 col-md-6 mb-3">
            <div className="card border-0 shadow-sm h-100 transition-smooth">
              <div className="card-body d-flex align-items-center">
                <div className={`bg-${stat.color} bg-opacity-10 rounded-3 p-3 me-3`}>
                  <stat.icon className={`text-${stat.color}`} size={24} />
                </div>
                <div>
                  <h3 className="h4 mb-1 text-primary">{stat.value}</h3>
                  <p className="text-muted mb-0 small">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        {/* Quick Actions */}
        <div className="col-lg-8 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="card-title text-primary">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-lg-6 col-md-12">
                  <button className="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center py-4 mb-3">
                    <Upload className="me-2" size={20} />
                    Upload Document
                  </button>
                </div>
                <div className="col-lg-6 col-md-12">
                  <button className="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center py-4 mb-3">
                    <Share2 className="me-2" size={20} />
                    Share Document
                  </button>
                </div>
                <div className="col-lg-6 col-md-12">
                  <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center justify-content-center py-4">
                        <FolderPlus className="me-2" size={20} />
                        Create Folder
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Folder</DialogTitle>
                        <DialogDescription>
                          Enter a name for your new folder to organize your documents.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="folder-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="folder-name"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter folder name"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowFolderDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateFolder}>Create Folder</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="col-lg-6 col-md-12">
                  <Dialog open={showTagDialog} onOpenChange={setShowTagDialog}>
                    <DialogTrigger asChild>
                      <button className="btn btn-outline-secondary btn-lg w-100 d-flex align-items-center justify-content-center py-4">
                        <Tag className="me-2" size={20} />
                        Create Tag
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Tag</DialogTitle>
                        <DialogDescription>
                          Enter a name for your new tag to categorize your documents.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="tag-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="tag-name"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className="col-span-3"
                            placeholder="Enter tag name"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowTagDialog(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateTag}>Create Tag</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="card-title text-primary d-flex align-items-center">
                <Clock className="me-2" size={18} />
                Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="list-group-item border-0 px-0 transition-smooth">
                    <div className="d-flex align-items-start">
                      <div className={`badge bg-${activity.type === 'upload' ? 'primary' : activity.type === 'share' ? 'success' : activity.type === 'download' ? 'warning' : 'info'} bg-opacity-10 text-${activity.type === 'upload' ? 'primary' : activity.type === 'share' ? 'success' : activity.type === 'download' ? 'warning' : 'info'} me-2 mt-1`}>
                        {activity.type === 'upload' ? <Upload size={12} /> : 
                         activity.type === 'share' ? <Share2 size={12} /> : 
                         activity.type === 'download' ? <Eye size={12} /> :
                         <FileText size={12} />}
                      </div>
                      <div className="flex-1">
                        <p className="mb-1 small">
                          <strong>{activity.action}</strong> {activity.document}
                        </p>
                        <small className="text-muted">{activity.time}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Dashboard Widgets */}
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="card-title text-primary d-flex align-items-center">
                <Activity className="me-2" size={18} />
                Weekly Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="text-center p-3 bg-primary bg-opacity-10 rounded-3">
                    <h6 className="text-primary mb-1">48</h6>
                    <small className="text-muted">Documents Uploaded</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-3 bg-success bg-opacity-10 rounded-3">
                    <h6 className="text-success mb-1">23</h6>
                    <small className="text-muted">Shares Created</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-3 bg-info bg-opacity-10 rounded-3">
                    <h6 className="text-info mb-1">156</h6>
                    <small className="text-muted">Total Views</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center p-3 bg-warning bg-opacity-10 rounded-3">
                    <h6 className="text-warning mb-1">12</h6>
                    <small className="text-muted">New Folders</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent border-0 pb-0">
              <h5 className="card-title text-primary d-flex align-items-center">
                <Calendar className="me-2" size={18} />
                Upcoming Reminders
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 small"><strong>Passport Renewal</strong></p>
                    <small className="text-muted">Due in 30 days</small>
                  </div>
                  <span className="badge bg-warning">Due Soon</span>
                </div>
                <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 small"><strong>Insurance Review</strong></p>
                    <small className="text-muted">Due in 45 days</small>
                  </div>
                  <span className="badge bg-info">Scheduled</span>
                </div>
                <div className="list-group-item border-0 px-0 d-flex justify-content-between align-items-center">
                  <div>
                    <p className="mb-1 small"><strong>Tax Documents</strong></p>
                    <small className="text-muted">Due in 60 days</small>
                  </div>
                  <span className="badge bg-secondary">Pending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;