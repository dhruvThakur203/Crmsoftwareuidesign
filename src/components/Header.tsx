import { Bell, Search, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  userRole: string;
}

export function Header({ userRole }: HeaderProps) {
  const roleName = userRole === 'master-admin' ? 'Master Admin' : 
                   userRole === 'rm' ? 'Relationship Manager' :
                   userRole === 'valuation' ? 'Valuation Team' : 'Field Boy';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search clients, folios, or cases..." 
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <Button variant="ghost" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <div className="text-gray-900">John Doe</div>
              <div className="text-gray-600">{roleName}</div>
            </div>
            <div className="bg-indigo-100 p-2 rounded-full">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
