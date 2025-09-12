
import React, { useState } from 'react';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import HealthTable from '../components/ui/HealthTable';
import { Users, UserCheck, FileText, Settings, BarChart3, Shield, Plus, Edit, Trash2 } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users');

  const [users] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Patient',
      status: 'Active',
      lastLogin: '2024-01-15'
    },
    {
      id: 2,
      name: 'Dr. Sarah Johnson',
      email: 'sarah@example.com',
      role: 'Doctor',
      status: 'Active',
      lastLogin: '2024-01-16'
    },
    {
      id: 3,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-16'
    }
  ]);

  const [reports] = useState([
    {
      id: 1,
      title: 'Monthly User Activity',
      type: 'User Analytics',
      generated: '2024-01-15',
      status: 'Ready'
    },
    {
      id: 2,
      title: 'Appointment Statistics',
      type: 'Healthcare Metrics',
      generated: '2024-01-10',
      status: 'Ready'
    }
  ]);

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
    { key: 'lastLogin', label: 'Last Login' }
  ];

  const reportColumns = [
    { key: 'title', label: 'Report Title' },
    { key: 'type', label: 'Type' },
    { key: 'generated', label: 'Generated' },
    { key: 'status', label: 'Status' }
  ];

  const tabs = [
    { id: 'users', label: 'User Management', icon: <Users size={16} /> },
    { id: 'roles', label: 'Role Assignments', icon: <UserCheck size={16} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">System administration and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <HealthCard variant="info" icon={<Users size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="success" icon={<UserCheck size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-muted-foreground">Active Doctors</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="warning" icon={<BarChart3 size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">456</div>
              <div className="text-sm text-muted-foreground">Monthly Sessions</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="default" icon={<Shield size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
          </HealthCard>
        </div>

        {/* Main Content */}
        <HealthCard>
          {/* Tab Navigation */}
          <div className="border-b border-border mb-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'users' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">User Management</h2>
                <HealthButton icon={<Plus size={16} />}>
                  Add New User
                </HealthButton>
              </div>
              <HealthTable
                data={users}
                columns={userColumns}
                searchable={true}
                pagination={true}
                actions={[
                  { label: 'Edit', icon: <Edit size={14} />, onClick: () => {} },
                  { label: 'Delete', icon: <Trash2 size={14} />, onClick: () => {}, variant: 'danger' }
                ]}
              />
            </div>
          )}

          {activeTab === 'roles' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Role Assignments</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <HealthCard variant="info">
                  <h3 className="font-semibold mb-4">Patients</h3>
                  <ul className="text-sm space-y-2">
                    <li>• View appointments</li>
                    <li>• Access health records</li>
                    <li>• Book consultations</li>
                    <li>• Track health metrics</li>
                  </ul>
                </HealthCard>
                
                <HealthCard variant="success">
                  <h3 className="font-semibold mb-4">Doctors</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Manage appointments</li>
                    <li>• Access patient records</li>
                    <li>• Conduct consultations</li>
                    <li>• Write prescriptions</li>
                  </ul>
                </HealthCard>
                
                <HealthCard variant="warning">
                  <h3 className="font-semibold mb-4">Administrators</h3>
                  <ul className="text-sm space-y-2">
                    <li>• Full system access</li>
                    <li>• User management</li>
                    <li>• System configuration</li>
                    <li>• Generate reports</li>
                  </ul>
                </HealthCard>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">System Reports</h2>
                <HealthButton icon={<Plus size={16} />}>
                  Generate Report
                </HealthButton>
              </div>
              <HealthTable
                data={reports}
                columns={reportColumns}
                searchable={true}
                pagination={true}
              />
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">System Settings</h2>
              <div className="space-y-6">
                <HealthCard>
                  <h3 className="font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Maintenance Mode</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User Registration</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                  </div>
                </HealthCard>
                
                <HealthCard>
                  <h3 className="font-semibold mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <HealthButton variant="outline">
                      Update Security Policies
                    </HealthButton>
                    <HealthButton variant="outline">
                      Backup Database
                    </HealthButton>
                    <HealthButton variant="outline">
                      View Audit Logs
                    </HealthButton>
                  </div>
                </HealthCard>
              </div>
            </div>
          )}
        </HealthCard>
      </div>
    </div>
  );
};

export default AdminPanel;
