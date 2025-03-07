
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLogin from '@/components/admin/AdminLogin';
import ContentEditor from '@/components/admin/ContentEditor';
import MusicUploader from '@/components/admin/MusicUploader';
import { useAdmin } from '@/context/AdminContext';

// Settings Component
const Settings = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Settings</h2>
      <div className="max-w-xl">
        <div className="space-y-6">
          <div className="p-4 border border-input rounded-md">
            <h3 className="font-medium mb-2">Admin Access</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your admin credentials are set as:<br />
              Username: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">Zahid</span><br />
              Password: <span className="font-mono bg-muted px-1.5 py-0.5 rounded">Nassa731</span>
            </p>
            <p className="text-xs text-muted-foreground">
              For security, consider changing these in a production environment.
            </p>
          </div>
          
          <div className="p-4 border border-input rounded-md">
            <h3 className="font-medium mb-2">About This Admin Panel</h3>
            <p className="text-sm text-muted-foreground">
              This admin panel allows you to manage your portfolio content, including sections and music.
              Changes are saved to your browser's local storage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

const Admin = () => {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();
  
  useEffect(() => {
    // Log access
    if (isAuthenticated) {
      console.log('Admin panel accessed at:', new Date().toISOString());
    }
  }, [isAuthenticated]);
  
  // Determine active tab based on path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/admin/music')) return 'music';
    if (path.includes('/admin/settings')) return 'settings';
    return 'content';
  };
  
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <ContentEditor />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route
        path="/music"
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <MusicUploader />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <Settings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all redirect to main admin page */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default Admin;
