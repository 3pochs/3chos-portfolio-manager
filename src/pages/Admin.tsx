
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminLogin from '@/components/admin/AdminLogin';
import ContentEditor from '@/components/admin/ContentEditor';
import MusicUploader from '@/components/admin/MusicUploader';
import ProjectsManager from '@/components/admin/ProjectsManager';
import ThemeSettings from '@/components/admin/ThemeSettings';
import { useAdmin } from '@/context/AdminContext';
import { supabase } from '@/integrations/supabase/client';

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
              Admin access is now managed through Supabase authentication.
            </p>
          </div>
          
          <div className="p-4 border border-input rounded-md">
            <h3 className="font-medium mb-2">About This Admin Panel</h3>
            <p className="text-sm text-muted-foreground">
              This admin panel allows you to manage your portfolio content, including sections, projects, music, and theme.
              Changes are saved to your browser's local storage and Supabase.
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
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setIsLoading(false);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setIsLoading(false);
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!session && !isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

const Login = () => {
  return <AdminLogin />;
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
    if (path.includes('/admin/projects')) return 'projects';
    if (path.includes('/admin/music')) return 'music';
    if (path.includes('/admin/theme')) return 'theme';
    if (path.includes('/admin/settings')) return 'settings';
    return 'content';
  };
  
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      
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
        path="projects"
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <ProjectsManager />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="music"
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <MusicUploader />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="theme"
        element={
          <ProtectedRoute>
            <AdminLayout activeTab={getActiveTab()}>
              <ThemeSettings />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="settings"
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
