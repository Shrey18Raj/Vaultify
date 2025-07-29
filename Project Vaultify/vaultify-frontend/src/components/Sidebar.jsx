import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser, logout } from '../utils/auth';
import { FiGrid, FiUpload, FiFileText, FiStar, FiShare2, FiSearch, FiTag, FiBarChart2, FiSettings, FiShield, FiSliders } from 'react-icons/fi';
import { PiFolderOpen } from 'react-icons/pi';
import { LuFileSearch, LuTags, LuActivity } from "react-icons/lu";
import '../style/Sidebar.css';

const Sidebar = () => {
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.name) {
            logout();
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <div className= "sidebar">
            <div className= "sidebar-group">
                <p className="sidebar-title">Main</p>
                <NavLink to="/dashboard"><FiGrid />Dashboard</NavLink>
                <NavLink to="/upload"><FiUpload />Upload Documents</NavLink>
                <NavLink to="/documents"><FiFileText />My Documents</NavLink>
                <NavLink to="/folders"><PiFolderOpen />Folders</NavLink>
                <NavLink to="/favorites"><FiStar />Favorites</NavLink>
            </div>

            <div className="sidebar-group">
                <p className="sidebar-title">Sharing</p>
                <NavLink to="/share"><FiShare2 />Share Documents</NavLink>
                <NavLink to="/shared"><LuFileSearch />Shared with me</NavLink>
            </div>

            <div className="sidebar-group">
                <p className="sidebar-title">Search & Tags</p>
                <NavLink to="/search"><FiSearch />Global Search</NavLink>
                <NavLink to="/tags"><LuTags />Tag Manager</NavLink>
            </div>

            <div className="sidebar-group">
                <p className="sidebar-title">Analytics</p>
                <NavLink to="/analytics"><FiBarChart2 />Storage Analytics</NavLink>
                <NavLink to="/activity"><LuActivity />Activity Log</NavLink>
            </div>
            
            <div className="sidebar-group">
                <p className="sidebar-title">Settings</p>
                <NavLink to="/account"><FiSettings />Account Settings</NavLink>
                <NavLink to="/security"><FiShield />Security</NavLink>
                <NavLink to="/preferences"><FiSliders />Preferences</NavLink>
            </div>
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
        </div>
    );
};

export default Sidebar;