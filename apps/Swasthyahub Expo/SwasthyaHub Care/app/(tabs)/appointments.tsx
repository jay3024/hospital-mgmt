import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Clock, MapPin, Search, Filter, Plus } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export default function AppointmentsScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [showBooking, setShowBooking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: '2024-01-15',
      time: '2:00 PM',
      location: 'City Hospital',
      type: 'In-person',
    },
    {
      id: 2,
      doctor: 'Dr. Michael Brown',
      specialty: 'General Physician',
      date: '2024-01-18',
      time: '10:30 AM',
      location: 'Video Call',
      type: 'Virtual',
    },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      rating: 4.8,
      location: 'City Hospital',
      available: '2:00 PM',
    },
    {
      id: 2,
      name: 'Dr. Michael Brown',
      specialty: 'General Physician',
      rating: 4.9,
      location: 'Health Center',
      available: '10:30 AM',
    },
  ];

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <View>
          <Text style={[styles.doctorName, { color: colors.text }]}>
            {appointment.doctor}
          </Text>
          <Text style={[styles.specialty, { color: colors.textSecondary }]}>
            {appointment.specialty}
          </Text>
        </View>
        <View style={[styles.typeChip, { backgroundColor: colors.accent }]}>
          <Text style={[styles.typeText, { color: colors.primary }]}>
            {appointment.type}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <Calendar size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {appointment.date}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {appointment.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {appointment.location}
          </Text>
        </View>
      </View>

      <View style={styles.appointmentActions}>
        <Button
          title="Reschedule"
          variant="outline"
          size="small"
          onPress={() => {}}
          style={styles.actionButton}
        />
        <Button
          title="Cancel"
          variant="secondary"
          size="small"
          onPress={() => {}}
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  const DoctorCard = ({ doctor }: { doctor: any }) => (
    <Card style={styles.doctorCard}>
      <View style={styles.doctorHeader}>
        <View>
          <Text style={[styles.doctorName, { color: colors.text }]}>
            {doctor.name}
          </Text>
          <Text style={[styles.specialty, { color: colors.textSecondary }]}>
            {doctor.specialty}
          </Text>
          <Text style={[styles.rating, { color: colors.warning }]}>
            ⭐ {doctor.rating}
          </Text>
        </View>
      </View>
      
      <View style={styles.doctorDetails}>
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {doctor.location}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            Next available: {doctor.available}
          </Text>
        </View>
      </View>

      <Button
        title="Book Appointment"
        onPress={() => setShowBooking(false)}
        style={styles.bookButton}
      />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Appointments</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowBooking(true)}
        >
          <Plus size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'upcoming' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'past' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'upcoming' ? (
          upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No past appointments
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book Appointment"
        size="large"
      >
        <View style={styles.bookingContent}>
          <Input
            placeholder="Search doctors or specialties"
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={20} color={colors.textSecondary} />}
            style={styles.searchInput}
          />
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color={colors.primary} />
            <Text style={[styles.filterText, { color: colors.primary }]}>Filters</Text>
          </TouchableOpacity>

          <ScrollView style={styles.doctorsList}>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </ScrollView>
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
  appointmentCard: {
    marginBottom: 16,
    padding: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  typeChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
  },
  bookingContent: {
    flex: 1,
  },
  searchInput: {
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    marginBottom: 16,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  doctorsList: {
    flex: 1,
  },
  doctorCard: {
    marginBottom: 16,
    padding: 16,
  },
  doctorHeader: {
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
  doctorDetails: {
    marginBottom: 16,
  },
  bookButton: {
    marginTop: 8,
  },
});