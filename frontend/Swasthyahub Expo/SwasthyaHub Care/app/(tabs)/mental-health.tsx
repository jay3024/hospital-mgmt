import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Calendar, BookOpen, Heart, Clock, Star } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function MentalHealthScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'sessions' | 'resources'>('sessions');
  const [showBooking, setShowBooking] = useState(false);

  const therapists = [
    {
      id: 1,
      name: 'Dr. Emily Watson',
      specialty: 'Anxiety & Depression',
      rating: 4.9,
      experience: '8 years',
      nextAvailable: 'Tomorrow 3:00 PM',
    },
    {
      id: 2,
      name: 'Dr. James Miller',
      specialty: 'Stress Management',
      rating: 4.8,
      experience: '6 years',
      nextAvailable: 'Today 7:00 PM',
    },
  ];

  const pastSessions = [
    {
      id: 1,
      therapist: 'Dr. Emily Watson',
      date: '2024-01-10',
      duration: '50 minutes',
      notes: 'Discussed stress management techniques',
    },
    {
      id: 2,
      therapist: 'Dr. James Miller',
      date: '2024-01-03',
      duration: '45 minutes',
      notes: 'Cognitive behavioral therapy session',
    },
  ];

  const resources = [
    {
      id: 1,
      title: 'Mindfulness Meditation',
      description: 'Learn basic meditation techniques for stress relief',
      duration: '10 min read',
      category: 'Meditation',
    },
    {
      id: 2,
      title: 'Breathing Exercises',
      description: 'Simple breathing techniques for anxiety management',
      duration: '5 min read',
      category: 'Breathing',
    },
    {
      id: 3,
      title: 'Sleep Hygiene Tips',
      description: 'Improve your sleep quality for better mental health',
      duration: '8 min read',
      category: 'Sleep',
    },
  ];

  const TherapistCard = ({ therapist }: { therapist: any }) => (
    <Card style={styles.therapistCard}>
      <View style={styles.therapistHeader}>
        <View>
          <Text style={[styles.therapistName, { color: colors.text }]}>
            {therapist.name}
          </Text>
          <Text style={[styles.specialty, { color: colors.textSecondary }]}>
            {therapist.specialty}
          </Text>
          <View style={styles.therapistMeta}>
            <Star size={14} color={colors.warning} fill={colors.warning} />
            <Text style={[styles.rating, { color: colors.text }]}>{therapist.rating}</Text>
            <Text style={[styles.experience, { color: colors.textSecondary }]}>
              • {therapist.experience}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.availabilityRow}>
        <Clock size={16} color={colors.textSecondary} />
        <Text style={[styles.availability, { color: colors.textSecondary }]}>
          Next available: {therapist.nextAvailable}
        </Text>
      </View>

      <Button
        title="Book Session"
        onPress={() => setShowBooking(false)}
        style={styles.bookSessionButton}
      />
    </Card>
  );

  const SessionCard = ({ session }: { session: any }) => (
    <Card style={styles.sessionCard}>
      <View style={styles.sessionHeader}>
        <Text style={[styles.therapistName, { color: colors.text }]}>
          {session.therapist}
        </Text>
        <Text style={[styles.sessionDate, { color: colors.textSecondary }]}>
          {session.date}
        </Text>
      </View>
      <View style={styles.sessionDetails}>
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.textSecondary} />
          <Text style={[styles.detailText, { color: colors.textSecondary }]}>
            {session.duration}
          </Text>
        </View>
        <Text style={[styles.sessionNotes, { color: colors.text }]}>
          {session.notes}
        </Text>
      </View>
    </Card>
  );

  const ResourceCard = ({ resource }: { resource: any }) => (
    <Card style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <View style={[styles.categoryBadge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.categoryText, { color: colors.primary }]}>
            {resource.category}
          </Text>
        </View>
        <Text style={[styles.duration, { color: colors.textSecondary }]}>
          {resource.duration}
        </Text>
      </View>
      <Text style={[styles.resourceTitle, { color: colors.text }]}>
        {resource.title}
      </Text>
      <Text style={[styles.resourceDescription, { color: colors.textSecondary }]}>
        {resource.description}
      </Text>
      <Button
        title="Read More"
        variant="outline"
        size="small"
        onPress={() => {}}
        style={styles.readButton}
      />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Mental Health</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowBooking(true)}
        >
          <Calendar size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <Card style={styles.moodCard}>
        <View style={styles.moodHeader}>
          <Heart size={24} color={colors.primary} />
          <Text style={[styles.moodTitle, { color: colors.text }]}>How are you feeling today?</Text>
        </View>
        <View style={styles.moodOptions}>
          {['😊', '😐', '😔', '😟', '😤'].map((emoji, index) => (
            <TouchableOpacity key={index} style={styles.moodOption}>
              <Text style={styles.moodEmoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'sessions' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('sessions')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'sessions' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Sessions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'resources' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('resources')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'resources' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Resources
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'sessions' ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Past Sessions</Text>
            {pastSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Self-Care Resources</Text>
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </>
        )}
      </ScrollView>

      <Modal
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book Therapy Session"
        size="large"
      >
        <ScrollView style={styles.bookingContent}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Therapists</Text>
          {therapists.map((therapist) => (
            <TherapistCard key={therapist.id} therapist={therapist} />
          ))}
        </ScrollView>
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
  moodCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    padding: 20,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  moodOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  moodEmoji: {
    fontSize: 24,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  therapistCard: {
    marginBottom: 16,
    padding: 16,
  },
  therapistHeader: {
    marginBottom: 12,
  },
  therapistName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  therapistMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  experience: {
    fontSize: 14,
    marginLeft: 4,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  availability: {
    fontSize: 14,
    marginLeft: 8,
  },
  bookSessionButton: {
    marginTop: 8,
  },
  sessionCard: {
    marginBottom: 16,
    padding: 16,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionDate: {
    fontSize: 14,
  },
  sessionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  sessionNotes: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  resourceCard: {
    marginBottom: 16,
    padding: 16,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  duration: {
    fontSize: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  resourceDescription: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  readButton: {
    alignSelf: 'flex-start',
  },
  bookingContent: {
    flex: 1,
  },
});