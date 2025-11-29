import { useState } from 'react';
import { ArrowLeft, Upload, UserPlus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ClientCreationFormProps {
  onNavigate: (page: 'dashboard' | 'client-detail') => void;
}

export function ClientCreationForm({ onNavigate }: ClientCreationFormProps) {
  const [shareholderNames, setShareholderNames] = useState<string[]>(['']);
  const [clientNames, setClientNames] = useState<string[]>(['']);
  const [documents, setDocuments] = useState<File[]>([]);

  const addShareholderName = () => {
    setShareholderNames([...shareholderNames, '']);
  };

  const removeShareholderName = (index: number) => {
    const newNames = shareholderNames.filter((_, i) => i !== index);
    setShareholderNames(newNames);
  };

  const updateShareholderName = (index: number, value: string) => {
    const newNames = [...shareholderNames];
    newNames[index] = value;
    setShareholderNames(newNames);
  };

  const addClientName = () => {
    setClientNames([...clientNames, '']);
  };

  const removeClientName = (index: number) => {
    const newNames = clientNames.filter((_, i) => i !== index);
    setClientNames(newNames);
  };

  const updateClientName = (index: number, value: string) => {
    const newNames = [...clientNames];
    newNames[index] = value;
    setClientNames(newNames);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Timestamp and send to valuation employee
    alert('Case created successfully and sent to valuation team with timestamp: ' + new Date().toLocaleString());
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')} className="shrink-0">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-gray-900 truncate">Create New Client/Case</h1>
              <p className="text-gray-600 text-xs sm:text-sm">Process 1: Client Creation Form</p>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-gray-600 text-sm mt-1">Case Create Date: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Lead Source & Contact Person */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="lead">Lead Source *</Label>
                  <Select required>
                    <SelectTrigger id="lead">
                      <SelectValue placeholder="Select lead source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="social-media">Social Media</SelectItem>
                      <SelectItem value="direct">Direct Walk-in</SelectItem>
                      <SelectItem value="advertisement">Advertisement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact-person">Contact Person Name *</Label>
                  <Input id="contact-person" placeholder="Enter contact person name" required />
                </div>
              </div>

              {/* Shareholder Names (Multiple) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Shareholder Names *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addShareholderName}>
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Add</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  {shareholderNames.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={name}
                        onChange={(e) => updateShareholderName(index, e.target.value)}
                        placeholder={`Shareholder ${index + 1} name`}
                        required
                      />
                      {shareholderNames.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeShareholderName(index)} className="shrink-0">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Names (Multiple) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Client Names (Family Members) *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addClientName}>
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="text-xs sm:text-sm">Add Member</span>
                  </Button>
                </div>
                <div className="space-y-2">
                  {clientNames.map((name, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={name}
                        onChange={(e) => updateClientName(index, e.target.value)}
                        placeholder={`Client ${index + 1} name`}
                        required
                      />
                      {clientNames.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeClientName(index)} className="shrink-0">
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
                </div>
                <div>
                  <Label htmlFor="alt-mobile">Alternate Mobile</Label>
                  <Input id="alt-mobile" type="tel" placeholder="Alternate mobile" />
                </div>
                <div>
                  <Label htmlFor="landline">Landline</Label>
                  <Input id="landline" type="tel" placeholder="Enter landline" />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="Enter email" required />
                </div>
              </div>

              {/* Number of Folios */}
              <div>
                <Label htmlFor="folios">Number of Folios *</Label>
                <Input id="folios" type="number" placeholder="Enter number of folios" required />
              </div>

              {/* Addresses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="new-address">New Address *</Label>
                  <Textarea id="new-address" placeholder="Enter current address" rows={3} required />
                </div>
                <div>
                  <Label htmlFor="old-address">Old Address</Label>
                  <Textarea id="old-address" placeholder="Enter old address" rows={3} />
                </div>
              </div>

              {/* Demat */}
              <div>
                <Label htmlFor="demat">Demat Created *</Label>
                <Select required>
                  <SelectTrigger id="demat">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No - Assign to create</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assigned To (if Demat not created) */}
              <div>
                <Label htmlFor="assigned">Assigned To (if Demat not created)</Label>
                <Input id="assigned" placeholder="Enter assignee name" />
              </div>

              {/* Documents Upload */}
              <div>
                <Label htmlFor="documents">Documents Upload (PDF, JPEG, etc.) *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-xs sm:text-sm">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-xs mt-1">PDF, JPG, PNG up to 10MB each</p>
                  <Input id="documents" type="file" multiple className="hidden" />
                </div>
              </div>

              {/* Death Certificate */}
              <div>
                <Label htmlFor="death-cert">Death Certificate (if applicable)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 text-center">
                  <Input id="death-cert" type="file" />
                </div>
              </div>

              {/* All Documents Collected */}
              <div>
                <Label htmlFor="docs-collected">All Documents Collected *</Label>
                <Select required>
                  <SelectTrigger id="docs-collected">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Case Type */}
              <div>
                <Label htmlFor="case-type">Case Type *</Label>
                <Select required>
                  <SelectTrigger id="case-type">
                    <SelectValue placeholder="Select case type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct-demat">Direct Demat</SelectItem>
                    <SelectItem value="transmission">Transmission</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* State of Interest */}
              <div>
                <Label htmlFor="interest">State of Interest *</Label>
                <Select required>
                  <SelectTrigger id="interest">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="call-back">Call Back</SelectItem>
                    <SelectItem value="call-busy">Call Busy</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="deal-closed">Deal Closed</SelectItem>
                    <SelectItem value="shares-recovered">Shares Recovered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Field Boy */}
              <div>
                <Label htmlFor="field-boy">Field Boy</Label>
                <Input id="field-boy" placeholder="Enter field boy name (optional at creation)" />
              </div>

              {/* Case Info/Briefing */}
              <div>
                <Label htmlFor="briefing">Case Info/Briefing *</Label>
                <Textarea 
                  id="briefing" 
                  placeholder="Enter detailed case information and briefing" 
                  rows={4}
                  required 
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                  Submit & Send to Valuation Team
                </Button>
                <Button type="button" variant="outline" onClick={() => onNavigate('dashboard')} className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>

              <p className="text-gray-500 text-xs sm:text-sm">
                * Upon submission, this case will be timestamped and sent to valuation employee with notification
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
