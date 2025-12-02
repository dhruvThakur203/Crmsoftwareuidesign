import { useState } from 'react';
import { Bell, Clock, MessageSquare, Phone, Zap, CheckCircle, XCircle, Settings, Edit2, Save, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';

interface ReminderRule {
  id: string;
  name: string;
  trigger: string;
  action: 'sms' | 'call' | 'both';
  frequency: string;
  enabled: boolean;
  lastExecuted?: string;
  nextScheduled?: string;
  daysThreshold?: number;
}

interface EditingRule extends ReminderRule {
  isNew?: boolean;
}

interface ScheduledReminder {
  id: string;
  clientName: string;
  clientId: string;
  type: 'sms' | 'call';
  reason: string;
  scheduledTime: string;
  status: 'pending' | 'sent' | 'failed';
}

export function AutomatedReminders({ isAdmin = true }: { isAdmin?: boolean }) {
  const [reminderRules, setReminderRules] = useState<ReminderRule[]>([
    {
      id: '1',
      name: 'KYC Document Follow-up',
      trigger: 'KYC pending for',
      action: 'sms',
      frequency: 'Every 3 days',
      enabled: true,
      daysThreshold: 3,
      lastExecuted: '2025-11-25 10:00:00',
      nextScheduled: '2025-11-28 10:00:00'
    },
    {
      id: '2',
      name: 'Valuation Completion Alert',
      trigger: 'Valuation complete, no RM contact in',
      action: 'call',
      frequency: 'Daily',
      enabled: true,
      daysThreshold: 1,
      lastExecuted: '2025-11-26 09:00:00',
      nextScheduled: '2025-11-27 09:00:00'
    },
    {
      id: '3',
      name: 'Documentation Reminder',
      trigger: 'Documents pending for',
      action: 'both',
      frequency: 'Every 5 days',
      enabled: true,
      daysThreshold: 5,
      lastExecuted: '2025-11-20 14:00:00',
      nextScheduled: '2025-11-25 14:00:00'
    },
    {
      id: '4',
      name: 'RTA Status Update',
      trigger: 'RTA submission, no update in',
      action: 'sms',
      frequency: 'Every 10 days',
      enabled: false,
      daysThreshold: 10,
      nextScheduled: '2025-12-05 10:00:00'
    },
    {
      id: '5',
      name: 'Deal Closure Follow-up',
      trigger: 'All documents ready, no closure in',
      action: 'call',
      frequency: 'Weekly',
      enabled: true,
      daysThreshold: 7,
      lastExecuted: '2025-11-22 11:00:00',
      nextScheduled: '2025-11-29 11:00:00'
    }
  ]);

  const [editingRule, setEditingRule] = useState<EditingRule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [scheduledReminders, setScheduledReminders] = useState<ScheduledReminder[]>([
    {
      id: '1',
      clientName: 'Rajesh Kumar',
      clientId: 'CLT-001',
      type: 'sms',
      reason: 'KYC pending for Tata Motors Ltd',
      scheduledTime: '2025-11-28 10:00:00',
      status: 'pending'
    },
    {
      id: '2',
      clientName: 'Priya Sharma',
      clientId: 'CLT-002',
      type: 'call',
      reason: 'Valuation complete - follow up required',
      scheduledTime: '2025-11-27 09:00:00',
      status: 'pending'
    },
    {
      id: '3',
      clientName: 'Amit Patel',
      clientId: 'CLT-003',
      type: 'sms',
      reason: 'Documentation pending',
      scheduledTime: '2025-11-27 14:00:00',
      status: 'sent'
    },
    {
      id: '4',
      clientName: 'Mahesh Joshi',
      clientId: 'CLT-005',
      type: 'call',
      reason: 'Deal closure follow-up',
      scheduledTime: '2025-11-29 11:00:00',
      status: 'pending'
    }
  ]);

  const toggleRule = (ruleId: string) => {
    setReminderRules(reminderRules.map(rule => {
      if (rule.id === ruleId) {
        const newEnabled = !rule.enabled;
        toast.success(`Reminder rule "${rule.name}" ${newEnabled ? 'enabled' : 'disabled'}`);
        return { ...rule, enabled: newEnabled };
      }
      return rule;
    }));
  };

  const updateRuleAction = (ruleId: string, action: 'sms' | 'call' | 'both') => {
    setReminderRules(reminderRules.map(rule => {
      if (rule.id === ruleId) {
        toast.success(`Updated action for "${rule.name}"`);
        return { ...rule, action };
      }
      return rule;
    }));
  };

  const openEditDialog = (rule: ReminderRule) => {
    setEditingRule({ ...rule });
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingRule({
      id: Date.now().toString(),
      name: '',
      trigger: '',
      action: 'sms',
      frequency: 'Every 1 days',
      enabled: true,
      daysThreshold: 1,
      isNew: true
    });
    setIsDialogOpen(true);
  };

  const saveRule = () => {
    if (!editingRule) return;

    if (!editingRule.name.trim() || !editingRule.trigger.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const { isNew, ...ruleData } = editingRule;

    if (isNew) {
      setReminderRules([...reminderRules, ruleData]);
      toast.success('Reminder rule added successfully');
    } else {
      setReminderRules(reminderRules.map(rule => 
        rule.id === editingRule.id ? ruleData : rule
      ));
      toast.success('Reminder rule updated successfully');
    }

    setIsDialogOpen(false);
    setEditingRule(null);
  };

  const deleteRule = (ruleId: string) => {
    setReminderRules(reminderRules.filter(rule => rule.id !== ruleId));
    toast.success('Reminder rule deleted');
  };

  const cancelScheduledReminder = (reminderId: string) => {
    setScheduledReminders(scheduledReminders.map(reminder => {
      if (reminder.id === reminderId) {
        toast.success(`Cancelled reminder for ${reminder.clientName}`);
        return { ...reminder, status: 'failed' as const };
      }
      return reminder;
    }));
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'both':
        return <Zap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'sent':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Sent</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const activeRules = reminderRules.filter(r => r.enabled).length;
  const pendingReminders = scheduledReminders.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Active Rules</p>
                <p className="text-gray-900 text-2xl">{activeRules}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Pending Reminders</p>
                <p className="text-gray-900 text-2xl">{pendingReminders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Sent Today</p>
                <p className="text-gray-900 text-2xl">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reminder Rules */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Automated Reminder Rules
            </CardTitle>
            <p className="text-gray-600 text-sm">Configure automatic reminders based on case status and timeline</p>
          </div>
          {isAdmin && (
            <Button onClick={openAddDialog} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reminderRules.map((rule) => (
              <div 
                key={rule.id} 
                className={`border rounded-lg p-4 transition-all ${
                  rule.enabled ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-2">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        rule.enabled ? 'bg-blue-100' : 'bg-gray-200'
                      }`}>
                        {getActionIcon(rule.action)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900">{rule.name}</h4>
                        <p className="text-gray-600 text-sm mt-1">{rule.trigger}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {rule.frequency}
                      </Badge>
                      {rule.lastExecuted && (
                        <span className="text-gray-500 text-xs">
                          Last: {rule.lastExecuted}
                        </span>
                      )}
                      {rule.nextScheduled && rule.enabled && (
                        <span className="text-blue-600 text-xs">
                          Next: {rule.nextScheduled}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="w-full sm:w-auto">
                      <Label className="text-xs text-gray-600">Action Type</Label>
                      <Select 
                        value={rule.action} 
                        onValueChange={(value: 'sms' | 'call' | 'both') => updateRuleAction(rule.id, value)}
                        disabled={!rule.enabled}
                      >
                        <SelectTrigger className="w-full sm:w-32 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="call">Call</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Label htmlFor={`toggle-${rule.id}`} className="text-sm">
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </Label>
                      <Switch
                        id={`toggle-${rule.id}`}
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(rule)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => deleteRule(rule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reminders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upcoming Scheduled Reminders
          </CardTitle>
          <p className="text-gray-600 text-sm">View and manage reminders scheduled for clients</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {scheduledReminders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No scheduled reminders</p>
              </div>
            ) : (
              scheduledReminders.map((reminder) => (
                <div 
                  key={reminder.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 gap-3"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg shrink-0 ${
                      reminder.type === 'call' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {reminder.type === 'call' ? (
                        <Phone className="w-4 h-4 text-green-600" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="text-gray-900">{reminder.clientName}</p>
                        <Badge variant="outline" className="text-xs">{reminder.clientId}</Badge>
                      </div>
                      <p className="text-gray-600 text-sm">{reminder.reason}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>Scheduled: {reminder.scheduledTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {getStatusBadge(reminder.status)}
                    {reminder.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelScheduledReminder(reminder.id)}
                      >
                        <XCircle className="w-4 h-4 text-red-600" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900 text-sm">
          <strong>Automation Benefits:</strong> Automated reminders ensure timely follow-ups with clients, 
          reducing manual effort by 70-80%. All scheduled communications are logged with timestamps for 
          compliance tracking. The system automatically triggers reminders based on case status and predefined rules.
        </p>
      </div>

      {/* Edit/Add Rule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingRule?.isNew ? 'Add New Reminder Rule' : 'Edit Reminder Rule'}
            </DialogTitle>
          </DialogHeader>
          
          {editingRule && (
            <div className="space-y-4">
              <div>
                <Label>Rule Name</Label>
                <Input
                  value={editingRule.name}
                  onChange={(e) => setEditingRule({ ...editingRule, name: e.target.value })}
                  placeholder="e.g., Documentation Reminder"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Trigger Condition</Label>
                <Textarea
                  value={editingRule.trigger}
                  onChange={(e) => setEditingRule({ ...editingRule, trigger: e.target.value })}
                  placeholder="e.g., Documents pending for"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Days Threshold</Label>
                <Input
                  type="number"
                  value={editingRule.daysThreshold || 1}
                  onChange={(e) => setEditingRule({ 
                    ...editingRule, 
                    daysThreshold: parseInt(e.target.value) || 1
                  })}
                  placeholder="1"
                  min="1"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Action Type</Label>
                <Select 
                  value={editingRule.action}
                  onValueChange={(value: 'sms' | 'call' | 'both') => 
                    setEditingRule({ ...editingRule, action: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="enabled-toggle" className="text-sm">
                  Enabled
                </Label>
                <Switch
                  id="enabled-toggle"
                  checked={editingRule.enabled}
                  onCheckedChange={(checked) => setEditingRule({ ...editingRule, enabled: checked })}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveRule} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
