import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, FileText, CheckCircle, AlertCircle, Users } from 'lucide-react';

export function ActivityFeed() {
  const activities = [
    {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Valuation Completed',
      description: 'Case CS001 - Rajesh Kumar',
      user: 'Valuation Team',
      time: '5 mins ago',
    },
    {
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      title: 'Document Uploaded',
      description: 'Case CS003 - Suresh Mehta',
      user: 'Amit Sharma (RM)',
      time: '23 mins ago',
    },
    {
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      title: 'Pending Documents',
      description: 'Case CS005 - Vikram Singh',
      user: 'System Alert',
      time: '1 hour ago',
    },
    {
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      title: 'RM Assigned',
      description: 'Case CS007 - New Client',
      user: 'Master Admin',
      time: '2 hours ago',
    },
    {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Deal Closed',
      description: 'Case CS004 - Anita Desai',
      user: 'Rahul Verma (RM)',
      time: '3 hours ago',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div className={`${activity.bgColor} p-2 rounded h-fit`}>
                <activity.icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">{activity.title}</p>
                <p className="text-gray-600">{activity.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-500">{activity.user}</p>
                  <span className="text-gray-400">•</span>
                  <p className="text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
