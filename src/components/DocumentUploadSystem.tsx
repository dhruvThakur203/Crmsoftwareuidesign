import { useState } from 'react';
import { Upload, X, FileText, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BlankDraftFormats } from './BlankDraftFormats';

// Document categories
const DOCUMENT_CATEGORIES = {
  'Identity Documents': [
    'Aadhar Front',
    'Aadhar Back',
    'Pan Card',
    'Passport Front',
    'Passport Back',
    'Voter ID Front',
    'Voter ID Back',
    'DL Front',
    'DL Back',
  ],
  'Death & Legal Documents': [
    'Death Certificate',
    'Case Facts Audio',
    'Supporting Video',
    'Legal Hair Certificate',
    'Gazette Notification',
    'Will',
  ],
  'Financial & Share Documents': [
    'ISR1',
    'ISR2',
    'ISR3',
    'ISR4',
    'SH-13',
    'SH-14',
    'Share Certificate PDF',
    'Mutual Fund PDF',
    'DRF Receipt',
    'Valuation of shares',
  ],
  'Authority & Company Documents': [
    'Client Master List',
    'Client Master List Authority Letter',
    'Required Doc by Operation Team',
    'Letter of Confirmation',
  ],
  'Miscellaneous': [
    'Cancelled Cheque',
    'Misc 1',
    'Misc 2',
    'Misc 3',
  ],
};

interface UploadedDocument {
  id: string;
  fileName: string;
  category: string;
  documentType: string;
  shareholder: string;
  size: number;
  uploadDate: string;
  file?: File;
}

interface DocumentUploadSystemProps {
  shareholders: string[];
  onDocumentsChange?: (documents: UploadedDocument[]) => void;
  allowLaterUpload?: boolean;
  showBlankFormats?: boolean;
}

export function DocumentUploadSystem({
  shareholders,
  onDocumentsChange,
  allowLaterUpload = true,
  showBlankFormats = true,
}: DocumentUploadSystemProps) {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [selectedShareholder, setSelectedShareholder] = useState<string>(shareholders[0] || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDocType, setSelectedDocType] = useState<string>('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories = Object.keys(DOCUMENT_CATEGORIES);
  const documentTypes = selectedCategory
    ? DOCUMENT_CATEGORIES[selectedCategory as keyof typeof DOCUMENT_CATEGORIES]
    : [];

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !selectedShareholder || !selectedCategory || !selectedDocType) {
      alert('Please select shareholder, category, and document type');
      return;
    }

    const newDocs: UploadedDocument[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newDocs.push({
        id: `doc-${Date.now()}-${i}`,
        fileName: file.name,
        category: selectedCategory,
        documentType: selectedDocType,
        shareholder: selectedShareholder,
        size: file.size,
        uploadDate: new Date().toLocaleString(),
        file,
      });
    }

    const updated = [...uploadedDocuments, ...newDocs];
    setUploadedDocuments(updated);
    onDocumentsChange?.(updated);

    // Reset selections
    setSelectedCategory('');
    setSelectedDocType('');
  };

  const removeDocument = (id: string) => {
    const updated = uploadedDocuments.filter((doc) => doc.id !== id);
    setUploadedDocuments(updated);
    onDocumentsChange?.(updated);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const groupedDocuments = uploadedDocuments.reduce((acc, doc) => {
    const key = `${doc.shareholder}-${doc.category}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(doc);
    return acc;
  }, {} as Record<string, UploadedDocument[]>);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Blank Draft Formats Section */}
      {showBlankFormats && <BlankDraftFormats shareholders={shareholders} />}

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Documents</CardTitle>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            {allowLaterUpload
              ? 'Upload documents now or add them later'
              : 'Upload required documents for case creation'}
          </p>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {/* Shareholder Selection */}
          <div>
            <Label htmlFor="shareholder-select">Select Shareholder *</Label>
            <Select value={selectedShareholder} onValueChange={setSelectedShareholder}>
              <SelectTrigger id="shareholder-select">
                <SelectValue placeholder="Select a shareholder" />
              </SelectTrigger>
              <SelectContent>
                {shareholders.map((sh) => (
                  <SelectItem key={sh} value={sh}>
                    {sh}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Selection */}
          <div>
            <Label htmlFor="category-select">Document Category *</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category-select">
                <SelectValue placeholder="Select document category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Document Type Selection */}
          {selectedCategory && documentTypes.length > 0 && (
            <div>
              <Label htmlFor="doc-type-select">Document Type *</Label>
              <Select value={selectedDocType} onValueChange={setSelectedDocType}>
                <SelectTrigger id="doc-type-select">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* File Upload */}
          <div>
            <Label htmlFor="file-upload">Choose Files *</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-gray-50">
              <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-xs sm:text-sm">Click to upload or drag and drop</p>
              <p className="text-gray-500 text-xs mt-1">PDF, JPG, PNG up to 10MB each</p>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <button
                onClick={() => document.getElementById('file-upload')?.click()}
                className="mt-3 inline-block text-indigo-600 hover:text-indigo-700 font-medium text-xs sm:text-sm"
              >
                Select Files
              </button>
            </div>
          </div>

          {/* Upload Status */}
          {uploadedDocuments.length > 0 && (
            <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-xs sm:text-sm font-medium">
                ✓ {uploadedDocuments.length} document(s) uploaded successfully
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Uploaded Documents Section */}
      {uploadedDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Documents Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {Object.entries(groupedDocuments).map(([key, docs]) => {
                const [shareholder, category] = key.split('-');
                return (
                  <div key={key} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedCategory(expandedCategory === key ? null : key)
                      }
                      className="w-full flex items-center justify-between p-3 sm:p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-600 shrink-0 transition-transform ${
                            expandedCategory === key ? 'rotate-180' : ''
                          }`}
                        />
                        <div className="min-w-0 text-left">
                          <p className="text-gray-900 text-xs sm:text-sm font-medium truncate">
                            {shareholder}
                          </p>
                          <p className="text-gray-600 text-xs truncate">{category}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="shrink-0 text-xs">
                        {docs.length}
                      </Badge>
                    </button>

                    {expandedCategory === key && (
                      <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 border-t bg-white">
                        {docs.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-2 sm:gap-3"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                              <div className="min-w-0">
                                <p className="text-gray-900 text-xs sm:text-sm truncate">
                                  {doc.fileName}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  {formatFileSize(doc.size)} • {doc.documentType} • {doc.uploadDate}
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(doc.id)}
                              className="shrink-0 h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
