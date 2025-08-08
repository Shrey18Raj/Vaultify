import React, { useState } from 'react';
import { Tag, Plus, Hash, FileText, Trash2, Edit } from 'lucide-react';

const Tags = () => {
  const [tags, setTags] = useState([
    { id: 1, name: 'passport', count: 3, color: '#7c3aed' },
    { id: 2, name: 'identity', count: 5, color: '#059669' },
    { id: 3, name: 'medical', count: 4, color: '#dc2626' },
    { id: 4, name: 'financial', count: 8, color: '#d97706' },
    { id: 5, name: 'legal', count: 2, color: '#0ea5e9' },
    { id: 6, name: 'education', count: 3, color: '#8b5cf6' },
    { id: 7, name: 'travel', count: 6, color: '#10b981' },
    { id: 8, name: 'certificate', count: 4, color: '#f59e0b' }
  ]);

  const [newTagName, setNewTagName] = useState('');
  const [showCreateTag, setShowCreateTag] = useState(false);

  const colors = ['#7c3aed', '#059669', '#dc2626', '#d97706', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'];

  const handleCreateTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: tags.length + 1,
        name: newTagName.toLowerCase(),
        count: 0,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setTags([...tags, newTag]);
      setNewTagName('');
      setShowCreateTag(false);
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary mb-0">Document Tags</h2>
            <button 
              className="btn btn-primary gradient-primary border-0 shadow-violet"
              onClick={() => setShowCreateTag(true)}
            >
              <Plus className="me-2" size={16} />
              Create Tag
            </button>
          </div>
        </div>
      </div>

      {/* Tag Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center slide-up" style={{animationDelay: '0.1s'}}>
            <div className="card-body">
              <h3 className="h4 text-primary mb-1">{tags.length}</h3>
              <p className="text-muted mb-0 small">Total Tags</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center slide-up" style={{animationDelay: '0.2s'}}>
            <div className="card-body">
              <h3 className="h4 text-success mb-1">
                {tags.reduce((total, tag) => total + tag.count, 0)}
              </h3>
              <p className="text-muted mb-0 small">Tagged Documents</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center slide-up" style={{animationDelay: '0.3s'}}>
            <div className="card-body">
              <h3 className="h4 text-info mb-1">
                {Math.max(...tags.map(tag => tag.count))}
              </h3>
              <p className="text-muted mb-0 small">Most Used</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm text-center slide-up" style={{animationDelay: '0.4s'}}>
            <div className="card-body">
              <h3 className="h4 text-warning mb-1">
                {Math.round(tags.reduce((total, tag) => total + tag.count, 0) / tags.length)}
              </h3>
              <p className="text-muted mb-0 small">Average per Tag</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm slide-up" style={{animationDelay: '0.5s'}}>
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Tags Cloud</h6>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap gap-3">
                {tags.map(tag => (
                  <span
                    key={tag.id}
                    className="badge p-3 d-flex align-items-center"
                    style={{
                      backgroundColor: `${tag.color}15`,
                      color: tag.color,
                      fontSize: `${12 + (tag.count * 2)}px`,
                      border: `1px solid ${tag.color}30`
                    }}
                  >
                    <Hash size={14} className="me-1" />
                    {tag.name}
                    <span className="ms-2 small">({tag.count})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags List */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm slide-up" style={{animationDelay: '0.6s'}}>
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Manage Tags</h6>
            </div>
            <div className="card-body p-0">
              {tags.map(tag => (
                <div key={tag.id} className="border-bottom p-3">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-3 p-2 me-3"
                          style={{ backgroundColor: `${tag.color}15` }}
                        >
                          <Tag size={16} color={tag.color} />
                        </div>
                        <div>
                          <h6 className="mb-1" style={{ color: tag.color }}>#{tag.name}</h6>
                          <small className="text-muted">{tag.count} documents</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3 text-center">
                      <div className="progress" style={{ height: '8px' }}>
                        <div 
                          className="progress-bar"
                          style={{ 
                            width: `${(tag.count / Math.max(...tags.map(t => t.count))) * 100}%`,
                            backgroundColor: tag.color
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-primary">
                          <FileText size={14} />
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <Edit size={14} />
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Tag Modal */}
      {showCreateTag && (
        <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="gradient-primary p-2 rounded me-2">
                    <Hash size={20} color="white" />
                  </div>
                  <h5 className="modal-title fw-bold">Create New Tag</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateTag(false)}
                ></button>
              </div>
              <div className="modal-body pt-2">
                <form onSubmit={(e) => {e.preventDefault(); handleCreateTag();}}>
                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      <Tag size={16} className="me-2" />
                      Tag Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter tag name"
                      value={newTagName}
                      onChange={(e) => setNewTagName(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary gradient-primary w-100 py-2 fw-medium border-0"
                    disabled={!newTagName.trim()}
                  >
                    Create Tag
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

export default Tags;