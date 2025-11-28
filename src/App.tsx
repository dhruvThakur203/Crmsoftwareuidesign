import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { AllCasesView } from './components/AllCasesView';
import { ManageUsers } from './components/ManageUsers';
import { ClientCreationForm } from './components/ClientCreationForm';
import { ClientDetailPage } from './components/ClientDetailPage';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users'>('login');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'Master Admin' | 'RM' | 'Field Boy' | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleLogin = (role: 'Master Admin' | 'RM' | 'Field Boy', name: string) => {
    setUserRole(role);
    setUserName(name);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: 'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users', clientId?: string) => {
    if (page === 'login') {
      // Reset user data on logout
      setUserRole(null);
      setUserName('');
    }
    setCurrentPage(page);
    if (clientId) setSelectedClientId(clientId);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {currentPage === 'login' && <LoginPage onLogin={handleLogin} />}
        {currentPage === 'dashboard' && userRole === 'Master Admin' && (
          <AdminDashboard onNavigate={handleNavigate} />
        )}
        {currentPage === 'dashboard' && (userRole === 'RM' || userRole === 'Field Boy') && (
          <UserDashboard onNavigate={handleNavigate} userRole={userRole} userName={userName} />
        )}
        {currentPage === 'all-cases' && userRole && (
          <AllCasesView onNavigate={handleNavigate} userRole={userRole} />
        )}
        {currentPage === 'manage-users' && (
          <ManageUsers onNavigate={handleNavigate} />
        )}
        {currentPage === 'create-client' && <ClientCreationForm onNavigate={handleNavigate} />}
        {currentPage === 'client-detail' && <ClientDetailPage onNavigate={handleNavigate} clientId={selectedClientId} />}
      </div>
      <Toaster />
    </>
  );
}