import React, { useState } from 'react';
import { FileText, Image, File, Share2, Eye, Download, Search, Filter, Grid, List } from 'lucide-react';

const Vault = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const documents = [
    {
      id: 1,
      name: 'Passport.pdf',
      type: 'Identity',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      category: 'identity',
      icon: FileText,
      shared: false,
      description: 'Official passport document'
    },
    {
      id: 2,
      name: 'Driver_License.jpg',
      type: 'Identity',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      category: 'identity',
      icon: Image,
      shared: true,
      description: 'Driver license front and back'
    },
    {
      id: 3,
      name: 'Medical_Certificate.pdf',
      type: 'Medical',
      size: '950 KB',
      uploadDate: '2024-01-12',
      category: 'medical',
      icon: FileText,
      shared: false,
      description: 'Annual medical examination'
    },
    {
      id: 4,
      name: 'Diploma.pdf',
      type: 'Education',
      size: '3.1 MB',
      uploadDate: '2024-01-10',
      category: 'education',
      icon: File,
      shared: true,
      description: 'University graduation diploma'
    },
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'identity', label: 'Identity' },
    { value: 'medical', label: 'Medical' },
    { value: 'education', label: 'Education' },
    { value: 'financial', label: 'Financial' },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const DocumentCard = ({ document }) => (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between mb-3">
          <div className="d-flex align-items-center">
            <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
              <document.icon className="text-primary" size={20} />
            </div>
            <div>
              <h6 className="card-title mb-1 text-primary">{document.name}</h6>
              <small className="text-muted">{document.type}</small>
            </div>
          </div>
          {document.shared && (
            <span className="badge bg-success bg-opacity-10 text-success">
              <Share2 size={12} className="me-1" />
              Shared
            </span>
          )}
        </div>
        
        <p className="text-muted small mb-3">{document.description}</p>
        
        <div className="row text-center mb-3">
          <div className="col-6">
            <small className="text-muted d-block">Size</small>
            <strong className="small">{document.size}</strong>
          </div>
          <div className="col-6">
            <small className="text-muted d-block">Uploaded</small>
            <strong className="small">{document.uploadDate}</strong>
          </div>
        </div>
        
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary btn-sm flex-1">
            <Eye size={14} className="me-1" />
            Preview
          </button>
          <button className="btn btn-primary btn-sm flex-1">
            <Share2 size={14} className="me-1" />
            Share
          </button>
          <button className="btn btn-outline-secondary btn-sm">
            <Download size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  const DocumentListItem = ({ document }) => (
    <div className="card border-0 shadow-sm mb-3">
      <div className="card-body py-3">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                <document.icon className="text-primary" size={18} />
              </div>
              <div>
                <h6 className="mb-1 text-primary">{document.name}</h6>
                <small className="text-muted">{document.description}</small>
              </div>
            </div>
          </div>
          <div className="col-md-2 text-center">
            <small className="text-muted d-block">Type</small>
            <strong className="small">{document.type}</strong>
          </div>
          <div className="col-md-2 text-center">
            <small className="text-muted d-block">Size</small>
            <strong className="small">{document.size}</strong>
          </div>
          <div className="col-md-2 text-end">
            <div className="d-flex gap-1 justify-content-end">
              <button className="btn btn-outline-primary btn-sm">
                <Eye size={14} />
              </button>
              <button className="btn btn-primary btn-sm">
                <Share2 size={14} />
              </button>
              <button className="btn btn-outline-secondary btn-sm">
                <Download size={14} />
              </button>
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
            <h2 className="text-primary mb-0">Document Vault</h2>
            <div className="d-flex gap-2">
              <button 
                className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={16} />
              </button>
              <button 
                className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'} btn-sm`}
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <Search size={16} className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <Filter size={16} className="text-muted" />
            </span>
            <select
              className="form-select border-start-0"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents */}
      {viewMode === 'grid' ? (
        <div className="row">
          {filteredDocuments.map(document => (
            <div key={document.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <DocumentCard document={document} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          {filteredDocuments.map(document => (
            <DocumentListItem key={document.id} document={document} />
          ))}
        </div>
      )}

      {filteredDocuments.length === 0 && (
        <div className="text-center py-5">
          <FileText size={48} className="text-muted mb-3" />
          <h5 className="text-muted">No documents found</h5>
          <p className="text-muted">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Vault;