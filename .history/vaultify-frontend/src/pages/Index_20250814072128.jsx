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
      <Hero />
      <Features />
      <Security />
      <Footer />
    </div>
  );
};

export default Index;