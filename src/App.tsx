import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';
import { AllCasesView } from './components/AllCasesView';
import { ManageUsers } from './components/ManageUsers';
import { ClientCreationForm } from './components/ClientCreationForm';
import { ClientDetailPage } from './components/ClientDetailPage';
import { AutomatedReminders } from './components/AutomatedReminders';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users' | 'reminders'>('login');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'Master Admin' | 'RM' | 'Field Boy' | 'Valuation Analyst' | null>(null);
  const [userName, setUserName] = useState<string>('');

  const handleLogin = (role: 'Master Admin' | 'RM' | 'Field Boy' | 'Valuation Analyst', name: string) => {
    setUserRole(role);
    setUserName(name);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: 'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users' | 'reminders', clientId?: string) => {
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
        {currentPage === 'dashboard' && (userRole === 'RM' || userRole === 'Field Boy' || userRole === 'Valuation Analyst') && (
          <UserDashboard onNavigate={handleNavigate} userRole={userRole} userName={userName} />
        )}
        {currentPage === 'all-cases' && userRole && (
          <AllCasesView onNavigate={handleNavigate} userRole={userRole} />
        )}
        {currentPage === 'manage-users' && (
          <ManageUsers onNavigate={handleNavigate} />
        )}
        {currentPage === 'reminders' && userRole === 'Master Admin' && (
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <button onClick={() => handleNavigate('dashboard')} className="text-gray-600 hover:text-gray-900">
                    ← Back
                  </button>
                  <div>
                    <h1 className="text-gray-900">Automated Reminders</h1>
                    <p className="text-gray-600 text-xs sm:text-sm">Manage automated communication rules</p>
                  </div>
                </div>
              </div>
            </header>
            <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
              <AutomatedReminders />
            </div>
          </div>
        )}
        {currentPage === 'create-client' && <ClientCreationForm onNavigate={handleNavigate} />}
        {currentPage === 'client-detail' && <ClientDetailPage onNavigate={handleNavigate} clientId={selectedClientId} userRole={userRole || 'RM'} />}
      </div>
      <Toaster />
    </>
  );
}