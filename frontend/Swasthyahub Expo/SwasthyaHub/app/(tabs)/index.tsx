import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Calendar, 
  Activity, 
  Brain, 
  Package, 
  Users, 
  Heart,
  Plus,
  TrendingUp 
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

export default function DashboardScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const quickActions = [
    { title: 'Book Appointment', icon: Calendar, route: '/appointments', color: colors.primary },
    { title: 'Track Health', icon: Activity, route: '/health', color: colors.success },
    { title: 'Mental Health', icon: Brain, route: '/mental-health', color: '#8B5CF6 ' },
    { title: 'Pharmacy', icon: Package, route: '/pharmacy', color: colors.warning },
  ];

  const stats = [
    { label: 'Next Appointment', value: 'Tomorrow 2:00 PM', icon: Calendar },
    { label: 'Weight Progress', value: '+2.5 kg', icon: TrendingUp },
    { label: 'Heart Rate', value: '72 bpm', icon: Heart },
    { label: 'Sleep Score', value: '85%', icon: Activity },
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Good morning</Text>
          <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
        </View>
        <TouchableOpacity style={[styles.notificationButton, { backgroundColor: colors.accent }]}>
          <Heart size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Card style={styles.summaryCard}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Health Summary</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <stat.icon size={20} color={colors.primary} />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </Card>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={() => router.push(action.route as any)}
          >
            <View style={[styles.actionIcon, { backgroundColor: `${action.color}20` }]}>
              <action.icon size={24} color={action.color} />
            </View>
            <Text style={[styles.actionTitle, { color: colors.text }]}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.recentCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: colors.success + '20' }]}>
            <Calendar size={16} color={colors.success} />
          </View>
          <View style={styles.activityContent}>
            <Text style={[styles.activityTitle, { color: colors.text }]}>
              Appointment with Dr. Smith
            </Text>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>
              2 hours ago
            </Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <View style={[styles.activityIcon, { backgroundColor: colors.primary + '20' }]}>
            <Activity size={16} color={colors.primary} />
          </View>
          <View style={styles.activityContent}>
            <Text style={[styles.activityTitle, { color: colors.text }]}>
              Weight logged: 72.5 kg
            </Text>
            <Text style={[styles.activityTime, { color: colors.textSecondary }]}>
              This morning
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  recentCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
});