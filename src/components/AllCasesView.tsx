import { useState } from 'react';
import { FileText, Filter, Search, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AllCasesViewProps {
  onNavigate: (page: 'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users' | 'reminders', clientId?: string) => void;
  userRole: 'Master Admin' | 'RM' | 'Field Boy';
}

export function AllCasesView({ onNavigate, userRole }: AllCasesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [rmFilter, setRmFilter] = useState('all');

  // Mock data - will be replaced with real data
  const allCases = [
    { id: '1', name: 'Rajesh Kumar', phone: '+91 98765 43210', folios: 5, value: '₹12,50,000', status: 'Valuation Complete', assignedRM: 'Vikram Singh', timestamp: '2025-11-18 14:30', lastActivity: 'Valuation completed' },
    { id: '2', name: 'Priya Sharma', phone: '+91 98765 43211', folios: 3, value: '₹8,20,000', status: 'Under Valuation', assignedRM: 'Anjali Reddy', timestamp: '2025-11-18 11:15', lastActivity: 'Documents received' },
    { id: '3', name: 'Amit Patel', phone: '+91 98765 43212', folios: 7, value: '₹15,00,000', status: 'Documentation Pending', assignedRM: 'Vikram Singh', timestamp: '2025-11-18 09:45', lastActivity: 'Waiting for KYC documents' },
    { id: '4', name: 'Sunita Desai', phone: '+91 98765 43213', folios: 4, value: '₹9,80,000', status: 'Deal Closed', assignedRM: 'Anjali Reddy', timestamp: '2025-11-17 16:20', lastActivity: 'Payment received' },
    { id: '5', name: 'Mahesh Joshi', phone: '+91 98765 43214', folios: 6, value: '₹11,20,000', status: 'RTA Communication', assignedRM: 'Vikram Singh', timestamp: '2025-11-17 14:10', lastActivity: 'RTA query sent' },
    { id: '6', name: 'Lakshmi Nair', phone: '+91 98765 43215', folios: 2, value: '₹5,50,000', status: 'Client Follow-up', assignedRM: 'Anjali Reddy', timestamp: '2025-11-17 10:30', lastActivity: 'Call scheduled' },
    { id: '7', name: 'Deepak Verma', phone: '+91 98765 43216', folios: 8, value: '₹18,00,000', status: 'Initial Assessment', assignedRM: 'Vikram Singh', timestamp: '2025-11-16 15:45', lastActivity: 'Case created' },
    { id: '8', name: 'Kavita Singh', phone: '+91 98765 43217', folios: 5, value: '₹10,50,000', status: 'Physical Share Verification', assignedRM: 'Anjali Reddy', timestamp: '2025-11-16 11:20', lastActivity: 'Shares being verified' },
    { id: '9', name: 'Ravi Shankar', phone: '+91 98765 43218', folios: 4, value: '₹7,80,000', status: 'Under Valuation', assignedRM: 'Vikram Singh', timestamp: '2025-11-16 09:30', lastActivity: 'Valuation in progress' },
    { id: '10', name: 'Meera Iyer', phone: '+91 98765 43219', folios: 9, value: '₹22,00,000', status: 'Valuation Complete', assignedRM: 'Anjali Reddy', timestamp: '2025-11-15 16:00', lastActivity: 'Awaiting client confirmation' },
  ];

  // Filter cases based on search, stage, and RM
  const filteredCases = allCases.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.phone.includes(searchQuery) ||
                         client.id.includes(searchQuery);
    const matchesStage = stageFilter === 'all' || client.status === stageFilter;
    const matchesRM = rmFilter === 'all' || client.assignedRM === rmFilter;
    return matchesSearch && matchesStage && matchesRM;
  });

  // Get stage counts for quick stats
  const stageCounts = {
    total: allCases.length,
    'Under Valuation': allCases.filter(c => c.status === 'Under Valuation').length,
    'Valuation Complete': allCases.filter(c => c.status === 'Valuation Complete').length,
    'Documentation Pending': allCases.filter(c => c.status === 'Documentation Pending').length,
    'RTA Communication': allCases.filter(c => c.status === 'RTA Communication').length,
    'Deal Closed': allCases.filter(c => c.status === 'Deal Closed').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Deal Closed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Valuation Complete':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Under Valuation':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Documentation Pending':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'RTA Communication':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Client Follow-up':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Physical Share Verification':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">All Client Cases</h1>
                <p className="text-gray-600 text-sm">Comprehensive case management view</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('all')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Total Cases</p>
                <p className="text-gray-900">{stageCounts.total}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('Under Valuation')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Under Valuation</p>
                <p className="text-gray-900">{stageCounts['Under Valuation']}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('Valuation Complete')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Valuation Done</p>
                <p className="text-gray-900">{stageCounts['Valuation Complete']}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('Documentation Pending')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Doc Pending</p>
                <p className="text-gray-900">{stageCounts['Documentation Pending']}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('RTA Communication')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">RTA Comm.</p>
                <p className="text-gray-900">{stageCounts['RTA Communication']}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setStageFilter('Deal Closed')}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Deal Closed</p>
                <p className="text-gray-900">{stageCounts['Deal Closed']}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cases List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Client Cases List</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, phone, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stages</SelectItem>
                    <SelectItem value="Initial Assessment">Initial Assessment</SelectItem>
                    <SelectItem value="Under Valuation">Under Valuation</SelectItem>
                    <SelectItem value="Valuation Complete">Valuation Complete</SelectItem>
                    <SelectItem value="Documentation Pending">Documentation Pending</SelectItem>
                    <SelectItem value="Physical Share Verification">Physical Share Verification</SelectItem>
                    <SelectItem value="RTA Communication">RTA Communication</SelectItem>
                    <SelectItem value="Client Follow-up">Client Follow-up</SelectItem>
                    <SelectItem value="Deal Closed">Deal Closed</SelectItem>
                  </SelectContent>
                </Select>
                {userRole === 'Master Admin' && (
                  <Select value={rmFilter} onValueChange={setRmFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by RM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All RMs</SelectItem>
                      <SelectItem value="Vikram Singh">Vikram Singh</SelectItem>
                      <SelectItem value="Anjali Reddy">Anjali Reddy</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredCases.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No cases found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCases.map((client) => (
                  <div
                    key={client.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors border border-gray-100"
                    onClick={() => onNavigate('client-detail', client.id)}
                  >
                    <div className="flex-1 w-full sm:w-auto mb-3 sm:mb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-gray-900">{client.name}</p>
                        <Badge variant="outline" className="text-xs">ID: {client.id}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">{client.phone} • {client.folios} Folios • {client.value}</p>
                      <p className="text-gray-500 text-xs">
                        RM: {client.assignedRM} • Last: {client.lastActivity}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{client.timestamp}</p>
                    </div>
                    <div className="w-full sm:w-auto">
                      <Badge className={`${getStatusColor(client.status)} border`}>
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Result Count */}
        {filteredCases.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Showing {filteredCases.length} of {allCases.length} cases
            </p>
          </div>
        )}
      </div>
    </div>
  );
}