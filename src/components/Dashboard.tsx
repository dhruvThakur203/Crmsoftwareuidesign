import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { StatsCards } from './StatsCards';
import { ClientsTable } from './ClientsTable';
import { ActivityFeed } from './ActivityFeed';
import { RecentValuations } from './RecentValuations';

interface DashboardProps {
  userRole: 'master-admin' | 'rm' | 'valuation' | 'fieldboy';
  onNavigate: (view: string) => void;
}

export function Dashboard({ userRole, onNavigate }: DashboardProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole={userRole} onNavigate={onNavigate} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userRole={userRole} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h2 className="text-gray-900 mb-1">Dashboard</h2>
              <p className="text-gray-600">Welcome back! Here's your overview</p>
            </div>

            {userRole === 'master-admin' && <StatsCards />}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ClientsTable onViewClient={() => onNavigate('client-details')} />
              </div>
              
              <div className="space-y-6">
                {userRole === 'master-admin' && <ActivityFeed />}
                {(userRole === 'valuation' || userRole === 'master-admin') && <RecentValuations />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
