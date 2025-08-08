import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary mb-4">404</h1>
        <p className="h4 text-muted mb-4">Oops! Page not found</p>
        <a href="/" className="btn btn-primary gradient-primary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
