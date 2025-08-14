import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Security from "@/components/Security";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-vh-100">
      <Header />
      
      {/* Temporary Dashboard Access Button */}
      <div className="container-fluid py-3">
        <div className="text-center">
          <Link 
            to="/home" 
            className="btn btn-warning btn-lg shadow-violet"
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 1050,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              border: 'none',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            🚀 Skip to Dashboard
          </Link>
        </div>
      </div>
      
      <Hero />
      <Features />
      <Security />
      <Footer />
    </div>
  );
};

export default Index;
