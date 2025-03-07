
import React from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Music, Settings, LogOut } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: 'dashboard' | 'content' | 'music' | 'settings';
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            3chos <span className="text-muted-foreground font-normal">Admin</span>
          </h1>
          
          <button
            onClick={handleLogout}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </button>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="bg-background rounded-lg border border-border overflow-hidden">
              <div className="p-4 border-b border-border">
                <h2 className="font-medium">Navigation</h2>
              </div>
              
              <div className="p-2">
                <NavItem
                  icon={<LayoutGrid size={18} />}
                  label="Content"
                  isActive={activeTab === 'content'}
                  onClick={() => navigate('/admin')}
                />
                
                <NavItem
                  icon={<Music size={18} />}
                  label="Music"
                  isActive={activeTab === 'music'}
                  onClick={() => navigate('/admin/music')}
                />
                
                <NavItem
                  icon={<Settings size={18} />}
                  label="Settings"
                  isActive={activeTab === 'settings'}
                  onClick={() => navigate('/admin/settings')}
                />
              </div>
            </nav>
            
            <div className="mt-4 p-4 bg-background rounded-lg border border-border">
              <h3 className="text-sm font-medium mb-2">Quick Tips</h3>
              <p className="text-xs text-muted-foreground">
                Use drag and drop to rearrange sections or upload your music files.
              </p>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-grow">
            <div className="bg-background rounded-lg border border-border overflow-hidden">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-md mb-1 transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-secondary text-foreground'
      }`}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default AdminLayout;
