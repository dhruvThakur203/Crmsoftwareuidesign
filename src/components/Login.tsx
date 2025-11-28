import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'master-admin' | 'rm' | 'valuation' | 'fieldboy') => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Different roles based on username
    if (username === 'admin') {
      onLogin('master-admin');
    } else if (username === 'rm') {
      onLogin('rm');
    } else if (username === 'valuation') {
      onLogin('valuation');
    } else {
      onLogin('fieldboy');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-full">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-center text-gray-800 mb-2">Share Recovery CRM</h1>
        <p className="text-center text-gray-600 mb-8">Sign in to your account</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded">
          <p className="text-gray-600 mb-2">Demo Credentials:</p>
          <ul className="space-y-1">
            <li className="text-gray-700">• admin / password (Master Admin)</li>
            <li className="text-gray-700">• rm / password (Relationship Manager)</li>
            <li className="text-gray-700">• valuation / password (Valuation Team)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
