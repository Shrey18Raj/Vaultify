import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-md-3">
            <div className="d-flex align-items-center mb-3">
              <div className="gradient-primary p-2 rounded me-2">
                <Shield size={24} color="white" />
              </div>
              <div>
                <h5 className="fw-bold mb-0">Identity Vault</h5>
                <small className="text-white-50">Secure Document Management</small>
              </div>
            </div>
            <p className="small text-white-50">
              The most secure way to store, manage, and share your personal documents with complete privacy and control.
            </p>
          </div>

          {/* Product */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Product</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Features</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Security</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Pricing</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">API Documentation</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Integrations</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">About Us</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Security</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none small">Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-semibold mb-3">Contact</h6>
            <div className="d-grid gap-2 mb-3">
              <div className="d-flex align-items-center text-white-50">
                <Mail size={16} className="me-2" />
                <small>support@identityvault.com</small>
              </div>
              <div className="d-flex align-items-center text-white-50">
                <Phone size={16} className="me-2" />
                <small>+1 (555) 123-4567</small>
              </div>
              <div className="d-flex align-items-center text-white-50">
                <MapPin size={16} className="me-2" />
                <small>San Francisco, CA</small>
              </div>
            </div>
            <button className="btn btn-outline-light btn-sm">
              Get Support
            </button>
          </div>
        </div>

        {/* Bottom */}
        <hr className="border-white border-opacity-25" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="small text-white-50 mb-3 mb-md-0">
            © 2024 Identity Vault. All rights reserved.
          </p>
          <div className="d-flex flex-wrap gap-3 text-white-50 small">
            <span>🔒 256-bit Encrypted</span>
            <span>✅ GDPR Compliant</span>
            <span>🛡️ SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;