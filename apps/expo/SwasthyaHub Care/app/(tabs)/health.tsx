import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Activity, TrendingUp, Plus, Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

const { width } = Dimensions.get('window');

export default function HealthScreen() {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'logs'>('overview');
  const [showAddLog, setShowAddLog] = useState(false);
  const [logData, setLogData] = useState({
    weight: '',
    steps: '',
    sleep: '',
  });

  const healthMetrics = [
    { label: 'Weight', value: '72.5 kg', change: '+0.5', icon: TrendingUp, color: colors.primary },
    { label: 'Steps', value: '8,542', change: '+1,200', icon: Activity, color: colors.success },
    { label: 'Sleep', value: '7h 30m', change: '+30m', icon: Calendar, color: '#059669' },
    { label: 'Heart Rate', value: '72 bpm', change: '-2', icon: Activity, color: colors.error },
  ];

  const recentLogs = [
    { date: '2024-01-14', weight: '72.5', steps: '8542', sleep: '7.5' },
    { date: '2024-01-13', weight: '72.0', steps: '7342', sleep: '7.0' },
    { date: '2024-01-12', weight: '71.8', steps: '9123', sleep: '8.0' },
    { date: '2024-01-11', weight: '72.2', steps: '6897', sleep: '6.5' },
  ];

  const MetricCard = ({ metric }: { metric: any }) => (
    <Card style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIcon, { backgroundColor: `${metric.color}20` }]}>
          <metric.icon size={20} color={metric.color} />
        </View>
        <Text style={[styles.metricChange, 
          { color: metric.change.startsWith('+') ? colors.success : colors.error }
        ]}>
          {metric.change}
        </Text>
      </View>
      <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
      <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{metric.label}</Text>
    </Card>
  );

  const LogItem = ({ log }: { log: any }) => (
    <Card style={styles.logCard}>
      <View style={styles.logHeader}>
        <Text style={[styles.logDate, { color: colors.text }]}>{log.date}</Text>
      </View>
      <View style={styles.logMetrics}>
        <View style={styles.logMetric}>
          <Text style={[styles.logValue, { color: colors.text }]}>{log.weight} kg</Text>
          <Text style={[styles.logLabel, { color: colors.textSecondary }]}>Weight</Text>
        </View>
        <View style={styles.logMetric}>
          <Text style={[styles.logValue, { color: colors.text }]}>{log.steps}</Text>
          <Text style={[styles.logLabel, { color: colors.textSecondary }]}>Steps</Text>
        </View>
        <View style={styles.logMetric}>
          <Text style={[styles.logValue, { color: colors.text }]}>{log.sleep}h</Text>
          <Text style={[styles.logLabel, { color: colors.textSecondary }]}>Sleep</Text>
        </View>
      </View>
    </Card>
  );

  const handleAddLog = () => {
    // Add log logic would go here
    setShowAddLog(false);
    setLogData({ weight: '', steps: '', sleep: '' });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Health Tracker</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddLog(true)}
        >
          <Plus size={24} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'overview' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('overview')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'overview' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'logs' && { backgroundColor: colors.primary },
          ]}
          onPress={() => setActiveTab('logs')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'logs' ? colors.secondary : colors.textSecondary },
            ]}
          >
            Daily Logs
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'overview' ? (
          <>
            <View style={styles.metricsGrid}>
              {healthMetrics.map((metric, index) => (
                <MetricCard key={index} metric={metric} />
              ))}
            </View>

            <Card style={styles.chartCard}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>Weight Trend</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={[styles.chartText, { color: colors.textSecondary }]}>
                  Chart visualization would go here
                </Text>
                <Text style={[styles.chartSubtext, { color: colors.textSecondary }]}>
                  7-day weight progress
                </Text>
              </View>
            </Card>

            <Card style={styles.chartCard}>
              <Text style={[styles.chartTitle, { color: colors.text }]}>Activity Overview</Text>
              <View style={styles.chartPlaceholder}>
                <Text style={[styles.chartText, { color: colors.textSecondary }]}>
                  Steps & Sleep Chart
                </Text>
                <Text style={[styles.chartSubtext, { color: colors.textSecondary }]}>
                  Weekly activity summary
                </Text>
              </View>
            </Card>
          </>
        ) : (
          <View style={styles.logsContainer}>
            {recentLogs.map((log, index) => (
              <LogItem key={index} log={log} />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        visible={showAddLog}
        onClose={() => setShowAddLog(false)}
        title="Add Health Log"
      >
        <View style={styles.addLogContent}>
          <Input
            label="Weight (kg)"
            placeholder="Enter your weight"
            value={logData.weight}
            onChangeText={(value) => setLogData(prev => ({ ...prev, weight: value }))}
            keyboardType="numeric"
          />

          <Input
            label="Steps"
            placeholder="Enter your steps count"
            value={logData.steps}
            onChangeText={(value) => setLogData(prev => ({ ...prev, steps: value }))}
            keyboardType="numeric"
          />

          <Input
            label="Sleep Hours"
            placeholder="Enter sleep duration"
            value={logData.sleep}
            onChangeText={(value) => setLogData(prev => ({ ...prev, sleep: value }))}
            keyboardType="numeric"
          />

          <Button
            title="Add Log"
            onPress={handleAddLog}
            style={styles.addLogButton}
          />
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    width: (width - 60) / 2,
    padding: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
  },
  chartCard: {
    marginBottom: 24,
    padding: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5E7EB',
  },
  chartText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  chartSubtext: {
    fontSize: 12,
  },
  logsContainer: {
    gap: 16,
  },
  logCard: {
    padding: 16,
  },
  logHeader: {
    marginBottom: 12,
  },
  logDate: {
    fontSize: 16,
    fontWeight: '600',
  },
  logMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logMetric: {
    alignItems: 'center',
  },
  logValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  logLabel: {
    fontSize: 12,
  },
  addLogContent: {
    paddingTop: 16,
  },
  addLogButton: {
    marginTop: 24,
  },
});