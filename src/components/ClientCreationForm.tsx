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
  const [clientNames, setClientNames] = useState<string[]>(['']);
  const [documents, setDocuments] = useState<File[]>([]);

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">Create New Client/Case</h1>
              <p className="text-gray-600 text-sm">Process 1: Client Creation Form</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <p className="text-gray-600 text-sm mt-1">Case Create Date: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lead Source & Contact Person */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Client Names (Multiple) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Client Names (Family Members) *</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addClientName}>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
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
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeClientName(index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" type="tel" placeholder="Enter mobile number" required />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-address">New Address *</Label>
                  <Textarea id="new-address" placeholder="Enter current address" rows={3} required />
                </div>
                <div>
                  <Label htmlFor="old-address">Old Address</Label>
                  <Textarea id="old-address" placeholder="Enter old address" rows={3} />
                </div>
              </div>

              {/* KYC & Demat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kyc">KYC Completed *</Label>
                  <Select required>
                    <SelectTrigger id="kyc">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
              </div>

              {/* Assigned To (if Demat not created) */}
              <div>
                <Label htmlFor="assigned">Assigned To (if Demat not created)</Label>
                <Input id="assigned" placeholder="Enter assignee name" />
              </div>

              {/* Documents Upload */}
              <div>
                <Label htmlFor="documents">Documents Upload (PDF, JPEG, etc.) *</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-xs mt-1">PDF, JPG, PNG up to 10MB each</p>
                  <Input id="documents" type="file" multiple className="hidden" />
                </div>
              </div>

              {/* Death Certificate */}
              <div>
                <Label htmlFor="death-cert">Death Certificate (if applicable)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
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
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Submit & Send to Valuation Team
                </Button>
                <Button type="button" variant="outline" onClick={() => onNavigate('dashboard')}>
                  Cancel
                </Button>
              </div>

              <p className="text-gray-500 text-sm">
                * Upon submission, this case will be timestamped and sent to valuation employee with notification
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}
