import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from 
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './layout/DashboardLayout';
import MyDocuments from './pages/MyDocuments';
import UploadDocuments from './pages/UploadDocument';
import { AuthProvider } from './context/AuthProvider';
import DocumentDetail from './pages/DocumentDetail';
import FolderView from './pages/FolderView';
import SharingPage from './pages/SharingPage';

export default function App() {
    return (
      <Router>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>   
                    <Route element={<DashboardLayout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                            <Route path="/dashboard" element={<div>Welcome to Vaultify Dashboard</div>} />
                            <Route path="/documents" element={<MyDocuments />} />
                            <Route path="/documents/upload" element={<UploadDocuments />} />
                            <Route path='/documents/:id' element={<DocumentDetail />} />
                            <Route path="/folders" element={<FolderView />} />
                            <Route path="/sharing" element={<SharingPage />} />
                            <Route path="/analytics" element={<div>Analytics Overview</div>} />
                            <Route path="/settings" element={<div>Account & Settings</div>} />
                    </Route>        
                </Route>
            </Routes>
        </AuthProvider>
      </Router>
    );
}
