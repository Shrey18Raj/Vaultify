import { Shield, Clock, Share2, FileText, Smartphone, Globe } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Encryption",
      description: "AES-256 encryption ensures your documents are protected with the same level of security used by governments and financial institutions.",
      color: "#0d6efd"
    },
    {
      icon: Clock,
      title: "Time-Bound Access",
      description: "Share documents with expiring tokens. Set custom time limits and revoke access anytime for complete control.",
      color: "#0dcaf0"
    },
    {
      icon: Share2,
      title: "Controlled Sharing",
      description: "Generate secure sharing links with granular permissions. Track who accessed your documents and when.",
      color: "#198754"
    },
    {
      icon: FileText,
      title: "Smart Organization",
      description: "Automatically categorize documents by type. Government IDs, academic certificates, medical records - all organized intelligently.",
      color: "#0d6efd"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access your secure vault from any device. Responsive design ensures seamless experience across desktop, tablet, and mobile.",
      color: "#0dcaf0"
    },
    {
      icon: Globe,
      title: "Global Access",
      description: "Access your documents from anywhere in the world with secure cloud synchronization and offline capabilities.",
      color: "#198754"
    }
  ];

  return (
    <section id="features" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary mb-3">
            ✨ Powerful Features
          </span>
          <h2 className="display-4 fw-bold mb-4">
            Everything You Need for
            <span className="d-block gradient-primary bg-gradient text-white px-2 py-1 rounded mt-2">
              Secure Storage
            </span>
          </h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '768px'}}>
            Our comprehensive platform provides all the tools you need to manage your digital identity 
            with confidence and complete security.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm transition-smooth" style={{transition: 'transform 0.3s ease'}}>
                <div className="card-body p-4">
                  <div className="mb-3">
                    <div className="rounded p-3 d-inline-flex" style={{background: `${feature.color}15`}}>
                      <feature.icon size={24} color={feature.color} />
                    </div>
                  </div>
                  <h5 className="card-title fw-semibold mb-3">
                    {feature.title}
                  </h5>
                  <p className="card-text text-muted">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row text-center g-4">
          {[
            { number: "256-bit", label: "Encryption Standard" },
            { number: "99.9%", label: "Uptime Guarantee" },
            { number: "< 2 sec", label: "Document Access" },
            { number: "24/7", label: "Security Monitoring" }
          ].map((stat, index) => (
            <div key={index} className="col-6 col-md-3">
              <div className="display-5 fw-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="small text-muted">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;