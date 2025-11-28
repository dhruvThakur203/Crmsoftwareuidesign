import { TrendingUp, TrendingDown, DollarSign, Users, FolderOpen, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function StatsCards() {
  const stats = [
    {
      title: 'Total Value Recovering',
      value: '₹12,45,89,500',
      change: '+12.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Money Received',
      value: '₹8,23,45,000',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Expected Amount',
      value: '₹4,22,44,500',
      change: '33.9%',
      trend: 'pending',
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Total Expense',
      value: '₹45,23,000',
      change: '+5.4%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Active Clients',
      value: '247',
      change: '+18',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Cases Closed',
      value: '156',
      change: '+23',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-gray-600">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} p-2 rounded`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-gray-900 mb-1">{stat.value}</div>
            <p className={`${stat.trend === 'up' ? 'text-green-600' : 'text-orange-600'}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
