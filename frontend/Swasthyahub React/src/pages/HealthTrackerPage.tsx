
import React, { useState } from 'react';
import HealthTracker from '../components/HealthTracker';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import { 
  Activity, 
  Heart, 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  Plus,
  Filter,
  Download,
  Share2,
  Bell,
  Settings
} from 'lucide-react';

const HealthTrackerPage = () => {
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [timeRange, setTimeRange] = useState('week');

  const healthMetrics = [
    {
      id: 'heart-rate',
      name: 'Heart Rate',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      trend: 'up',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'blood-pressure',
      name: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'steps',
      name: 'Steps Today',
      value: '8,432',
      unit: 'steps',
      status: 'good',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      value: '7.5',
      unit: 'hours',
      status: 'good',
      trend: 'stable',
      icon: <Calendar className="w-6 h-6 text-purple-500" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const goals = [
    {
      id: 1,
      title: 'Daily Steps',
      target: '10,000',
      current: '8,432',
      progress: 84,
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      id: 2,
      title: 'Water Intake',
      target: '8 glasses',
      current: '6 glasses',
      progress: 75,
      icon: <Target className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      id: 3,
      title: 'Sleep Hours',
      target: '8 hours',
      current: '7.5 hours',
      progress: 94,
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-purple-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Heart rate recorded',
      value: '72 bpm',
      time: '2 minutes ago',
      status: 'normal'
    },
    {
      id: 2,
      action: 'Blood pressure measured',
      value: '120/80 mmHg',
      time: '1 hour ago',
      status: 'normal'
    },
    {
      id: 3,
      action: 'Steps goal reached',
      value: '8,432 steps',
      time: '3 hours ago',
      status: 'achievement'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Health Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Monitor your health metrics and wellness goals
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <HealthButton variant="outline" size="sm" icon={<Bell size={16} />}>
                Reminders
              </HealthButton>
              <HealthButton variant="outline" size="sm" icon={<Settings size={16} />}>
                Settings
              </HealthButton>
              <HealthButton size="sm" icon={<Plus size={16} />}>
                Add Metric
              </HealthButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Health Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric) => (
            <HealthCard 
              key={metric.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.name}</p>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === 'normal' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {metric.status}
                    </span>
                    <TrendingUp className={`w-3 h-3 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center text-white`}>
                  {metric.icon}
                </div>
              </div>
            </HealthCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Health Tracker */}
          <div className="lg:col-span-2">
            <HealthCard className="shadow-lg border-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Health Analytics</h2>
                <div className="flex items-center space-x-3">
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  >
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                  <HealthButton variant="outline" size="sm" icon={<Download size={16} />}>
                    Export
                  </HealthButton>
                  <HealthButton variant="outline" size="sm" icon={<Share2 size={16} />}>
                    Share
                  </HealthButton>
                </div>
              </div>
              
              <div className="h-96">
                <HealthTracker />
              </div>
            </HealthCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Goals Progress */}
            <HealthCard>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Goals</h3>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center ${goal.color}`}>
                          {goal.icon}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{goal.title}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">{goal.progress}% complete</div>
                  </div>
                ))}
              </div>
            </HealthCard>

            {/* Recent Activities */}
            <HealthCard>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.status === 'normal' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.value}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </HealthCard>

            {/* Quick Actions */}
            <HealthCard>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <HealthButton fullWidth variant="outline" size="sm" icon={<Plus size={16} />}>
                  Record New Metric
                </HealthButton>
                <HealthButton fullWidth variant="outline" size="sm" icon={<Target size={16} />}>
                  Set New Goal
                </HealthButton>
                <HealthButton fullWidth variant="outline" size="sm" icon={<Bell size={16} />}>
                  Set Reminder
                </HealthButton>
                <HealthButton fullWidth variant="outline" size="sm" icon={<Download size={16} />}>
                  Download Report
                </HealthButton>
              </div>
            </HealthCard>

            {/* Health Tips */}
            <HealthCard>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Health Tip</h3>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Stay Active</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Regular physical activity can help improve your heart health and overall well-being. Aim for at least 150 minutes of moderate exercise per week.
                </p>
              </div>
            </HealthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrackerPage;
