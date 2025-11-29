import { CheckCircle, ArrowRight, Users, FileText, MessageSquare, TrendingUp, Lock, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function WorkflowGuide() {
  const workflowSteps = [
    {
      step: 1,
      title: 'Client Creation',
      icon: <Users className="w-5 h-5" />,
      description: 'Master Admin or RM creates a new case with 18-field intake form',
      details: [
        'Lead source tracking',
        'Multiple shareholder names support',
        'Contact person details',
        'Primary and alternate mobile numbers',
        'Address and folio information',
        'Document upload capability',
        'Automatic timestamp generation'
      ],
      timestamp: 'Process 1 - Timestamped on creation'
    },
    {
      step: 2,
      title: 'Valuation Processing',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Valuation Employee processes share calculations',
      details: [
        'Automatic share calculation (Original + Bonus) × Split',
        'Company name change verification from database',
        'Finance API integration for current share prices',
        'RTA assignment per company',
        'Folio number tracking',
        'Total value computation',
        'Expenditure calculation',
        'Net value estimation'
      ],
      timestamp: 'Process 2 - Completion notifies Master Admin with timestamp'
    },
    {
      step: 3,
      title: 'RM & Field Boy Assignment',
      icon: <Users className="w-5 h-5" />,
      description: 'Master Admin assigns team members after valuation',
      details: [
        'Notification bell alerts for pending assignments',
        'Quick assignment from notification dropdown',
        'Team assignment tracking',
        'Assignment timestamp logging',
        'Assigned cases visible in RM/Field Boy dashboards'
      ],
      timestamp: 'Process 3 - Assignment timestamped'
    },
    {
      step: 4,
      title: 'Client Communication',
      icon: <MessageSquare className="w-5 h-5" />,
      description: 'RMs communicate with clients using automated tools',
      details: [
        'Automated call initiation (Twilio integration)',
        'SMS with pre-defined templates',
        'Template categories: Welcome, Valuation, KYC, Follow-up, Closure',
        'Communication history with timestamps',
        'Multiple phone number support',
        'Automated reminders based on case status',
        'All communications logged for compliance'
      ],
      timestamp: 'Process 4 - Every communication timestamped'
    },
    {
      step: 5,
      title: 'KYC & Documentation',
      icon: <FileText className="w-5 h-5" />,
      description: 'Per-company KYC tracking and document management',
      details: [
        'Individual KYC status per company',
        'RM can edit and update KYC status',
        'Add/remove company KYC entries',
        'Automatic pending document flagging',
        'Automated reminders for incomplete KYC',
        'Timestamp on every KYC update'
      ],
      timestamp: 'Process 5 - KYC updates timestamped'
    },
    {
      step: 6,
      title: 'RTA Communication & Deal Closure',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'RTA communication and final deal completion',
      details: [
        'RTA email tracking per company',
        'Communication logs for RTA correspondence',
        'Final share transfer verification',
        'Deal closure timestamp',
        'Payment tracking',
        'Completion notifications to all stakeholders'
      ],
      timestamp: 'Process 6 - Closure timestamped'
    }
  ];

  const automationFeatures = [
    {
      title: '70-80% Automation',
      items: [
        'Automatic share calculations',
        'Scheduled SMS/call reminders',
        'KYC status tracking',
        'Team assignment notifications',
        'Communication logging',
        'Timeline-based alerts'
      ]
    },
    {
      title: 'Timestamp Logging',
      items: [
        'Case creation timestamp',
        'Valuation completion time',
        'Every RM assignment',
        'All client communications',
        'KYC status changes',
        'Document uploads',
        'Deal closure time'
      ]
    },
    {
      title: 'Role-Based Access',
      items: [
        'Master Admin: Full system access',
        'RM: Client management & communication',
        'Field Boy: Document collection & verification',
        'Valuation Employee: Share calculations only'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-indigo-600" />
            Share Recovery CRM Workflow
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            Complete business process automation for share recovery consultancy - from client intake to deal closure
          </p>
        </CardHeader>
      </Card>

      {/* Workflow Steps */}
      <div className="space-y-4">
        {workflowSteps.map((workflow, index) => (
          <Card key={workflow.step}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-indigo-100 p-3 rounded-lg shrink-0">
                    {workflow.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-indigo-600">Step {workflow.step}</Badge>
                      <h3 className="text-gray-900">{workflow.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{workflow.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-indigo-600">
                      <Clock className="w-3 h-3" />
                      <span>{workflow.timestamp}</span>
                    </div>
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-gray-400 hidden lg:block shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 text-sm mb-3">Key Features:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {workflow.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Automation Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            System Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {automationFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-gray-900 mb-3">{feature.title}</h4>
                <ul className="space-y-2">
                  {feature.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Notes */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-900 text-sm">
          <strong>Technical Integration Points:</strong> The system integrates with finance APIs for real-time 
          share valuation, telephony APIs (Twilio) for automated calls, and SMS gateways (MSG91) for messaging. 
          All database operations include timestamp columns for audit trails. The frontend is built with React 
          and Tailwind CSS for responsive design across laptop and mobile devices.
        </p>
      </div>
    </div>
  );
}
