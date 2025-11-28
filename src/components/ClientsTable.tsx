import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ClientsTableProps {
  onViewClient: () => void;
}

export function ClientsTable({ onViewClient }: ClientsTableProps) {
  const clients = [
    {
      id: 'CS001',
      name: 'Rajesh Kumar',
      folios: 3,
      caseType: 'Direct Demat',
      status: 'Valuation',
      value: '₹4,50,000',
      rm: 'Amit Sharma',
      createdDate: '2024-01-15',
      interest: 'Interested',
    },
    {
      id: 'CS002',
      name: 'Priya Patel',
      folios: 5,
      caseType: 'Transmission',
      status: 'RTA Communication',
      value: '₹8,20,000',
      rm: 'Sneha Reddy',
      createdDate: '2024-01-12',
      interest: 'Deal Closed',
    },
    {
      id: 'CS003',
      name: 'Suresh Mehta',
      folios: 2,
      caseType: 'Direct Demat',
      status: 'Pending Docs',
      value: '₹2,30,000',
      rm: 'Amit Sharma',
      createdDate: '2024-01-18',
      interest: 'Call Back',
    },
    {
      id: 'CS004',
      name: 'Anita Desai',
      folios: 7,
      caseType: 'Transmission',
      status: 'Deal Closed',
      value: '₹12,45,000',
      rm: 'Rahul Verma',
      createdDate: '2024-01-10',
      interest: 'Deal Closed',
    },
    {
      id: 'CS005',
      name: 'Vikram Singh',
      folios: 4,
      caseType: 'Direct Demat',
      status: 'Valuation',
      value: '₹6,70,000',
      rm: 'Sneha Reddy',
      createdDate: '2024-01-20',
      interest: 'Interested',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valuation': return 'bg-blue-100 text-blue-800';
      case 'RTA Communication': return 'bg-purple-100 text-purple-800';
      case 'Pending Docs': return 'bg-orange-100 text-orange-800';
      case 'Deal Closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterestColor = (interest: string) => {
    switch (interest) {
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Deal Closed': return 'bg-blue-100 text-blue-800';
      case 'Call Back': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Cases</CardTitle>
          <Button variant="outline">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Folios</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Interest</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="text-gray-900">{client.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="text-gray-900">{client.name}</div>
                    <div className="text-gray-500">RM: {client.rm}</div>
                  </div>
                </TableCell>
                <TableCell>{client.folios}</TableCell>
                <TableCell className="text-gray-600">{client.caseType}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-900">{client.value}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getInterestColor(client.interest)}>
                    {client.interest}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={onViewClient}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
