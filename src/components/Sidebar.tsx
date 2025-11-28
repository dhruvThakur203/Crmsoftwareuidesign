import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  FolderOpen, 
  Calculator,
  Settings,
  Shield,
  FileText,
  TrendingUp
} from 'lucide-react';
import { Button } from './ui/button';

interface SidebarProps {
  userRole: 'master-admin' | 'rm' | 'valuation' | 'fieldboy';
  onNavigate: (view: string) => void;
}

export function Sidebar({ userRole, onNavigate }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard', roles: ['master-admin', 'rm', 'valuation', 'fieldboy'] },
    { icon: UserPlus, label: 'Create Case', view: 'client-creation', roles: ['master-admin', 'rm'] },
    { icon: FolderOpen, label: 'All Cases', view: 'dashboard', roles: ['master-admin', 'rm', 'valuation', 'fieldboy'] },
    { icon: Calculator, label: 'Valuations', view: 'dashboard', roles: ['master-admin', 'valuation'] },
    { icon: TrendingUp, label: 'Analytics', view: 'dashboard', roles: ['master-admin'] },
    { icon: Users, label: 'User Management', view: 'user-management', roles: ['master-admin'] },
    { icon: FileText, label: 'Documents', view: 'dashboard', roles: ['master-admin', 'rm', 'valuation'] },
    { icon: Settings, label: 'Settings', view: 'dashboard', roles: ['master-admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white">Share Recovery</h1>
            <p className="text-gray-400">CRM System</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <Button
            key={item.view}
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => onNavigate(item.view)}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="bg-indigo-900/50 p-3 rounded">
          <p className="text-indigo-200 mb-1">Need Help?</p>
          <p className="text-gray-400">Contact Support</p>
        </div>
      </div>
    </aside>
  );
}
