import { useState } from 'react';
import { Users, ArrowLeft, UserPlus, Trash2, Edit, Shield, Eye, EyeOff, UserCheck, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

interface ManageUsersProps {
  onNavigate: (page: 'login' | 'dashboard' | 'create-client' | 'client-detail' | 'all-cases' | 'manage-users', clientId?: string) => void;
}

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: 'RM' | 'Field Boy';
  status: 'Active' | 'Inactive';
  createdDate: string;
  activeCases: number;
}

interface PendingCase {
  id: string;
  clientName: string;
  contactPerson: string;
  mobile: string;
  folios: number;
  totalValue: string;
  valuationCompletedDate: string;
  assignedRM?: string;
  assignedFieldBoy?: string;
}

export function ManageUsers({ onNavigate }: ManageUsersProps) {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Vikram Singh', username: 'rm1', password: 'rm123', role: 'RM', status: 'Active', createdDate: '2025-10-15', activeCases: 15 },
    { id: '2', name: 'Anjali Reddy', username: 'rm2', password: 'rm123', role: 'RM', status: 'Active', createdDate: '2025-10-20', activeCases: 12 },
    { id: '3', name: 'Ravi Kumar', username: 'field1', password: 'field123', role: 'Field Boy', status: 'Active', createdDate: '2025-10-18', activeCases: 8 },
    { id: '4', name: 'Suresh Yadav', username: 'field2', password: 'field123', role: 'Field Boy', status: 'Active', createdDate: '2025-10-22', activeCases: 6 },
  ]);

  const [pendingCases, setPendingCases] = useState<PendingCase[]>([
    { 
      id: 'CLT-2025-001', 
      clientName: 'Rajesh Kumar', 
      contactPerson: 'Rajesh Kumar',
      mobile: '+91 98765 43210',
      folios: 5, 
      totalValue: '₹12,50,000', 
      valuationCompletedDate: '2025-11-18 14:30'
    },
    { 
      id: 'CLT-2025-005', 
      clientName: 'Meera Iyer', 
      contactPerson: 'Meera Iyer',
      mobile: '+91 98765 43215',
      folios: 9, 
      totalValue: '₹22,00,000', 
      valuationCompletedDate: '2025-11-15 16:00'
    },
    { 
      id: 'CLT-2025-010', 
      clientName: 'Karan Mehta', 
      contactPerson: 'Karan Mehta',
      mobile: '+91 98765 43220',
      folios: 6, 
      totalValue: '₹14,30,000', 
      valuationCompletedDate: '2025-11-14 13:20'
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Assignment state for each case
  const [caseAssignments, setCaseAssignments] = useState<{ [caseId: string]: { rmId: string; fieldBoyId: string } }>({});

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role: 'RM' as 'RM' | 'Field Boy',
  });

  const handleAddUser = () => {
    if (!formData.name || !formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if username already exists
    if (users.some(u => u.username === formData.username)) {
      toast.error('Username already exists');
      return;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      name: formData.name,
      username: formData.username,
      password: formData.password,
      role: formData.role,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      activeCases: 0,
    };

    setUsers([...users, newUser]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', username: '', password: '', role: 'RM' });
    toast.success(`${formData.role} "${formData.name}" created successfully`);
  };

  const handleEditUser = () => {
    if (!selectedUser || !formData.name || !formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Check if username already exists (excluding current user)
    if (users.some(u => u.username === formData.username && u.id !== selectedUser.id)) {
      toast.error('Username already exists');
      return;
    }

    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, name: formData.name, username: formData.username, password: formData.password, role: formData.role }
        : u
    ));
    setIsEditDialogOpen(false);
    setSelectedUser(null);
    setFormData({ name: '', username: '', password: '', role: 'RM' });
    toast.success('User updated successfully');
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user && user.activeCases > 0) {
      toast.error(`Cannot delete ${user.name}. They have ${user.activeCases} active cases assigned.`);
      return;
    }
    setUsers(users.filter(u => u.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' }
        : u
    ));
    const user = users.find(u => u.id === userId);
    toast.success(`User ${user?.status === 'Active' ? 'deactivated' : 'activated'}`);
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      password: user.password,
      role: user.role,
    });
    setIsEditDialogOpen(true);
  };

  const openAddDialog = () => {
    setFormData({ name: '', username: '', password: '', role: 'RM' });
    setShowPassword(false);
    setIsAddDialogOpen(true);
  };

  const handleAssignCase = (caseId: string) => {
    const assignment = caseAssignments[caseId];
    if (!assignment || !assignment.rmId || !assignment.fieldBoyId) {
      toast.error('Please select both RM and Field Boy');
      return;
    }

    const rm = users.find(u => u.id === assignment.rmId);
    const fieldBoy = users.find(u => u.id === assignment.fieldBoyId);
    const caseData = pendingCases.find(c => c.id === caseId);

    // Update the case with assignment
    setPendingCases(pendingCases.map(c => 
      c.id === caseId 
        ? { ...c, assignedRM: rm?.name, assignedFieldBoy: fieldBoy?.name }
        : c
    ));

    // Update active case counts
    setUsers(users.map(u => {
      if (u.id === assignment.rmId || u.id === assignment.fieldBoyId) {
        return { ...u, activeCases: u.activeCases + 1 };
      }
      return u;
    }));

    toast.success(`Case ${caseData?.clientName} assigned to ${rm?.name} and ${fieldBoy?.name}`);
  };

  const handleRemoveCase = (caseId: string) => {
    const caseData = pendingCases.find(c => c.id === caseId);
    if (!caseData?.assignedRM || !caseData?.assignedFieldBoy) {
      // If not assigned, just remove from list
      setPendingCases(pendingCases.filter(c => c.id !== caseId));
      toast.success('Case removed from pending list');
    } else {
      // If assigned, update active case counts and remove
      const rm = users.find(u => u.name === caseData.assignedRM);
      const fieldBoy = users.find(u => u.name === caseData.assignedFieldBoy);
      
      setUsers(users.map(u => {
        if (u.id === rm?.id || u.id === fieldBoy?.id) {
          return { ...u, activeCases: Math.max(0, u.activeCases - 1) };
        }
        return u;
      }));

      setPendingCases(pendingCases.filter(c => c.id !== caseId));
      toast.success('Case assignment removed');
    }
  };

  const rmCount = users.filter(u => u.role === 'RM' && u.status === 'Active').length;
  const fieldBoyCount = users.filter(u => u.role === 'Field Boy' && u.status === 'Active').length;
  const activeRMs = users.filter(u => u.role === 'RM' && u.status === 'Active');
  const activeFieldBoys = users.filter(u => u.role === 'Field Boy' && u.status === 'Active');
  const unassignedCases = pendingCases.filter(c => !c.assignedRM || !c.assignedFieldBoy).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">User & Assignment Management</h1>
                <p className="text-gray-600 text-sm">Manage users and assign cases to RM & Field Boy</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 px-6 pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active RMs</p>
                  <p className="text-gray-900">{rmCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 px-6 pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Active Field Boys</p>
                  <p className="text-gray-900">{fieldBoyCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 px-6 pb-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pending Assignments</p>
                  <p className="text-gray-900">{unassignedCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="assignments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              Assign Cases ({unassignedCases})
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Manage Users
            </TabsTrigger>
          </TabsList>

          {/* Assign Cases Tab */}
          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cases Ready for Assignment</CardTitle>
                    <p className="text-gray-600 text-sm mt-1">
                      Valuation completed - assign RM and Field Boy to proceed
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {pendingCases.length === 0 ? (
                  <div className="text-center py-12">
                    <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No cases pending assignment</p>
                    <p className="text-gray-500 text-sm mt-1">All cases have been assigned</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingCases.map((caseData) => {
                      const isAssigned = caseData.assignedRM && caseData.assignedFieldBoy;
                      return (
                        <div
                          key={caseData.id}
                          className={`p-5 rounded-lg border-2 ${
                            isAssigned 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          {/* Case Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-gray-900">{caseData.clientName}</h3>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Case ID: {caseData.id}
                                </Badge>
                                {isAssigned && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    <UserCheck className="w-3 h-3 mr-1" />
                                    Assigned
                                  </Badge>
                                )}
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div>
                                  <p className="text-gray-600">Contact</p>
                                  <p className="text-gray-900">{caseData.contactPerson}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Mobile</p>
                                  <p className="text-gray-900">{caseData.mobile}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Folios</p>
                                  <p className="text-gray-900">{caseData.folios}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Total Value</p>
                                  <p className="text-gray-900">{caseData.totalValue}</p>
                                </div>
                              </div>
                              <p className="text-gray-500 text-xs mt-2">
                                Valuation completed: {caseData.valuationCompletedDate}
                              </p>
                            </div>
                          </div>

                          {/* Assignment Section */}
                          {!isAssigned ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                              <div>
                                <Label className="mb-2 block">Assign RM</Label>
                                <Select
                                  value={caseAssignments[caseData.id]?.rmId || ''}
                                  onValueChange={(value) => 
                                    setCaseAssignments({
                                      ...caseAssignments,
                                      [caseData.id]: {
                                        ...caseAssignments[caseData.id],
                                        rmId: value,
                                        fieldBoyId: caseAssignments[caseData.id]?.fieldBoyId || ''
                                      }
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select RM..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {activeRMs.map((rm) => (
                                      <SelectItem key={rm.id} value={rm.id}>
                                        {rm.name} ({rm.activeCases} active cases)
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="mb-2 block">Assign Field Boy</Label>
                                <Select
                                  value={caseAssignments[caseData.id]?.fieldBoyId || ''}
                                  onValueChange={(value) => 
                                    setCaseAssignments({
                                      ...caseAssignments,
                                      [caseData.id]: {
                                        ...caseAssignments[caseData.id],
                                        rmId: caseAssignments[caseData.id]?.rmId || '',
                                        fieldBoyId: value
                                      }
                                    })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Field Boy..." />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {activeFieldBoys.map((fb) => (
                                      <SelectItem key={fb.id} value={fb.id}>
                                        {fb.name} ({fb.activeCases} active cases)
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="md:col-span-2">
                                <Button
                                  onClick={() => handleAssignCase(caseData.id)}
                                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                                  disabled={!caseAssignments[caseData.id]?.rmId || !caseAssignments[caseData.id]?.fieldBoyId}
                                >
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Confirm Assignment
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white rounded-lg border border-green-200">
                              <div className="flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg">
                                  <Shield className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div>
                                  <p className="text-gray-600 text-sm">Assigned RM</p>
                                  <p className="text-gray-900">{caseData.assignedRM}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                  <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-gray-600 text-sm">Assigned Field Boy</p>
                                  <p className="text-gray-900">{caseData.assignedFieldBoy}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Users</CardTitle>
                  <Button onClick={openAddDialog} className="bg-indigo-600 hover:bg-indigo-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex-1 w-full sm:w-auto mb-3 sm:mb-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900">{user.name}</p>
                          <Badge variant={user.role === 'RM' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                          <Badge variant={user.status === 'Active' ? 'default' : 'outline'} 
                            className={user.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                            {user.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">
                          Username: <span className="font-medium">{user.username}</span> • 
                          Password: <span className="font-mono">••••••</span>
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          Created: {user.createdDate} • Active Cases: {user.activeCases}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                          className={user.status === 'Active' ? 'text-orange-600 hover:text-orange-700' : 'text-green-600 hover:text-green-700'}
                        >
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700"
                          disabled={user.activeCases > 0}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role} onValueChange={(value: 'RM' | 'Field Boy') => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RM">RM (Relationship Manager)</SelectItem>
                  <SelectItem value="Field Boy">Field Boy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser} className="bg-indigo-600 hover:bg-indigo-700">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="edit-name">Full Name</Label>
              <Input
                id="edit-name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-username">Username</Label>
              <Input
                id="edit-username"
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="edit-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-role">Role</Label>
              <Select value={formData.role} onValueChange={(value: 'RM' | 'Field Boy') => setFormData({ ...formData, role: value })}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RM">RM (Relationship Manager)</SelectItem>
                  <SelectItem value="Field Boy">Field Boy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditUser} className="bg-indigo-600 hover:bg-indigo-700">
              Update User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}