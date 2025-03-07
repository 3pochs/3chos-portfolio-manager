
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Music, 
  Palette, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    // Try Supabase logout first
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Supabase logout error:', error);
    }
    
    // Then legacy logout (this will handle UI state regardless of Supabase success)
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };
  
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-background border-r border-border">
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-1">
              <NavItem
                to="/admin"
                icon={<FileText className="mr-3 h-5 w-5" />}
                label="Content"
                isActive={activeTab === 'content'}
              />
              
              <NavItem
                to="/admin/projects"
                icon={<Image className="mr-3 h-5 w-5" />}
                label="Projects"
                isActive={activeTab === 'projects'}
              />
              
              <NavItem
                to="/admin/music"
                icon={<Music className="mr-3 h-5 w-5" />}
                label="Music"
                isActive={activeTab === 'music'}
              />
              
              <NavItem
                to="/admin/theme"
                icon={<Palette className="mr-3 h-5 w-5" />}
                label="Theme"
                isActive={activeTab === 'theme'}
              />
              
              <NavItem
                to="/admin/settings"
                icon={<Settings className="mr-3 h-5 w-5" />}
                label="Settings"
                isActive={activeTab === 'settings'}
              />
            </nav>
          </div>
          
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
            
            <div className="mt-4 px-4 py-2 text-xs text-muted-foreground">
              <p>
                <a 
                  href="/" 
                  className="hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Site
                </a>
              </p>
            </div>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-background border-b border-border z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-bold">Admin Panel</h1>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-sm text-primary hover:underline">View Site</Link>
              <button
                onClick={handleLogout}
                className="p-2 text-destructive hover:bg-destructive/10 rounded-md"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex overflow-x-auto border-t border-border p-1">
            <MobileNavItem
              to="/admin"
              icon={<FileText className="h-5 w-5 mx-auto" />}
              label="Content"
              isActive={activeTab === 'content'}
            />
            
            <MobileNavItem
              to="/admin/projects"
              icon={<Image className="h-5 w-5 mx-auto" />}
              label="Projects"
              isActive={activeTab === 'projects'}
            />
            
            <MobileNavItem
              to="/admin/music"
              icon={<Music className="h-5 w-5 mx-auto" />}
              label="Music"
              isActive={activeTab === 'music'}
            />
            
            <MobileNavItem
              to="/admin/theme"
              icon={<Palette className="h-5 w-5 mx-auto" />}
              label="Theme"
              isActive={activeTab === 'theme'}
            />
            
            <MobileNavItem
              to="/admin/settings"
              icon={<Settings className="h-5 w-5 mx-auto" />}
              label="Settings"
              isActive={activeTab === 'settings'}
            />
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="md:p-0 p-4 pt-32 md:pt-0">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-foreground hover:bg-secondary'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

const MobileNavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center px-4 py-2 text-xs rounded-md flex-1 ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground hover:bg-secondary'
      }`}
    >
      {icon}
      <span className="mt-1">{label}</span>
    </Link>
  );
};

export default AdminLayout;
