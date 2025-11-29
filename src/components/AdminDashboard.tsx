import { LayoutDashboard, Users, TrendingUp, DollarSign, UserPlus, FileText, LogOut, Bell, AlertCircle, UserCheck, BellRing } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { AssignmentDialog } from './AssignmentDialog';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface AdminDashboardProps {
  onNavigate: (page: 'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users' | 'reminders', clientId?: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Cases needing assignment (Valuation Complete without RM/Field Boy)
  const casesNeedingAssignment = [
    { id: '1', name: 'Rajesh Kumar', status: 'Valuation Complete', folios: 5, value: '₹12,50,000', timestamp: '2025-11-18 14:30', needsAssignment: true },
    { id: '5', name: 'Meera Iyer', status: 'Valuation Complete', folios: 9, value: '₹22,00,000', timestamp: '2025-11-15 16:00', needsAssignment: true },
    { id: '10', name: 'Karan Mehta', status: 'Valuation Complete', folios: 6, value: '₹14,30,000', timestamp: '2025-11-14 13:20', needsAssignment: true },
  ];

  const recentClients = [
    { id: '1', name: 'Rajesh Kumar', status: 'Valuation Complete', folios: 5, value: '₹12,50,000', timestamp: '2025-11-18 14:30', needsAssignment: true },
    { id: '2', name: 'Priya Sharma', status: 'Under Valuation', folios: 3, value: '₹8,20,000', timestamp: '2025-11-18 11:15' },
    { id: '3', name: 'Amit Patel', status: 'Documentation Pending', folios: 7, value: '₹15,00,000', timestamp: '2025-11-18 09:45' },
    { id: '4', name: 'Sunita Desai', status: 'Deal Closed', folios: 4, value: '₹9,80,000', timestamp: '2025-11-17 16:20' },
  ];

  const recentActivities = [
    { user: 'RM - Vikram Singh', action: 'Updated client log for Rajesh Kumar', time: '5 mins ago' },
    { user: 'Valuation - Neha Gupta', action: 'Completed valuation for Priya Sharma', time: '23 mins ago' },
    { user: 'Field Boy - Ravi Kumar', action: 'Document collection from Amit Patel', time: '1 hour ago' },
    { user: 'RM - Anjali Reddy', action: 'Sent follow-up message to Sunita Desai', time: '2 hours ago' },
  ];

  const openAssignmentDialog = (clientId: string, clientName: string) => {
    setSelectedClient({ id: clientId, name: clientName });
    setIsAssignmentDialogOpen(true);
    setIsNotificationOpen(false);
  };

  const handleAssignment = (rmId: string, fieldBoyId: string) => {
    // In real app, this would update the backend
    console.log('Assigned:', { clientId: selectedClient?.id, rmId, fieldBoyId });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg shrink-0">
                <LayoutDashboard className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-gray-900 truncate text-sm sm:text-base lg:text-lg">Master Admin Dashboard</h1>
                <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">Share Claim CRM System</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    {casesNeedingAssignment.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {casesNeedingAssignment.length}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 p-0" align="end">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-gray-900">Cases Need Assignment</h3>
                    <p className="text-gray-600 text-sm">Valuation completed - assign RM & Field Boy</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {casesNeedingAssignment.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No pending assignments
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {casesNeedingAssignment.map((client) => (
                          <div key={client.id} className="p-4 hover:bg-gray-50">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-gray-900">{client.name}</p>
                                <p className="text-gray-600 text-sm">{client.folios} Folios • {client.value}</p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                Valuation Done
                              </Badge>
                            </div>
                            <p className="text-gray-500 text-xs mb-3">{client.timestamp}</p>
                            <Button
                              size="sm"
                              className="w-full bg-indigo-600 hover:bg-indigo-700"
                              onClick={() => openAssignmentDialog(client.id, client.name)}
                            >
                              <UserCheck className="w-4 h-4 mr-2" />
                              Assign Team
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="ghost" onClick={() => onNavigate('login')} size="sm" className="hidden sm:flex">
                <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="hidden lg:inline">Logout</span>
              </Button>
              <Button variant="ghost" onClick={() => onNavigate('login')} size="icon" className="sm:hidden">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Assignment Alert */}
        {casesNeedingAssignment.length > 0 && (
          <div className="mb-4 sm:mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-amber-900 text-sm sm:text-base">
                  <strong>{casesNeedingAssignment.length} case{casesNeedingAssignment.length > 1 ? 's' : ''}</strong> with completed valuation need RM & Field Boy assignment
                </p>
                <p className="text-amber-700 text-xs sm:text-sm mt-1">
                  Click the notification bell to review and assign team members
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8">
          <Button onClick={() => onNavigate('create-client')} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto text-xs sm:text-sm">
            <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Create New Client/Case
          </Button>
          <Button variant="outline" onClick={() => onNavigate('manage-users')} className="w-full sm:w-auto text-xs sm:text-sm">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden lg:inline">Manage Users (RM/Field Boy)</span>
            <span className="lg:hidden">Manage Users</span>
          </Button>
          <Button variant="outline" onClick={() => onNavigate('all-cases')} className="w-full sm:w-auto text-xs sm:text-sm">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            View All Cases
          </Button>
          <Button variant="outline" onClick={() => onNavigate('reminders')} className="w-full sm:w-auto text-xs sm:text-sm">
            <BellRing className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            <span className="hidden lg:inline">Automated Reminders</span>
            <span className="lg:hidden">Reminders</span>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm text-gray-600">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-900 text-lg sm:text-2xl">247</div>
                <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                  <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-green-600 text-xs sm:text-sm mt-1 sm:mt-2">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm text-gray-600">Total Value Recovering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-900 text-lg sm:text-2xl">₹4.8 Cr</div>
                <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                  <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
              <p className="text-green-600 text-xs sm:text-sm mt-1 sm:mt-2">Expected value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm text-gray-600">Money Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-900 text-lg sm:text-2xl">₹2.3 Cr</div>
                <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">47.9% recovered</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-1 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm text-gray-600">Total Expenditure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-gray-900 text-lg sm:text-2xl">₹18.5 L</div>
                <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                  <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-2">Operational costs</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Recent Clients */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentClients.map((client) => (
                  <div 
                    key={client.id} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors gap-3"
                    onClick={() => onNavigate('client-detail', client.id)}
                  >
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900 text-sm sm:text-base truncate">{client.name}</p>
                        {client.needsAssignment && (
                          <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm">{client.folios} Folios • {client.value}</p>
                      <p className="text-gray-500 text-xs mt-1">{client.timestamp}</p>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:flex-col sm:items-end">
                      <Badge variant={
                        client.status === 'Deal Closed' ? 'default' :
                        client.status === 'Valuation Complete' ? 'secondary' :
                        'outline'
                      } className="text-xs">
                        {client.status}
                      </Badge>
                      {client.needsAssignment && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            openAssignmentDialog(client.id, client.name);
                          }}
                        >
                          <UserCheck className="w-3 h-3 mr-1" />
                          Assign
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Team Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-indigo-100 p-2 rounded-full mt-1">
                      <Users className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">{activity.user}</p>
                      <p className="text-gray-600 text-sm mt-1">{activity.action}</p>
                      <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assignment Dialog */}
      {selectedClient && (
        <AssignmentDialog
          isOpen={isAssignmentDialogOpen}
          onClose={() => setIsAssignmentDialogOpen(false)}
          onAssign={handleAssignment}
          clientName={selectedClient.name}
          clientId={selectedClient.id}
        />
      )}
    </div>
  );
}