import { useState } from 'react';
import { Phone, MessageSquare, Send, Clock, AlertCircle, FileText, Copy, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface CommunicationLog {
  id: string;
  type: 'call' | 'sms' | 'email';
  direction: 'outbound' | 'inbound';
  status: 'completed' | 'failed' | 'pending';
  message?: string;
  duration?: string;
  timestamp: string;
  initiatedBy: string;
  phoneNumber: string;
}

interface SMSTemplate {
  id: string;
  name: string;
  content: string;
  category: string;
}

interface CommunicationTabProps {
  clientName: string;
  primaryMobile: string;
  alternateMobile?: string;
  userRole: string;
}

export function CommunicationTab({ clientName, primaryMobile, alternateMobile, userRole }: CommunicationTabProps) {
  const [selectedPhone, setSelectedPhone] = useState<string>(primaryMobile);
  const [customMessage, setCustomMessage] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [callInProgress, setCallInProgress] = useState(false);
  const [smsInProgress, setSmsInProgress] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<SMSTemplate | null>(null);
  const [isNewTemplate, setIsNewTemplate] = useState(false);

  const [smsTemplates, setSmsTemplates] = useState<SMSTemplate[]>([
    {
      id: '1',
      name: 'Initial Contact',
      content: `Dear ${clientName}, Thank you for choosing our services. We have received your share recovery case and our team is working on the valuation. We will update you soon. - Share Recovery Team`,
      category: 'welcome'
    },
    {
      id: '2',
      name: 'Valuation Complete',
      content: `Dear ${clientName}, Your share valuation is complete. Total value: ₹[VALUE]. Please contact us to proceed with the documentation. - Share Recovery Team`,
      category: 'valuation'
    },
    {
      id: '3',
      name: 'Document Request',
      content: `Dear ${clientName}, We need the following documents to proceed with your case: [DOCUMENTS]. Our field executive will contact you for collection. - Share Recovery Team`,
      category: 'documentation'
    },
    {
      id: '4',
      name: 'KYC Pending',
      content: `Dear ${clientName}, KYC verification is pending for some companies. Please submit the required documents at your earliest convenience. - Share Recovery Team`,
      category: 'kyc'
    },
    {
      id: '5',
      name: 'RTA Submission Update',
      content: `Dear ${clientName}, Your documents have been submitted to the RTA. Processing time: 15-20 business days. We will keep you updated. - Share Recovery Team`,
      category: 'update'
    },
    {
      id: '6',
      name: 'Follow Up',
      content: `Dear ${clientName}, This is a follow-up regarding your share recovery case. Please call us back or reply to this message. - Share Recovery Team`,
      category: 'followup'
    },
    {
      id: '7',
      name: 'Deal Closure',
      content: `Dear ${clientName}, Congratulations! Your shares have been successfully transferred to your demat account. Thank you for choosing our services. - Share Recovery Team`,
      category: 'closure'
    }
  ]);

  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([
    {
      id: '1',
      type: 'call',
      direction: 'outbound',
      status: 'completed',
      duration: '3m 24s',
      timestamp: '2025-11-20 14:30:00',
      initiatedBy: 'RM - Vikram Singh',
      phoneNumber: primaryMobile
    },
    {
      id: '2',
      type: 'sms',
      direction: 'outbound',
      status: 'completed',
      message: 'Dear Rajesh Kumar, Your share valuation is complete. Total value: ₹12,50,000. Please contact us to proceed.',
      timestamp: '2025-11-19 11:15:00',
      initiatedBy: 'RM - Vikram Singh',
      phoneNumber: primaryMobile
    },
    {
      id: '3',
      type: 'call',
      direction: 'inbound',
      status: 'completed',
      duration: '5m 12s',
      timestamp: '2025-11-18 16:45:00',
      initiatedBy: 'Client',
      phoneNumber: primaryMobile
    },
    {
      id: '4',
      type: 'sms',
      direction: 'outbound',
      status: 'completed',
      message: 'Thank you for choosing our services. We have received your case and our team is working on it.',
      timestamp: '2025-11-15 10:30:00',
      initiatedBy: 'RM - Vikram Singh',
      phoneNumber: primaryMobile
    }
  ]);

  const openAddTemplateDialog = () => {
    setEditingTemplate({
      id: Date.now().toString(),
      name: '',
      content: `Dear ${clientName}, `,
      category: 'other'
    });
    setIsNewTemplate(true);
    setIsTemplateDialogOpen(true);
  };

  const openEditTemplateDialog = (template: SMSTemplate) => {
    setEditingTemplate(template);
    setIsNewTemplate(false);
    setIsTemplateDialogOpen(true);
  };

  const saveTemplate = () => {
    if (!editingTemplate) return;

    if (!editingTemplate.name.trim() || !editingTemplate.content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    if (isNewTemplate) {
      setSmsTemplates([...smsTemplates, editingTemplate]);
      toast.success('Template added successfully');
    } else {
      setSmsTemplates(smsTemplates.map(t => 
        t.id === editingTemplate.id ? editingTemplate : t
      ));
      toast.success('Template updated successfully');
    }

    setIsTemplateDialogOpen(false);
    setEditingTemplate(null);
  };

  const deleteTemplate = (templateId: string) => {
    setSmsTemplates(smsTemplates.filter(t => t.id !== templateId));
    toast.success('Template deleted');
  };

  const handleInitiateCall = () => {
    if (userRole === 'Field Boy') {
      toast.error('Only RMs can initiate calls from the system');
      return;
    }

    setCallInProgress(true);
    
    // Simulate API call to telephony service (e.g., Twilio)
    setTimeout(() => {
      const newLog: CommunicationLog = {
        id: Date.now().toString(),
        type: 'call',
        direction: 'outbound',
        status: 'completed',
        duration: '2m 15s',
        timestamp: new Date().toLocaleString('en-IN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }).replace(/\//g, '-'),
        initiatedBy: userRole === 'RM' ? 'RM - Current User' : 'Master Admin',
        phoneNumber: selectedPhone
      };
      
      setCommunicationLogs([newLog, ...communicationLogs]);
      setCallInProgress(false);
      toast.success(`Call initiated to ${selectedPhone}`);
    }, 2000);
  };

  const handleSendSMS = () => {
    if (userRole === 'Field Boy') {
      toast.error('Only RMs and Admins can send SMS from the system');
      return;
    }

    if (!customMessage.trim()) {
      toast.error('Please enter a message or select a template');
      return;
    }

    setSmsInProgress(true);

    // Simulate API call to SMS service (e.g., Twilio, MSG91)
    setTimeout(() => {
      const newLog: CommunicationLog = {
        id: Date.now().toString(),
        type: 'sms',
        direction: 'outbound',
        status: 'completed',
        message: customMessage,
        timestamp: new Date().toLocaleString('en-IN', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit',
          hour12: false 
        }).replace(/\//g, '-'),
        initiatedBy: userRole === 'RM' ? 'RM - Current User' : 'Master Admin',
        phoneNumber: selectedPhone
      };
      
      setCommunicationLogs([newLog, ...communicationLogs]);
      setSmsInProgress(false);
      setCustomMessage('');
      setSelectedTemplate('');
      toast.success(`SMS sent to ${selectedPhone}`);
    }, 1500);
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = smsTemplates.find(t => t.id === templateId);
    if (template) {
      setCustomMessage(template.content);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Message copied to clipboard');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'email':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Call Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Initiate Call
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Phone Number</Label>
              <Select value={selectedPhone} onValueChange={setSelectedPhone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={primaryMobile}>Primary: {primaryMobile}</SelectItem>
                  {alternateMobile && (
                    <SelectItem value={alternateMobile}>Alternate: {alternateMobile}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleInitiateCall} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={callInProgress || userRole === 'Field Boy'}
            >
              {callInProgress ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4 mr-2" />
                  Initiate Call
                </>
              )}
            </Button>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-900 text-sm">
                <strong>Note:</strong> Calls are automatically logged with timestamps. 
                The system integrates with telephony APIs for automated dialing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* SMS Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Send SMS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Phone Number</Label>
              <Select value={selectedPhone} onValueChange={setSelectedPhone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={primaryMobile}>Primary: {primaryMobile}</SelectItem>
                  {alternateMobile && (
                    <SelectItem value={alternateMobile}>Alternate: {alternateMobile}</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Quick Templates</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a template (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {smsTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name} - {template.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Message</Label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message or select a template above"
                rows={4}
                maxLength={160}
              />
              <p className="text-gray-500 text-xs mt-1">{customMessage.length}/160 characters</p>
            </div>

            <Button 
              onClick={handleSendSMS} 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={smsInProgress || userRole === 'Field Boy'}
            >
              {smsInProgress ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send SMS
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SMS Templates Reference */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Available SMS Templates
            </CardTitle>
          </div>
          <Button onClick={openAddTemplateDialog} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Template
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {smsTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-gray-900">{template.name}</p>
                    <Badge variant="outline" className="mt-1">{template.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(template.content)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openEditTemplateDialog(template)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteTemplate(template.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mt-2">{template.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Communication History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Communication History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {communicationLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No communication history yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {communicationLogs.map((log) => (
                  <div 
                    key={log.id} 
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className={`p-2 rounded-lg shrink-0 ${
                          log.type === 'call' ? 'bg-green-100' : 
                          log.type === 'sms' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          {getTypeIcon(log.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-gray-900 capitalize">{log.type}</p>
                            <Badge variant={log.direction === 'outbound' ? 'default' : 'secondary'}>
                              {log.direction}
                            </Badge>
                            {getStatusBadge(log.status)}
                          </div>
                          <p className="text-gray-600 text-sm mb-1">To: {log.phoneNumber}</p>
                          {log.message && (
                            <p className="text-gray-700 text-sm bg-white border border-gray-200 rounded p-2 mt-2">
                              {log.message}
                            </p>
                          )}
                          {log.duration && (
                            <p className="text-gray-600 text-sm mt-1">Duration: {log.duration}</p>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{log.timestamp}</span>
                            <span>•</span>
                            <span>{log.initiatedBy}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Edit Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isNewTemplate ? 'Add New SMS Template' : 'Edit SMS Template'}
            </DialogTitle>
          </DialogHeader>
          
          {editingTemplate && (
            <div className="space-y-4">
              <div>
                <Label>Template Name</Label>
                <Input
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  placeholder="e.g., Follow Up"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={editingTemplate.category}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                  placeholder="e.g., followup"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Message Content</Label>
                <Textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                  placeholder="Type your message template..."
                  rows={6}
                  className="mt-1"
                />
                <p className="text-gray-500 text-xs mt-1">{editingTemplate.content.length}/500 characters</p>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveTemplate} className="bg-blue-600 hover:bg-blue-700">
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Integration Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-900 text-sm">
          <strong>Integration Note:</strong> This communication module integrates with telephony and SMS APIs 
          (Twilio, MSG91, etc.). All communications are logged with precise timestamps for compliance and tracking. 
          API credentials should be configured in the backend settings. Field Boys have view-only access to 
          communication history.
        </p>
      </div>
    </div>
  );
}
