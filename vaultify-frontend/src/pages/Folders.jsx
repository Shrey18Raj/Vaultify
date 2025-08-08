import React, { useState } from 'react';
import { Folder, Plus, FileText, MoreVertical, Edit, Trash2, FolderOpen } from 'lucide-react';

const Folders = () => {
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: 'Identity Documents',
      itemCount: 5,
      lastModified: '2024-01-15',
      color: '#7c3aed'
    },
    {
      id: 2,
      name: 'Medical Records',
      itemCount: 3,
      lastModified: '2024-01-12',
      color: '#059669'
    },
    {
      id: 3,
      name: 'Financial Documents',
      itemCount: 8,
      lastModified: '2024-01-10',
      color: '#d97706'
    },
    {
      id: 4,
      name: 'Legal Papers',
      itemCount: 2,
      lastModified: '2024-01-08',
      color: '#dc2626'
    }
  ]);

  const [newFolderName, setNewFolderName] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: folders.length + 1,
        name: newFolderName,
        itemCount: 0,
        lastModified: new Date().toISOString().split('T')[0],
        color: '#7c3aed'
      };
      setFolders([...folders, newFolder]);
      setNewFolderName('');
      setShowCreateFolder(false);
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary mb-0">Document Folders</h2>
            <button 
              className="btn btn-primary gradient-primary border-0 shadow-violet"
              onClick={() => setShowCreateFolder(true)}
            >
              <Plus className="me-2" size={16} />
              New Folder
            </button>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {folders.map((folder, index) => (
          <div key={folder.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card border-0 shadow-sm h-100 transition-smooth slide-up scale-hover" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="card-body text-center p-4">
                <div className="mb-3">
                  <FolderOpen size={48} color={folder.color} />
                </div>
                <h6 className="card-title fw-bold text-primary mb-2">{folder.name}</h6>
                <p className="text-muted small mb-3">{folder.itemCount} items</p>
                <p className="text-muted small">Modified: {folder.lastModified}</p>
                
                <div className="dropdown">
                  <button className="btn btn-link text-muted" data-bs-toggle="dropdown">
                    <MoreVertical size={16} />
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item"><Edit size={14} className="me-2" />Rename</button></li>
                    <li><button className="dropdown-item text-danger"><Trash2 size={14} className="me-2" />Delete</button></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="gradient-primary p-2 rounded me-2">
                    <FolderOpen size={20} color="white" />
                  </div>
                  <h5 className="modal-title fw-bold">Create New Folder</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateFolder(false)}
                ></button>
              </div>
              <div className="modal-body pt-2">
                <form onSubmit={(e) => {e.preventDefault(); handleCreateFolder();}}>
                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      <Folder size={16} className="me-2" />
                      Folder Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary gradient-primary w-100 py-2 fw-medium border-0"
                    disabled={!newFolderName.trim()}
                  >
                    Create Folder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Folders;