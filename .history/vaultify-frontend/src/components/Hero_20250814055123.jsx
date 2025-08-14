import { Shield, Lock, Share2, Eye } from "lucide-react";

const Hero = () => {
  return (
    <section className="position-relative py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', minHeight: '100vh'}}>
      <div className="container py-5">
        <div className="row align-items-center min-vh-100">
          {/* Content */}
          <div className="col-lg-6 pe-lg-5">
            <div className="mb-4">
              <span className="badge bg-success bg-opacity-10 text-success mb-3">
                🔐 End-to-End Encrypted
              </span>
              <h1 className="display-3 fw-bold mb-3 lh-1">
                Your Digital 
                <span className="d-block gradient-primary bg-gradient text-white px-2 py-1 rounded">
                  Identity
                </span>
                Secured Forever
              </h1>
              <p className="lead text-muted mb-4">
                Store, manage, and share your personal documents with military-grade encryption. 
                Take control of your digital identity with time-bound access and complete privacy.
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
              <button className="btn btn-primary btn-lg gradient-primary border-0 shadow-glow">
                Start Securing Now
              </button>
              <button className="btn btn-outline-primary btn-lg">
                Watch Demo
              </button>
            </div>

            <div className="d-flex flex-wrap gap-4 text-muted">
              <div className="d-flex align-items-center">
                <Shield size={16} color="#198754" className="me-2" />
                <small>256-bit Encryption</small>
              </div>
              <div className="d-flex align-items-center">
                <Lock size={16} color="#198754" className="me-2" />
                <small>Zero-Knowledge</small>
              </div>
              <div className="d-flex align-items-center">
                <Share2 size={16} color="#198754" className="me-2" />
                <small>Controlled Sharing</small>
              </div>
            </div>
          </div>
          
          {/* Visual Demo */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title fw-semibold mb-0">Your Documents</h5>
                  <div className="d-flex align-items-center text-success">
                    <Shield size={16} className="me-1" />
                    <small>Encrypted</small>
                  </div>
                </div>
                
                <div className="d-grid gap-3">
                  {[
                    { name: "Aadhaar Card", type: "Government ID", status: "Verified" },
                    { name: "PAN Card", type: "Financial", status: "Verified" },
                    { name: "Driving License", type: "Government ID", status: "Verified" },
                    { name: "Degree Certificate", type: "Academic", status: "Pending" }
                  ].map((doc, index) => (
                    <div 
                      key={index}
                      className="d-flex justify-content-between align-items-center p-3 bg-light rounded border"
                    >
                      <div>
                        <p className="fw-medium mb-1 small">{doc.name}</p>
                        <p className="text-muted small mb-0">{doc.type}</p>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className={`badge ${
                          doc.status === 'Verified' 
                            ? 'bg-success bg-opacity-10 text-success' 
                            : 'bg-secondary bg-opacity-10 text-secondary'
                        }`}>
                          {doc.status}
                        </span>
                        <Eye size={16} className="text-muted" />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-3 border-top mt-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Total Documents</small>
                    <small className="fw-medium">4 Stored Securely</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;