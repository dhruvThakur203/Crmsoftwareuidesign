import { useState } from 'react';
import { UserCheck, User } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface AssignmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (rmId: string, fieldBoyId: string) => void;
  clientName: string;
  clientId: string;
  currentRM?: string;
  currentFieldBoy?: string;
}

export function AssignmentDialog({
  isOpen,
  onClose,
  onAssign,
  clientName,
  clientId,
  currentRM,
  currentFieldBoy,
}: AssignmentDialogProps) {
  const [selectedRM, setSelectedRM] = useState(currentRM || '');
  const [selectedFieldBoy, setSelectedFieldBoy] = useState(currentFieldBoy || '');

  // Mock data - replace with real data from user management
  const availableRMs = [
    { id: 'rm1', name: 'Vikram Singh', activeCases: 15 },
    { id: 'rm2', name: 'Anjali Reddy', activeCases: 12 },
  ];

  const availableFieldBoys = [
    { id: 'field1', name: 'Ravi Kumar', activeCases: 8 },
    { id: 'field2', name: 'Suresh Yadav', activeCases: 6 },
  ];

  const handleAssign = () => {
    if (!selectedRM || !selectedFieldBoy) {
      toast.error('Please select both RM and Field Boy');
      return;
    }

    onAssign(selectedRM, selectedFieldBoy);
    toast.success(`Case assigned successfully to ${availableRMs.find(rm => rm.id === selectedRM)?.name} and ${availableFieldBoys.find(fb => fb.id === selectedFieldBoy)?.name}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            Assign RM & Field Boy
          </DialogTitle>
          <DialogDescription>
            Assign Relationship Manager and Field Boy to handle this case
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Client Info */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 mb-1">{clientName}</p>
                <p className="text-gray-600 text-sm">Case ID: {clientId}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Valuation Complete
              </Badge>
            </div>
          </div>

          {/* RM Selection */}
          <div>
            <Label htmlFor="rm-select" className="mb-2 block">
              Select Relationship Manager (RM)
            </Label>
            <Select value={selectedRM} onValueChange={setSelectedRM}>
              <SelectTrigger id="rm-select">
                <SelectValue placeholder="Choose RM..." />
              </SelectTrigger>
              <SelectContent>
                {availableRMs.map((rm) => (
                  <SelectItem key={rm.id} value={rm.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{rm.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({rm.activeCases} active cases)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentRM && (
              <p className="text-xs text-gray-500 mt-1">
                Current: {availableRMs.find(rm => rm.id === currentRM)?.name}
              </p>
            )}
          </div>

          {/* Field Boy Selection */}
          <div>
            <Label htmlFor="fieldboy-select" className="mb-2 block">
              Select Field Boy
            </Label>
            <Select value={selectedFieldBoy} onValueChange={setSelectedFieldBoy}>
              <SelectTrigger id="fieldboy-select">
                <SelectValue placeholder="Choose Field Boy..." />
              </SelectTrigger>
              <SelectContent>
                {availableFieldBoys.map((fb) => (
                  <SelectItem key={fb.id} value={fb.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{fb.name}</span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({fb.activeCases} active cases)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentFieldBoy && (
              <p className="text-xs text-gray-500 mt-1">
                Current: {availableFieldBoys.find(fb => fb.id === currentFieldBoy)?.name}
              </p>
            )}
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
            <p className="text-blue-900 text-sm">
              <strong>Note:</strong> Once assigned, the RM will handle client communication and the Field Boy will manage document collection and physical verification.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleAssign} 
            className="bg-indigo-600 hover:bg-indigo-700"
            disabled={!selectedRM || !selectedFieldBoy}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Assign Team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
