import { Shield, Lock, Eye, Key, Server, UserCheck } from "lucide-react";

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Your documents are encrypted before they leave your device and can only be decrypted by you.",
      features: ["AES-256 Encryption", "Zero-Knowledge Architecture", "Client-Side Encryption"]
    },
    {
      icon: Key,
      title: "Advanced Authentication",
      description: "Multiple layers of security ensure only you can access your documents.",
      features: ["Two-Factor Authentication", "Biometric Login", "JWT Tokens"]
    },
    {
      icon: Eye,
      title: "Privacy by Design",
      description: "We can't see your documents even if we wanted to. Your privacy is guaranteed.",
      features: ["No Data Mining", "Anonymous Analytics", "GDPR Compliant"]
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Built on enterprise-grade infrastructure with industry-leading security standards.",
      features: ["ISO 27001 Certified", "SOC 2 Type II", "Regular Audits"]
    }
  ];

  return (
    <section id="security" className="py-5" style={{background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)'}}>
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-success bg-opacity-10 text-success mb-3">
            🔒 Bank-Level Security
          </span>
          <h2 className="display-4 fw-bold mb-4">
            Security You Can
            <span className="d-block gradient-primary bg-gradient text-white px-2 py-1 rounded mt-2">
              Trust
            </span>
          </h2>
          <p className="lead text-muted mx-auto" style={{maxWidth: '768px'}}>
            Your documents are protected by the same encryption standards used by banks and governments. 
            We take security seriously so you don't have to worry.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="col-md-6">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body p-4">
                  <div className="d-flex align-items-start">
                    <div className="gradient-primary p-3 rounded me-3 flex-shrink-0">
                      <feature.icon size={24} color="white" />
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title fw-semibold mb-3">
                        {feature.title}
                      </h5>
                      <p className="text-muted mb-3">
                        {feature.description}
                      </p>
                      <div className="d-flex flex-wrap gap-1">
                        {feature.features.map((feat, featIndex) => (
                          <span key={featIndex} className="badge bg-secondary bg-opacity-10 text-secondary">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Certifications */}
        <div className="text-center">
          <h3 className="h2 fw-bold mb-5">
            Trusted & Certified
          </h3>
          <div className="row g-4 opacity-75">
            {[
              { name: "ISO 27001", desc: "Information Security" },
              { name: "SOC 2", desc: "Security Controls" },
              { name: "GDPR", desc: "Privacy Compliant" },
              { name: "HIPAA", desc: "Healthcare Ready" }
            ].map((cert, index) => (
              <div key={index} className="col-6 col-md-3">
                <div className="bg-white p-4 rounded border mb-3">
                  <Shield size={32} color="#0d6efd" className="mx-auto mb-2" />
                  <div className="fw-semibold">{cert.name}</div>
                </div>
                <div className="small text-muted">{cert.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;