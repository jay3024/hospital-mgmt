
import React, { useState } from 'react';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import HealthInput from '../components/ui/HealthInput';
import HealthTable from '../components/ui/HealthTable';
import { Pill, ShoppingCart, MapPin, Clock, FileText, Download } from 'lucide-react';

const PharmacyIntegration = () => {
  const [prescriptions] = useState([
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      prescriber: 'Dr. Sarah Johnson',
      quantity: '30 tablets',
      refills: '2 remaining',
      status: 'Ready for pickup'
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      prescriber: 'Dr. Michael Chen',
      quantity: '60 tablets',
      refills: '1 remaining',
      status: 'In progress'
    }
  ]);

  const [orderHistory] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-10',
      items: 'Lisinopril, Vitamin D',
      total: '$45.99',
      status: 'Delivered'
    },
    {
      id: 'ORD-002',
      date: '2024-01-05',
      items: 'Metformin',
      total: '$12.50',
      status: 'Picked up'
    }
  ]);

  const prescriptionColumns = [
    { key: 'medication', label: 'Medication' },
    { key: 'prescriber', label: 'Prescriber' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'refills', label: 'Refills' },
    { key: 'status', label: 'Status' }
  ];

  const orderColumns = [
    { key: 'id', label: 'Order ID' },
    { key: 'date', label: 'Date' },
    { key: 'items', label: 'Items' },
    { key: 'total', label: 'Total' },
    { key: 'status', label: 'Status' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Pharmacy Integration</h1>
          <p className="text-muted-foreground">Manage prescriptions and pharmacy orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <HealthCard variant="info" icon={<Pill size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-muted-foreground">Active Prescriptions</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="success" icon={<ShoppingCart size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Ready for Pickup</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="warning" icon={<Clock size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Refills Due Soon</div>
            </div>
          </HealthCard>
          
          <HealthCard variant="default" icon={<MapPin size={24} />}>
            <div className="text-center">
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Nearby Pharmacies</div>
            </div>
          </HealthCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Current Prescriptions */}
            <HealthCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Current Prescriptions</h2>
                <HealthButton size="sm" icon={<FileText size={16} />}>
                  Upload Prescription
                </HealthButton>
              </div>
              <HealthTable
                data={prescriptions}
                columns={prescriptionColumns}
                searchable={true}
                pagination={true}
              />
            </HealthCard>

            {/* Order History */}
            <HealthCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Order History</h2>
                <HealthButton size="sm" variant="outline" icon={<Download size={16} />}>
                  Download Report
                </HealthButton>
              </div>
              <HealthTable
                data={orderHistory}
                columns={orderColumns}
                searchable={true}
                pagination={true}
              />
            </HealthCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <HealthCard header="Quick Actions">
              <div className="space-y-3">
                <HealthButton fullWidth icon={<Pill size={16} />}>
                  Refill Prescription
                </HealthButton>
                <HealthButton fullWidth variant="outline" icon={<MapPin size={16} />}>
                  Find Pharmacy
                </HealthButton>
                <HealthButton fullWidth variant="outline" icon={<FileText size={16} />}>
                  Transfer Prescription
                </HealthButton>
                <HealthButton fullWidth variant="outline">
                  Set Reminders
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Pharmacy Information">
              <div className="space-y-3">
                <div className="p-3 border border-border rounded-lg">
                  <h4 className="font-medium">Main Pharmacy</h4>
                  <p className="text-sm text-muted-foreground">CVS Health Center</p>
                  <p className="text-sm text-muted-foreground">123 Main St, City</p>
                  <p className="text-sm text-muted-foreground">Open until 9 PM</p>
                </div>
                <HealthButton fullWidth size="sm" variant="outline">
                  Change Pharmacy
                </HealthButton>
              </div>
            </HealthCard>

            <HealthCard header="Prescription Reminders">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-warning/10 border border-warning/20 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Lisinopril</p>
                    <p className="text-xs text-muted-foreground">Due in 3 days</p>
                  </div>
                  <HealthButton size="sm" variant="warning">
                    Refill
                  </HealthButton>
                </div>
                <HealthButton fullWidth size="sm" variant="outline">
                  Manage Reminders
                </HealthButton>
              </div>
            </HealthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyIntegration;
