import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginPageProps {
  onLogin: (role: 'Master Admin' | 'RM' | 'Field Boy' | 'Valuation Analyst', userName: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mock authentication - replace with real authentication
    const users = {
      'admin': { password: 'admin123', role: 'Master Admin' as const, name: 'Admin User' },
      'rm1': { password: 'rm123', role: 'RM' as const, name: 'Vikram Singh' },
      'rm2': { password: 'rm123', role: 'RM' as const, name: 'Anjali Reddy' },
      'field1': { password: 'field123', role: 'Field Boy' as const, name: 'Ravi Kumar' },
      'field2': { password: 'field123', role: 'Field Boy' as const, name: 'Suresh Yadav' },
      'valuation1': { password: 'valuation123', role: 'Valuation Analyst' as const, name: 'Priya Sharma' },
      'valuation2': { password: 'valuation123', role: 'Valuation Analyst' as const, name: 'Amit Patel' },
    };

    const user = users[username as keyof typeof users];
    
    if (user && user.password === password) {
      onLogin(user.role, user.name);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600 p-4 rounded-full">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-center mb-2 text-gray-900">WealthMax CRM</h1>
        <p className="text-center text-gray-600 mb-8">Login with credentials provided by Master Admin</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                placeholder="Enter username"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
            Login
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          No signup option - Admin assigned credentials only
        </p>
        
        {/* Demo credentials hint */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-900 text-sm mb-2">Demo Credentials:</p>
          <p className="text-blue-700 text-xs">Admin: admin/admin123</p>
          <p className="text-blue-700 text-xs">RM: rm1/rm123</p>
          <p className="text-blue-700 text-xs">Field Boy: field1/field123</p>
          <p className="text-blue-700 text-xs">Valuation Analyst: valuation1/valuation123</p>
        </div>
      </div>
    </div>
  );
}