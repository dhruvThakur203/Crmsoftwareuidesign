import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, Flag, CheckCircle, Clock, FileText, TrendingUp, User, Users, Edit2, Check, X as XIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ValuationTab } from './ValuationTab';
import { ClientLogTable } from './ClientLogTable';
import { CommunicationTab } from './CommunicationTab';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';

interface ClientDetailPageProps {
  onNavigate: (page: 'dashboard') => void;
  clientId: string | null;
  userRole?: 'Master Admin' | 'RM' | 'Field Boy' | 'Valuation Analyst';
}

interface CompanyKYC {
  companyName: string;
  kycCompleted: boolean;
  lastUpdated: string;
}

export function ClientDetailPage({ onNavigate, userRole = 'RM' }: ClientDetailPageProps) {
  const [pendingDocsFlag, setPendingDocsFlag] = useState(false);
  const [editingKYC, setEditingKYC] = useState(false);
  const [companyKYCs, setCompanyKYCs] = useState<CompanyKYC[]>([
    { companyName: 'Reliance Industries Ltd', kycCompleted: true, lastUpdated: '2025-11-20 10:30:00' },
    { companyName: 'Tata Motors Ltd', kycCompleted: false, lastUpdated: '2025-11-18 14:15:00' },
    { companyName: 'HDFC Bank Ltd', kycCompleted: true, lastUpdated: '2025-11-19 09:45:00' },
  ]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newKYCStatus, setNewKYCStatus] = useState<'yes' | 'no'>('no');

  const toggleKYCStatus = (index: number) => {
    const updated = [...companyKYCs];
    updated[index].kycCompleted = !updated[index].kycCompleted;
    updated[index].lastUpdated = new Date().toLocaleString();
    setCompanyKYCs(updated);
    toast.success(`KYC status updated for ${updated[index].companyName}`);
  };

  const addCompanyKYC = () => {
    if (!newCompanyName.trim()) {
      toast.error('Please enter a company name');
      return;
    }
    const newKYC: CompanyKYC = {
      companyName: newCompanyName,
      kycCompleted: newKYCStatus === 'yes',
      lastUpdated: new Date().toLocaleString(),
    };
    setCompanyKYCs([...companyKYCs, newKYC]);
    setNewCompanyName('');
    setNewKYCStatus('no');
    toast.success(`KYC entry added for ${newCompanyName}`);
  };

  const removeCompanyKYC = (index: number) => {
    const updated = companyKYCs.filter((_, i) => i !== index);
    setCompanyKYCs(updated);
    toast.success('KYC entry removed');
  };

  // Check if any KYC is incomplete
  const hasIncompleteKYC = companyKYCs.some(kyc => !kyc.kycCompleted);

  // Mock client data
  const clientData = {
    name: 'Rajesh Kumar',
    shareholders: ['Rajesh Kumar', 'Sunita Kumar'],
    contactPerson: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
    alternateMobile: '+91 98765 99999',
    email: 'rajesh.kumar@email.com',
    folios: 5,
    caseType: 'Direct Demat',
    status: 'Under Valuation',
    createdDate: '2025-11-15 10:30:00',
    assignedRM: 'Vikram Singh',
    assignedRMId: 'rm1',
    assignedFieldBoy: 'Ravi Kumar',
    assignedFieldBoyId: 'field1',
    assignmentDate: '2025-11-16 14:00:00',
    oldAddress: '123 Old Street, Mumbai, Maharashtra - 400001',
    newAddress: '456 New Avenue, Mumbai, Maharashtra - 400002',
    dematCreated: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 w-full sm:w-auto">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-gray-900 truncate">{clientData.name}</h1>
                <p className="text-gray-600 text-xs sm:text-sm truncate">Client ID: CLT-2025-001 • Created: {clientData.createdDate}</p>
              </div>
            </div>
            <Badge variant={clientData.status === 'Deal Closed' ? 'default' : 'secondary'} className="self-start sm:self-auto shrink-0">
              {clientData.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Assigned Team Section - Prominent */}
        {clientData.assignedRM && clientData.assignedFieldBoy && (
          <div className="mb-4 sm:mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <h3 className="text-gray-900">Assigned Team</h3>
              </div>
              <Badge variant="outline" className="text-xs">
                Assigned on {clientData.assignmentDate}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-2 sm:p-3 rounded-full shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs sm:text-sm">Relationship Manager</p>
                    <p className="text-gray-900 truncate">{clientData.assignedRM}</p>
                    <p className="text-gray-500 text-xs mt-1">ID: {clientData.assignedRMId}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-full shrink-0">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-gray-600 text-xs sm:text-sm">Field Boy</p>
                    <p className="text-gray-900 truncate">{clientData.assignedFieldBoy}</p>
                    <p className="text-gray-500 text-xs mt-1">ID: {clientData.assignedFieldBoyId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Client Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <p className="text-gray-600 text-xs sm:text-sm">Shareholders</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {clientData.shareholders.map((shareholder, idx) => (
                      <Badge key={idx} variant="outline">{shareholder}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Contact Person</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.contactPerson}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Case Type</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.caseType}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Mobile</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.mobile}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Alternate Mobile</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.alternateMobile || 'N/A'}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-600 text-xs sm:text-sm">Email</p>
                  <p className="text-gray-900 text-sm sm:text-base break-all">{clientData.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm">Number of Folios</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.folios}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-600 text-xs sm:text-sm">New Address</p>
                  <p className="text-gray-900 text-sm sm:text-base">{clientData.newAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3">
              <Button className="w-full justify-start text-xs sm:text-sm" variant="outline" size="sm">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Call Contact Person
              </Button>
              <Button className="w-full justify-start text-xs sm:text-sm" variant="outline" size="sm">
                <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Send SMS
              </Button>
              <Button className="w-full justify-start text-xs sm:text-sm" variant="outline" size="sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                className="w-full justify-start text-xs sm:text-sm" 
                variant={pendingDocsFlag || hasIncompleteKYC ? "destructive" : "outline"}
                size="sm"
                onClick={() => setPendingDocsFlag(!pendingDocsFlag)}
              >
                <Flag className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                {pendingDocsFlag || hasIncompleteKYC ? 'Pending Docs Flagged' : 'Flag Pending Docs'}
              </Button>
              {(pendingDocsFlag || hasIncompleteKYC) && (
                <p className="text-orange-600 text-xs sm:text-sm">
                  {hasIncompleteKYC && 'KYC incomplete for some companies. '}
                  Automated reminders will be sent at intervals
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* KYC Status by Company - Editable by RM */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <CardTitle>KYC Status by Company</CardTitle>
                <p className="text-gray-600 text-xs sm:text-sm mt-1">Track KYC completion for each company separately</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setEditingKYC(!editingKYC)}
                className="text-xs sm:text-sm"
              >
                <Edit2 className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                {editingKYC ? 'Done Editing' : 'Edit KYC'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {companyKYCs.map((kyc, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                  <div className="flex-1 min-w-0 w-full sm:w-auto">
                    <p className="text-gray-900 text-sm sm:text-base truncate">{kyc.companyName}</p>
                    <p className="text-gray-500 text-xs">Last updated: {kyc.lastUpdated}</p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    {kyc.kycCompleted ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        KYC Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-orange-50 text-orange-800 border-orange-200">
                        <Clock className="w-3 h-3 mr-1" />
                        KYC Pending
                      </Badge>
                    )}
                    {editingKYC && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleKYCStatus(index)}
                          className="h-8 px-2"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => removeCompanyKYC(index)}
                          className="h-8 px-2 text-red-600 hover:text-red-700"
                        >
                          <XIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {editingKYC && (
              <div className="mt-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-700 text-sm mb-3">Add New Company KYC</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <Input
                      placeholder="Company name"
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select value={newKYCStatus} onValueChange={(val: 'yes' | 'no') => setNewKYCStatus(val)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">KYC Done</SelectItem>
                        <SelectItem value="no">KYC Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addCompanyKYC} size="sm" className="shrink-0">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs defaultValue="valuation" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4 sm:mb-6">
            <TabsTrigger value="valuation" className="text-xs sm:text-sm">Valuation</TabsTrigger>
            <TabsTrigger value="communication" className="text-xs sm:text-sm">Communication</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
            <TabsTrigger value="activity-log" className="text-xs sm:text-sm">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="valuation">
            <ValuationTab />
          </TabsContent>

          <TabsContent value="communication">
            <CommunicationTab 
              clientName={clientData.name}
              primaryMobile={clientData.mobile}
              alternateMobile={clientData.alternateMobile}
              userRole={userRole}
            />
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'Pan Card.pdf', size: '245 KB', date: '2025-11-15' },
                    { name: 'Aadhar Card.pdf', size: '312 KB', date: '2025-11-15' },
                    { name: 'Share Certificate 1.jpg', size: '1.2 MB', date: '2025-11-15' },
                    { name: 'Share Certificate 2.jpg', size: '1.4 MB', date: '2025-11-15' },
                    { name: 'Bank Statement.pdf', size: '890 KB', date: '2025-11-15' },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-gray-900 text-sm sm:text-base truncate">{doc.name}</p>
                          <p className="text-gray-500 text-xs sm:text-sm">{doc.size} • {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="shrink-0 text-xs sm:text-sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity-log">
            <ClientLogTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}