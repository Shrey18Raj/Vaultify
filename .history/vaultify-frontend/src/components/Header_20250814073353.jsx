import React, { useState } from "react";
import { Shield, Menu, X, Mail, Lock, User } from "lucide-react";
import { loginUser, registerUser } from "./authService";

const AuthPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Sign In state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  // Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setSignInLoading(true);
    setSignInError("");
    try {
      const data = await loginUser({ email: signInEmail, password: signInPassword });
      console.log("Login successful:", data);
      setShowSignIn(false);
      window.location.href = "/home";
    } catch (err) {
      console.error(err);
      setSignInError("Invalid email or password");
    } finally {
      setSignInLoading(false);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");
    try {
      const data = await registerUser({ name: regName, email: regEmail, password: regPassword });
      console.log("Registration successful:", data);
      setShowRegister(false);
      setShowSignIn(true);
    } catch (err) {
      console.error(err);
      setRegError("Registration failed. Try again.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <header className="navbar navbar-expand-md navbar-light bg-white sticky-top border-bottom">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <div className="gradient-primary p-2 rounded me-2">
            <Shield size={24} color="white" />
          </div>
          <div>
            <h1 className="h5 fw-bold mb-0">Identity Vault</h1>
            <small className="text-muted">Secure Document Management</small>
          </div>
        </a>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-md-0">
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#security">
                Security
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#pricing">
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-medium" href="#contact">
                Contact
              </a>
            </li>
          </ul>

          <div className="d-flex flex-column flex-md-row gap-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowSignIn(true)}
            >
              Sign In
            </button>
            <button
              className="btn btn-primary gradient-primary border-0"
              onClick={() => setShowRegister(true)}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignIn && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="gradient-primary p-2 rounded me-2">
                    <Shield size={20} color="white" />
                  </div>
                  <h5 className="modal-title fw-bold">Sign In to Identity Vault</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSignIn(false)}
                ></button>
              </div>
              <div className="modal-body pt-2">
                <form onSubmit={handleSignIn}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      <Lock size={16} className="me-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required
                    />
                  </div>
                  {signInError && <p className="text-danger">{signInError}</p>}
                  <button
                    type="submit"
                    className="btn btn-primary gradient-primary w-100 py-2 fw-medium border-0"
                    disabled={signInLoading}
                  >
                    {signInLoading ? "Signing In..." : "Sign In Securely"}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSignIn(false);
                        setShowRegister(true);
                      }}
                      className="text-primary fw-medium"
                    >
                      Create one here
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="gradient-primary p-2 rounded me-2">
                    <Shield size={20} color="white" />
                  </div>
                  <h5 className="modal-title fw-bold">Create Your Secure Vault</h5>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegister(false)}
                ></button>
              </div>
              <div className="modal-body pt-2">
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      <User size={16} className="me-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-medium">
                      <Lock size={16} className="me-2" />
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Create a strong password"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      required
                    />
                  </div>
                  {regError && <p className="text-danger">{regError}</p>}
                  <button
                    type="submit"
                    className="btn btn-primary gradient-primary w-100 py-2 fw-medium border-0"
                    disabled={regLoading}
                  >
                    {regLoading ? "Creating Account..." : "Create Secure Account"}
                  </button>
                </form>
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Already have an account?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowRegister(false);
                        setShowSignIn(true);
                      }}
                      className="text-primary fw-medium"
                    >
                      Sign in here
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AuthPage;
