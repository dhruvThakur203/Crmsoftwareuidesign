import { useState } from 'react';
import { Plus, Calendar, Clock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

interface LogEntry {
  id: string;
  date: string;
  time: string;
  type: 'system' | 'manual';
  phase: string;
  remarks: string;
  user: string;
}

export function ClientLogTable() {
  const [showAddLog, setShowAddLog] = useState(false);
  const [newRemarks, setNewRemarks] = useState('');

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      date: '2025-11-18',
      time: '14:30:25',
      type: 'system',
      phase: 'RM Assigned',
      remarks: 'System automatically assigned RM: Vikram Singh',
      user: 'System',
    },
    {
      id: '2',
      date: '2025-11-18',
      time: '14:30:25',
      type: 'system',
      phase: 'Field Boy Assigned',
      remarks: 'System automatically assigned Field Boy: Ravi Kumar',
      user: 'System',
    },
    {
      id: '3',
      date: '2025-11-17',
      time: '16:45:10',
      type: 'system',
      phase: 'Valuation Complete',
      remarks: 'Valuation completed by Neha Gupta. Total value: ₹12,50,000',
      user: 'Valuation Team',
    },
    {
      id: '4',
      date: '2025-11-17',
      time: '11:20:05',
      type: 'manual',
      phase: 'RTA Communication',
      remarks: 'Sent initial query to KFin Technologies RTA regarding folio verification',
      user: 'RM - Vikram Singh',
    },
    {
      id: '5',
      date: '2025-11-16',
      time: '15:30:00',
      type: 'system',
      phase: 'Document Pending Flag',
      remarks: 'RM raised pending document flag. Automated reminder sent to client.',
      user: 'RM - Vikram Singh',
    },
    {
      id: '6',
      date: '2025-11-16',
      time: '10:15:30',
      type: 'manual',
      phase: 'Client Call',
      remarks: 'Called client to discuss missing bank statement. Client will courier by Nov 20.',
      user: 'RM - Vikram Singh',
    },
    {
      id: '7',
      date: '2025-11-15',
      time: '14:20:45',
      type: 'system',
      phase: 'Case Sent to Valuation',
      remarks: 'Case created and sent to valuation team for processing',
      user: 'System',
    },
    {
      id: '8',
      date: '2025-11-15',
      time: '10:30:00',
      type: 'system',
      phase: 'Case Created',
      remarks: 'New case created for client Rajesh Kumar with 5 folios',
      user: 'Master Admin',
    },
  ]);

  const handleAddLog = () => {
    if (!newRemarks.trim()) return;

    const newLog: LogEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      type: 'manual',
      phase: 'Manual Entry',
      remarks: newRemarks,
      user: 'RM - Current User',
    };

    setLogs([newLog, ...logs]);
    setNewRemarks('');
    setShowAddLog(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Client Activity Log</CardTitle>
        <Button onClick={() => setShowAddLog(!showAddLog)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Manual Log
        </Button>
      </CardHeader>
      <CardContent>
        {showAddLog && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-gray-900 mb-3">Add Manual Log Entry</h3>
            <Textarea
              value={newRemarks}
              onChange={(e) => setNewRemarks(e.target.value)}
              placeholder="Enter remarks about client interaction, RTA communication, or any update..."
              rows={3}
              className="mb-3"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddLog} size="sm">Save Log</Button>
              <Button onClick={() => setShowAddLog(false)} variant="outline" size="sm">Cancel</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className={`p-4 rounded-lg border ${
                log.type === 'system' 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant={log.type === 'system' ? 'secondary' : 'outline'}>
                    {log.phase}
                  </Badge>
                  {log.type === 'system' && (
                    <Badge variant="default" className="bg-blue-600">System</Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{log.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{log.time}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-900 mb-2">{log.remarks}</p>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <User className="w-4 h-4" />
                <span>{log.user}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-sm">
            <strong>Total Log Entries:</strong> {logs.length} • 
            All activities are automatically timestamped and tracked for audit purposes
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
