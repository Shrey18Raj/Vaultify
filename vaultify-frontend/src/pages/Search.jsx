import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Calendar, FileText, Tag, User } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults] = useState([
    {
      id: 1,
      name: 'Passport.pdf',
      type: 'Identity',
      size: '2.3 MB',
      lastModified: '2024-01-15',
      tags: ['passport', 'identity', 'travel'],
      folder: 'Identity Documents'
    },
    {
      id: 2,
      name: 'Medical_Certificate.pdf',
      type: 'Medical',
      size: '950 KB',
      lastModified: '2024-01-12',
      tags: ['medical', 'certificate', 'health'],
      folder: 'Medical Records'
    }
  ]);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="text-primary mb-4">Search Documents</h2>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white border-end-0">
              <SearchIcon size={20} className="text-primary" />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search documents, tags, content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary gradient-primary">
              Search
            </button>
          </div>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-primary w-100">
            <Filter className="me-2" size={16} />
            Advanced Filters
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-wrap gap-2">
            <span className="badge bg-primary bg-opacity-10 text-primary p-2">
              <Calendar size={14} className="me-1" />
              Last 7 days
            </span>
            <span className="badge bg-primary bg-opacity-10 text-primary p-2">
              <FileText size={14} className="me-1" />
              PDF files
            </span>
            <span className="badge bg-primary bg-opacity-10 text-primary p-2">
              <Tag size={14} className="me-1" />
              Identity
            </span>
            <span className="badge bg-primary bg-opacity-10 text-primary p-2">
              <User size={14} className="me-1" />
              Shared by me
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-transparent">
              <h6 className="mb-0">Search Results ({searchResults.length})</h6>
            </div>
            <div className="card-body p-0">
              {searchResults.map(result => (
                <div key={result.id} className="border-bottom p-4">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 rounded-3 p-2 me-3">
                          <FileText className="text-primary" size={20} />
                        </div>
                        <div>
                          <h6 className="mb-1 text-primary">{result.name}</h6>
                          <small className="text-muted">{result.folder} • {result.size}</small>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex flex-wrap gap-1">
                        {result.tags.map(tag => (
                          <span key={tag} className="badge bg-secondary bg-opacity-10 text-secondary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <small className="text-muted d-block">{result.lastModified}</small>
                      <button className="btn btn-sm btn-outline-primary mt-1">
                        Open
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;