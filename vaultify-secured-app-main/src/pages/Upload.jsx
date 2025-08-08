import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, Image, File, X, Plus, Check } from 'lucide-react';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { value: 'identity', label: 'Identity Documents' },
    { value: 'medical', label: 'Medical Records' },
    { value: 'education', label: 'Education Certificates' },
    { value: 'financial', label: 'Financial Documents' },
    { value: 'legal', label: 'Legal Documents' },
    { value: 'other', label: 'Other' },
  ];

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFiles.length === 0) return;

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      // Reset form
      setSelectedFiles([]);
      setCategory('');
      setTitle('');
      setDescription('');
      setTags([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert('Documents uploaded successfully!');
    }, 2000);
  };

  const getFileIcon = (file) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type === 'application/pdf') return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary mb-4">Upload Documents</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            {/* File Upload Area */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">Select Files</h5>
                <div
                  className="border border-2 border-dashed rounded-4 p-5 text-center"
                  style={{ borderColor: '#e9ecef' }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <UploadIcon className="text-primary mb-3" size={48} />
                  <h6 className="text-primary mb-2">Drag and drop files here</h6>
                  <p className="text-muted mb-3">or</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="d-none"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    Browse Files
                  </button>
                  <p className="text-muted mt-3 mb-0 small">
                    Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB each)
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="card-title text-primary mb-3">Selected Files</h5>
                  <div className="list-group">
                    {selectedFiles.map((file, index) => {
                      const FileIcon = getFileIcon(file);
                      return (
                        <div key={index} className="list-group-item d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                              <FileIcon className="text-primary" size={18} />
                            </div>
                            <div>
                              <h6 className="mb-1">{file.name}</h6>
                              <small className="text-muted">{formatFileSize(file.size)}</small>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFile(index)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            {/* Document Details */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3">Document Details</h5>
                
                <div className="mb-3">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Document title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Brief description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tags</label>
                  <div className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={addTag}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="badge bg-primary bg-opacity-10 text-primary d-flex align-items-center">
                        {tag}
                        <button
                          type="button"
                          className="btn btn-link p-0 ms-2 text-primary"
                          onClick={() => removeTag(tag)}
                          style={{ fontSize: '12px' }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={selectedFiles.length === 0 || !category || uploading}
              >
                {uploading ? (
                  <>
                    <div className="spinner-border spinner-border-sm me-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="me-2" size={20} />
                    Upload Documents
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Upload;