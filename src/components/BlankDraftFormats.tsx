import { useState } from 'react';
import { Download, ChevronDown, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';

// Mapping of format options to their corresponding folders and documents
const BLANK_DRAFT_FORMATS = {
  'Simple Dematerialization': {
    folder: 'Simple Dematerialization',
    documents: [
      'Form_SH13_NOMINATION_FORM.pdf',
      'ISR 1 (1).pdf',
      'ISR 2.pdf',
      'ISR 3.pdf',
      'ISR 4.pdf',
      'SH-13.pdf',
      'SH-14.pdf',
      'Simple Dematerialization (1).docx',
    ],
  },
  'Share Certificates are missing lost': {
    folder: 'Share Certificates are missing lost',
    documents: [
      'Form A.pdf',
      'Form_B_Indemnity_for_issuance_of_duplicate_securities.pdf',
      'Form_SH13_NOMINATION_FORM.pdf',
      'Share Certificates are missing  lost (1).docx',
    ],
  },
  'Share Certificates are missing because of shifting from the original address': {
    folder: 'Shares Certificates are missing because of shifting from the original address',
    documents: [
      'Form_SH13_NOMINATION_FORM.pdf',
      'Share Certificates are missing because of shifting from the original address.docx',
    ],
  },
  'Legal Heir wants to get the shares transferred': {
    folder: 'Legal Heir wants to get the shares transferred in his or her or their name after the death of the Share Holder',
    documents: [
      'Form_SH13_NOMINATION_FORM.pdf',
      'Legal Heir wants to get the shares transferred in hishertheir name after the death of the Share Holder.docx',
    ],
  },
  'Exceptional Circumstances': {
    folder: 'Exceptional Circumstances',
    documents: [
      'Exceptional Circumstances.docx',
      'Form_SH13_NOMINATION_FORM.pdf',
    ],
  },
  'The shares are to be demat but the shareholder is dead': {
    folder: 'The shares are to be demat but the shareholder is dead, the shares are into IEPF, the company has merged and the share certificates are missing',
    documents: [
      'Annexure-C-ISR5.pdf',
      'Annexure-D.pdf',
      'Annexure-E.pdf',
      'Annexure-F.pdf',
      'Form_SH13_NOMINATION_FORM.pdf',
      'The shares are to be demat but the shareholder is dead, the shares are into IEPF, the company has merged and the share certificates are missing.docx',
      'Transmission forms.pdf',
    ],
  },
};

interface BlankDraftFormatsProps {
  shareholders: string[];
}

interface ShareholderSelection {
  [shareholder: string]: {
    selectedFormats: Set<string>;
  };
}

export function BlankDraftFormats({ shareholders }: BlankDraftFormatsProps) {
  const [shareholderSelections, setShareholderSelections] = useState<ShareholderSelection>(
    shareholders.reduce((acc, sh) => {
      acc[sh] = { selectedFormats: new Set() };
      return acc;
    }, {} as ShareholderSelection)
  );
  const [expandedShareholder, setExpandedShareholder] = useState<string | null>(null);

  const formatOptions = Object.keys(BLANK_DRAFT_FORMATS);

  const toggleFormat = (shareholder: string, format: string) => {
    setShareholderSelections((prev) => {
      const updated = { ...prev };
      const newSet = new Set(updated[shareholder].selectedFormats);
      if (newSet.has(format)) {
        newSet.delete(format);
      } else {
        newSet.add(format);
      }
      updated[shareholder].selectedFormats = newSet;
      return updated;
    });
  };

  const getSelectedDocuments = (shareholder: string): Map<string, { folder: string; documents: string[] }> => {
    const selectedFormats = shareholderSelections[shareholder].selectedFormats;
    const docs = new Map<string, { folder: string; documents: string[] }>();

    selectedFormats.forEach((format) => {
      const formatData = BLANK_DRAFT_FORMATS[format as keyof typeof BLANK_DRAFT_FORMATS];
      if (formatData) {
        // Get union of documents (avoid duplicates)
        if (docs.has(formatData.folder)) {
          const existing = docs.get(formatData.folder)!;
          const merged = new Set([...existing.documents, ...formatData.documents]);
          docs.set(formatData.folder, {
            folder: formatData.folder,
            documents: Array.from(merged),
          });
        } else {
          docs.set(formatData.folder, formatData);
        }
      }
    });

    return docs;
  };

  const downloadDocument = async (folder: string, fileName: string) => {
    try {
      // Construct the path to the document (served from public folder)
      const docPath = `/formsection/${folder}/${fileName}`;
      const link = globalThis.document.createElement('a');
      link.href = docPath;
      link.download = fileName;
      globalThis.document.body.appendChild(link);
      link.click();
      globalThis.document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const downloadAllSelected = (shareholder: string) => {
    const selectedDocs = getSelectedDocuments(shareholder);
    const totalDocs = Array.from(selectedDocs.values()).reduce(
      (sum, item) => sum + item.documents.length,
      0
    );

    if (totalDocs === 0) {
      alert('Please select at least one format');
      return;
    }

    // In a real implementation, you'd zip these files and download them
    alert(`Selected ${totalDocs} document(s) for download. Implementation would download as ZIP.`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Blank Draft Formats</CardTitle>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Select required blank formats and download the corresponding documents
          </p>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          {shareholders.map((shareholder) => {
            const selectedCount = shareholderSelections[shareholder].selectedFormats.size;
            const selectedDocs = getSelectedDocuments(shareholder);
            const totalDocs = Array.from(selectedDocs.values()).reduce(
              (sum, item) => sum + item.documents.length,
              0
            );

            return (
              <div key={shareholder} className="border rounded-lg overflow-hidden">
                {/* Shareholder Header */}
                <button
                  onClick={() =>
                    setExpandedShareholder(
                      expandedShareholder === shareholder ? null : shareholder
                    )
                  }
                  className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-600 shrink-0 transition-transform ${
                        expandedShareholder === shareholder ? 'rotate-180' : ''
                      }`}
                    />
                    <div className="min-w-0 text-left">
                      <p className="text-gray-900 font-medium truncate">{shareholder}</p>
                      <p className="text-gray-600 text-xs">
                        {selectedCount} format(s) selected • {totalDocs} document(s)
                      </p>
                    </div>
                  </div>
                  {selectedCount > 0 && (
                    <Badge className="shrink-0 bg-indigo-600">{selectedCount}</Badge>
                  )}
                </button>

                {expandedShareholder === shareholder && (
                  <div className="p-4 space-y-4 bg-white border-t">
                    {/* Format Selection Checkboxes */}
                    <div>
                      <Label className="text-gray-900 font-medium mb-3 block">
                        Select Blank Draft Formats:
                      </Label>
                      <div className="space-y-2">
                        {formatOptions.map((format) => (
                          <div
                            key={format}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Checkbox
                              id={`${shareholder}-${format}`}
                              checked={shareholderSelections[shareholder].selectedFormats.has(format)}
                              onCheckedChange={() => toggleFormat(shareholder, format)}
                              className="mt-1"
                            />
                            <Label
                              htmlFor={`${shareholder}-${format}`}
                              className="flex-1 cursor-pointer text-sm text-gray-700"
                            >
                              {format}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Selected Documents List */}
                    {selectedCount > 0 && (
                      <div className="pt-4 border-t">
                        <Label className="text-gray-900 font-medium mb-3 block">
                          Available Documents for Download:
                        </Label>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {Array.from(selectedDocs.entries()).map(([folder, data]) =>
                            data.documents.map((doc) => (
                              <div
                                key={`${folder}-${doc}`}
                                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                              >
                                <div className="flex items-center gap-2 min-w-0 flex-1">
                                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                                  <div className="min-w-0">
                                    <p className="text-gray-900 text-sm truncate">{doc}</p>
                                    <p className="text-gray-500 text-xs">{folder}</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => downloadDocument(data.folder, doc)}
                                  className="shrink-0 ml-2"
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            ))
                          )}
                        </div>

                        {/* Download All Button */}
                        <Button
                          onClick={() => downloadAllSelected(shareholder)}
                          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download All Selected ({totalDocs})
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
