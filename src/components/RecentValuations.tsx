import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function RecentValuations() {
  const valuations = [
    {
      caseId: 'CS001',
      client: 'Rajesh Kumar',
      totalValue: '₹4,50,000',
      folios: 3,
      status: 'Completed',
    },
    {
      caseId: 'CS005',
      client: 'Vikram Singh',
      totalValue: '₹6,70,000',
      folios: 4,
      status: 'In Progress',
    },
    {
      caseId: 'CS008',
      client: 'Deepak Joshi',
      totalValue: '₹3,20,000',
      folios: 2,
      status: 'Pending',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Valuation Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {valuations.map((val) => (
            <div key={val.caseId} className="border border-gray-200 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">{val.caseId}</span>
                <Badge variant="secondary" className={getStatusColor(val.status)}>
                  {val.status}
                </Badge>
              </div>
              <p className="text-gray-900 mb-1">{val.client}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">{val.folios} Folios</p>
                  <p className="text-gray-900">{val.totalValue}</p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
