import { useState } from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, Flag, CheckCircle, Clock, FileText, TrendingUp, User, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ValuationTab } from './ValuationTab';
import { ClientLogTable } from './ClientLogTable';

interface ClientDetailPageProps {
  onNavigate: (page: 'dashboard') => void;
  clientId: string | null;
}

export function ClientDetailPage({ onNavigate }: ClientDetailPageProps) {
  const [pendingDocsFlag, setPendingDocsFlag] = useState(false);

  // Mock client data
  const clientData = {
    name: 'Rajesh Kumar',
    contactPerson: 'Rajesh Kumar',
    mobile: '+91 98765 43210',
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
    kycCompleted: true,
    dematCreated: true,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-gray-900">{clientData.name}</h1>
                <p className="text-gray-600 text-sm">Client ID: CLT-2025-001 • Created: {clientData.createdDate}</p>
              </div>
            </div>
            <Badge variant={clientData.status === 'Deal Closed' ? 'default' : 'secondary'}>
              {clientData.status}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Assigned Team Section - Prominent */}
        {clientData.assignedRM && clientData.assignedFieldBoy && (
          <div className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-indigo-600" />
              <h3 className="text-gray-900">Assigned Team</h3>
              <Badge variant="outline" className="ml-2">
                Assigned on {clientData.assignmentDate}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-100 p-3 rounded-full">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Relationship Manager</p>
                    <p className="text-gray-900">{clientData.assignedRM}</p>
                    <p className="text-gray-500 text-xs mt-1">ID: {clientData.assignedRMId}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Field Boy</p>
                    <p className="text-gray-900">{clientData.assignedFieldBoy}</p>
                    <p className="text-gray-500 text-xs mt-1">ID: {clientData.assignedFieldBoyId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Client Info Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Contact Person</p>
                  <p className="text-gray-900">{clientData.contactPerson}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Case Type</p>
                  <p className="text-gray-900">{clientData.caseType}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Mobile</p>
                  <p className="text-gray-900">{clientData.mobile}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="text-gray-900">{clientData.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Number of Folios</p>
                  <p className="text-gray-900">{clientData.folios}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">KYC Status</p>
                  <div className="flex items-center gap-2">
                    {clientData.kycCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-green-600">Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-600">Pending</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600 text-sm">New Address</p>
                  <p className="text-gray-900">{clientData.newAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Contact Person
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Send SMS
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                className="w-full justify-start" 
                variant={pendingDocsFlag ? "destructive" : "outline"}
                onClick={() => setPendingDocsFlag(!pendingDocsFlag)}
              >
                <Flag className="w-4 h-4 mr-2" />
                {pendingDocsFlag ? 'Pending Docs Flagged' : 'Flag Pending Docs'}
              </Button>
              {pendingDocsFlag && (
                <p className="text-orange-600 text-sm">
                  Automated reminders will be sent at intervals
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="valuation" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="activity-log">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="valuation">
            <ValuationTab />
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Pan Card.pdf', size: '245 KB', date: '2025-11-15' },
                    { name: 'Aadhar Card.pdf', size: '312 KB', date: '2025-11-15' },
                    { name: 'Share Certificate 1.jpg', size: '1.2 MB', date: '2025-11-15' },
                    { name: 'Share Certificate 2.jpg', size: '1.4 MB', date: '2025-11-15' },
                    { name: 'Bank Statement.pdf', size: '890 KB', date: '2025-11-15' },
                  ].map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <div>
                          <p className="text-gray-900">{doc.name}</p>
                          <p className="text-gray-500 text-sm">{doc.size} • Uploaded: {doc.date}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
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