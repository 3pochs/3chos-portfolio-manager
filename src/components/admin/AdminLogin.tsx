
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdmin } from '@/context/AdminContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin: React.FC = () => {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Handle Supabase login
  const handleSupabaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Login with Supabase
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success('Successfully logged in');
      
      // Redirect to admin dashboard or previous page
      const from = (location.state as any)?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
      
      // Try legacy login as fallback
      handleLegacyLogin();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle legacy login with hardcoded credentials
  const handleLegacyLogin = async () => {
    try {
      const success = await login(username, password);
      if (success) {
        const from = (location.state as any)?.from?.pathname || '/admin';
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Legacy login error:', error);
    }
  };
  
  // Handle Supabase signup
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success('Account created successfully! Please log in.');
      setIsSignUp(false);
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full p-8 bg-background rounded-xl shadow-sm border border-border">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">
            {isSignUp ? 'Create Admin Account' : 'Admin Login'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isSignUp 
              ? 'Create your account to manage your portfolio' 
              : 'Log in to manage your portfolio'}
          </p>
        </div>
        
        <form onSubmit={isSignUp ? handleSignUp : handleSupabaseLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
              autoFocus
            />
          </div>
          
          {isSignUp && (
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        
        {/* Legacy login option */}
        {!isSignUp && (
          <div className="mt-4">
            <div className="relative py-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-background text-muted-foreground">
                  Or use legacy login
                </span>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="legacy-username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  id="legacy-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md"
                  placeholder="Username"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-primary hover:underline focus:outline-none"
          >
            {isSignUp 
              ? 'Already have an account? Log in' 
              : 'Need an account? Sign up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
