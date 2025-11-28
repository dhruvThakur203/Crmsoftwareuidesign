import { useState } from 'react';
import { Plus, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ShareEntry {
  id: string;
  clientName: string;
  companyName: string;
  newCompanyName: string;
  originalShares: number;
  bonus: number;
  split: number;
  finalShares: number;
  folioNumber: string;
  valuePerShare: number;
  totalValue: number;
  rta: string;
  isOriginal: boolean;
  rtaMail: string;
}

export function ValuationTab() {
  const [entries, setEntries] = useState<ShareEntry[]>([
    {
      id: '1',
      clientName: 'Rajesh Kumar',
      companyName: 'Reliance Industries',
      newCompanyName: 'Reliance Industries',
      originalShares: 100,
      bonus: 50,
      split: 2,
      finalShares: 300,
      folioNumber: 'REL123456',
      valuePerShare: 2450,
      totalValue: 735000,
      rta: 'KFin Technologies',
      isOriginal: true,
      rtaMail: 'support@kfintech.com',
    },
  ]);
  const [expenditure, setExpenditure] = useState('15000');
  const [valuationComplete, setValuationComplete] = useState(false);

  const addEntry = () => {
    const newEntry: ShareEntry = {
      id: Date.now().toString(),
      clientName: '',
      companyName: '',
      newCompanyName: '',
      originalShares: 0,
      bonus: 0,
      split: 1,
      finalShares: 0,
      folioNumber: '',
      valuePerShare: 0,
      totalValue: 0,
      rta: '',
      isOriginal: true,
      rtaMail: '',
    };
    setEntries([...entries, newEntry]);
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const updateEntry = (id: string, field: keyof ShareEntry, value: any) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        const updated = { ...entry, [field]: value };
        // Auto-calculate final shares
        if (field === 'originalShares' || field === 'bonus' || field === 'split') {
          const original = field === 'originalShares' ? Number(value) : entry.originalShares;
          const bonus = field === 'bonus' ? Number(value) : entry.bonus;
          const split = field === 'split' ? Number(value) : entry.split;
          updated.finalShares = (original + bonus) * split;
        }
        // Auto-calculate total value
        if (field === 'finalShares' || field === 'valuePerShare') {
          const shares = field === 'finalShares' ? Number(value) : updated.finalShares;
          const pricePerShare = field === 'valuePerShare' ? Number(value) : entry.valuePerShare;
          updated.totalValue = shares * pricePerShare;
        }
        return updated;
      }
      return entry;
    }));
  };

  const totalShareValue = entries.reduce((sum, entry) => sum + entry.totalValue, 0);

  const handleValuationComplete = () => {
    setValuationComplete(true);
    alert('Valuation completed! Master Admin has been notified with timestamp: ' + new Date().toLocaleString());
  };

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      {valuationComplete ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div className="flex-1">
            <p className="text-green-900">Valuation Completed</p>
            <p className="text-green-700 text-sm">Master Admin notified on {new Date().toLocaleString()}</p>
          </div>
          <Badge variant="default">Complete</Badge>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600" />
          <div className="flex-1">
            <p className="text-blue-900">Valuation In Progress</p>
            <p className="text-blue-700 text-sm">Complete the share entries and mark as complete when done</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Share Valuation Entries</CardTitle>
          <Button onClick={addEntry} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {entries.map((entry, index) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-900">Entry #{index + 1}</h3>
                  {entries.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeEntry(entry.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label>Client Name *</Label>
                    <Input
                      value={entry.clientName}
                      onChange={(e) => updateEntry(entry.id, 'clientName', e.target.value)}
                      placeholder="Client name"
                    />
                  </div>

                  <div>
                    <Label>Company Name *</Label>
                    <Input
                      value={entry.companyName}
                      onChange={(e) => updateEntry(entry.id, 'companyName', e.target.value)}
                      placeholder="Original company name"
                    />
                    <p className="text-xs text-gray-500 mt-1">Will check database for name changes</p>
                  </div>

                  <div>
                    <Label>New Company Name</Label>
                    <Input
                      value={entry.newCompanyName}
                      onChange={(e) => updateEntry(entry.id, 'newCompanyName', e.target.value)}
                      placeholder="Auto-filled if name changed"
                    />
                  </div>

                  <div>
                    <Label>Original Shares *</Label>
                    <Input
                      type="number"
                      value={entry.originalShares}
                      onChange={(e) => updateEntry(entry.id, 'originalShares', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label>Bonus</Label>
                    <Input
                      type="number"
                      value={entry.bonus}
                      onChange={(e) => updateEntry(entry.id, 'bonus', e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label>Split Ratio</Label>
                    <Input
                      type="number"
                      value={entry.split}
                      onChange={(e) => updateEntry(entry.id, 'split', e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <Label>Final Shares (Auto-calculated)</Label>
                    <Input
                      type="number"
                      value={entry.finalShares}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">(Original + Bonus) × Split</p>
                  </div>

                  <div>
                    <Label>Folio Number *</Label>
                    <Input
                      value={entry.folioNumber}
                      onChange={(e) => updateEntry(entry.id, 'folioNumber', e.target.value)}
                      placeholder="Folio number"
                    />
                  </div>

                  <div>
                    <Label>Value Per Share (₹) *</Label>
                    <Input
                      type="number"
                      value={entry.valuePerShare}
                      onChange={(e) => updateEntry(entry.id, 'valuePerShare', e.target.value)}
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">From API/Excel data</p>
                  </div>

                  <div>
                    <Label>Total Value (₹) (Auto-calculated)</Label>
                    <Input
                      type="number"
                      value={entry.totalValue}
                      disabled
                      className="bg-gray-100"
                    />
                    <p className="text-xs text-gray-500 mt-1">Final Shares × Value Per Share</p>
                  </div>

                  <div>
                    <Label>RTA *</Label>
                    <Input
                      value={entry.rta}
                      onChange={(e) => updateEntry(entry.id, 'rta', e.target.value)}
                      placeholder="RTA name"
                    />
                  </div>

                  <div>
                    <Label>RTA Email *</Label>
                    <Input
                      type="email"
                      value={entry.rtaMail}
                      onChange={(e) => updateEntry(entry.id, 'rtaMail', e.target.value)}
                      placeholder="rta@email.com"
                    />
                  </div>

                  <div>
                    <Label>Is Original Certificate?</Label>
                    <select
                      value={entry.isOriginal ? 'yes' : 'no'}
                      onChange={(e) => updateEntry(entry.id, 'isOriginal', e.target.value === 'yes')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 text-sm mb-1">Total Share Value</p>
              <p className="text-green-900">₹ {totalShareValue.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <Label htmlFor="expenditure" className="text-orange-700 text-sm">Total Expenditure</Label>
              <Input
                id="expenditure"
                type="number"
                value={expenditure}
                onChange={(e) => setExpenditure(e.target.value)}
                className="mt-2"
                placeholder="Enter total expenditure"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-700 text-sm mb-1">Expected Net Value</p>
              <p className="text-blue-900">₹ {(totalShareValue - Number(expenditure)).toLocaleString('en-IN')}</p>
            </div>
          </div>

          {!valuationComplete && (
            <div className="mt-6 flex justify-end">
              <Button onClick={handleValuationComplete} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Valuation & Notify Admin
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <p className="text-amber-900 text-sm">
          <strong>Note:</strong> Share values will be automatically fetched from integrated financial APIs. 
          Company name changes will be checked against the database/Excel file. Upon completion, 
          Master Admin will be notified with timestamp to contact client and close the deal.
        </p>
      </div>
    </div>
  );
}
