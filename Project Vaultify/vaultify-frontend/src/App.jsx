// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import DashboardHome from './pages/DashboardHome';

export default function App() {
    return (
      <Router>
          <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Sidebar />}>
                        <Route index element={<DashboardHome />} />
                    </Route>               
                </Route>
          </Routes>
      </Router>
    );
}
