import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Package, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle, Plus, Search } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function PharmacyScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'orders'>('prescriptions');
  const [showOrderMedication, setShowOrderMedication] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const prescriptions = [
    {
      id: 1,
      medication: 'Lisinopril 10mg',
      prescribedBy: 'Dr. Sarah Johnson',
      dosage: '1 tablet daily',
      refillsLeft: 3,
      expiryDate: '2024-06-15',
      status: 'active',
    },
    {
      id: 2,
      medication: 'Metformin 500mg',
      prescribedBy: 'Dr. Michael Brown',
      dosage: '2 tablets daily',
      refillsLeft: 0,
      expiryDate: '2024-03-20',
      status: 'expired',
    },
  ];

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2024-001',
      medications: ['Lisinopril 10mg', 'Vitamin D3'],
      orderDate: '2024-01-12',
      status: 'delivered',
      total: '$45.99',
      deliveryDate: '2024-01-14',
    },
    {
      id: 2,
      orderNumber: 'ORD-2024-002',
      medications: ['Ibuprofen 400mg'],
      orderDate: '2024-01-10',
      status: 'shipped',
      total: '$12.50',
      estimatedDelivery: '2024-01-16',
    },
    {
      id: 3,
      orderNumber: 'ORD-2024-003',
      medications: ['Metformin 500mg'],
      orderDate: '2024-01-08',
      status: 'pending',
      total: '$28.00',
      estimatedDelivery: '2024-01-18',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'delivered':
        return colors.success;
      case 'shipped':
        return colors.primary;
      case 'pending':
        return colors.warning;
      case 'expired':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return CheckCircle;
      case 'shipped':
      case 'pending':
        return Clock;
      case 'expired':
        return AlertCircle;
      default:
        return Package;
    }
  };

  const PrescriptionCard = ({ prescription }: { prescription: any }) => (
    <Card style={styles.prescriptionCard}>
      <View style={styles.prescriptionHeader}>
        <View style={styles.prescriptionInfo}>
          <Text style={[styles.medicationName, { color: colors.text }]}>
            {prescription.medication}
          </Text>
          <Text style={[styles.prescribedBy, { color: colors.textSecondary }]}>
            Prescribed by {prescription.prescribedBy}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(prescription.status)}20` }]}>
          <Text style={[styles.statusText, { color: getStatusColor(prescription.status) }]}>
            {prescription.status}
          </Text>
        </View>
      </View>

      <View style={styles.prescriptionDetails}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Dosage:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{prescription.dosage}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Refills left:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{prescription.refillsLeft}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Expires:</Text>
          <Text style={[styles.detailValue, { color: colors.text }]}>{prescription.expiryDate}</Text>
        </View>
      </View>

      <View style={styles.prescriptionActions}>
        <Button
          title="Order Refill"
          variant={prescription.status === 'active' ? 'primary' : 'secondary'}
          size="small"
          onPress={() => {}}
          disabled={prescription.status !== 'active' || prescription.refillsLeft === 0}
          style={styles.actionButton}
        />
        <Button
          title="View Details"
          variant="outline"
          size="small"
          onPress={() => {}}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  const OrderCard = ({ order }: { order: any }) => {
    const StatusIcon = getStatusIcon(order.status);
    
    return (
      <Card style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View style={styles.orderInfo}>
            <Text style={[styles.orderNumber, { color: colors.text }]}>
              {order.orderNumber}
            </Text>
            <Text style={[styles.orderDate, { color: colors.textSecondary }]}>
              Ordered on {order.orderDate}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: `${getStatusColor(order.status)}20` }]}>
            <StatusIcon size={16} color={getStatusColor(order.status)} />
            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
              {order.status}
            </Text>
          </View>
        </View>

        <View style={styles.orderMedications}>
          <Text style={[styles.medicationsLabel, { color: colors.textSecondary }]}>Medications:</Text>
          {order.medications.map((med: string, index: number) => (
            <Text key={index} style={[styles.medicationItem, { color: colors.text }]}>
              • {med}
            </Text>
          ))}
        </View>

        <View style={styles.orderFooter}>
          <Text style={[styles.orderTotal, { color: colors.text }]}>Total: {order.total}</Text>
          <Text style={[styles.deliveryInfo, { color: colors.textSecondary }]}>
            {order.status === 'delivered' 
              ? `Delivered on ${order.deliveryDate}`
              : `Est. delivery: ${order.estimatedDelivery}`
            }
          </Text>
        </View>

        <Button
          title="Track Order"
          variant="outline"
          size="small"
          onPress={() => {}}
          style={styles.trackButton}
        />
      </Card>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Pharmacy</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowOrderMedication(true)}
        >
          <Plus size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'prescriptions' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('prescriptions')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'prescriptions' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Prescriptions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'orders' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('orders')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'orders' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'prescriptions' ? (
          prescriptions.map((prescription) => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
          ))
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </ScrollView>

      <Modal
        visible={showOrderMedication}
        onClose={() => setShowOrderMedication(false)}
        title="Order Medication"
        size="large"
      >
        <View style={styles.orderContent}>
          <Input
            placeholder="Search medications"
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={20} color={colors.textSecondary} />}
            style={styles.searchInput}
          />
          
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Medications</Text>
          
          <Card style={styles.medicationCard}>
            <Text style={[styles.medicationName, { color: colors.text }]}>Ibuprofen 400mg</Text>
            <Text style={[styles.medicationPrice, { color: colors.textSecondary }]}>$12.50</Text>
            <Button
              title="Add to Cart"
              size="small"
              onPress={() => {}}
              style={styles.addToCartButton}
            />
          </Card>

          <Card style={styles.medicationCard}>
            <Text style={[styles.medicationName, { color: colors.text }]}>Vitamin D3 1000IU</Text>
            <Text style={[styles.medicationPrice, { color: colors.textSecondary }]}>$18.99</Text>
            <Button
              title="Add to Cart"
              size="small"
              onPress={() => {}}
              style={styles.addToCartButton}
            />
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  prescriptionCard: {
    marginBottom: 16,
    padding: 16,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  prescriptionInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  prescribedBy: {
    fontSize: 14,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  prescriptionDetails: {
    marginBottom: 16,
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  prescriptionActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  orderCard: {
    marginBottom: 16,
    padding: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 14,
  },
  orderMedications: {
    marginBottom: 16,
  },
  medicationsLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  medicationItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  orderFooter: {
    marginBottom: 16,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  deliveryInfo: {
    fontSize: 14,
  },
  trackButton: {
    alignSelf: 'flex-start',
  },
  orderContent: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  medicationCard: {
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medicationPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
  addToCartButton: {
    minWidth: 100,
  },
});