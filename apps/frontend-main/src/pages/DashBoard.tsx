import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HealthCard from '../components/ui/HealthCard';
import HealthButton from '../components/ui/HealthButton';
import { 
  Activity, 
  Calendar, 
  Heart, 
  Pill, 
  Video, 
  Brain, 
  TrendingUp, 
  Clock, 
  Bell, 
  User,
  FileText,
  Plus,
  ArrowRight,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = currentTime.getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, [currentTime]);

  const healthMetrics = [
    { 
      title: 'Heart Rate', 
      value: '72', 
      unit: 'bpm', 
      icon: <Heart className="w-6 h-6 text-red-500" />,
      status: 'normal',
      trend: 'up'
    },
    { 
      title: 'Blood Pressure', 
      value: '120/80', 
      unit: 'mmHg', 
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      status: 'normal',
      trend: 'stable'
    },
    { 
      title: 'Steps Today', 
      value: '8,432', 
      unit: 'steps', 
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      status: 'good',
      trend: 'up'
    },
    { 
      title: 'Sleep Quality', 
      value: '7.5', 
      unit: 'hours', 
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      status: 'good',
      trend: 'stable'
    }
  ];

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule with a doctor',
      icon: <Calendar className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      link: '/appointments'
    },
    {
      title: 'Video Consultation',
      description: 'Start a virtual visit',
      icon: <Video className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      link: '/consultation'
    },
    {
      title: 'Health Tracker',
      description: 'Monitor your metrics',
      icon: <Activity className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      link: '/health-tracker'
    },
    {
      title: 'Pharmacy',
      description: 'Manage prescriptions',
      icon: <Pill className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      link: '/pharmacy'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'In-Person',
      status: 'confirmed'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'Appointment booked',
      details: 'Dr. Sarah Johnson - Cardiology',
      time: '2 hours ago',
      icon: <Calendar className="w-4 h-4 text-blue-500" />
    },
    {
      id: 2,
      action: 'Prescription refilled',
      details: 'Lisinopril 10mg',
      time: '1 day ago',
      icon: <Pill className="w-4 h-4 text-green-500" />
    },
    {
      id: 3,
      action: 'Health report uploaded',
      details: 'Blood test results',
      time: '2 days ago',
      icon: <FileText className="w-4 h-4 text-purple-500" />
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
                {greeting}, John! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} • {currentTime.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Bell className="w-4 h-4" />
                <span>3 new notifications</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Health Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => (
            <HealthCard 
              key={index}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
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
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {metric.icon}
                </div>
              </div>
            </HealthCard>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <HealthCard>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Appointments</h2>
                <Link to="/appointments">
                  <HealthButton variant="outline" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </HealthButton>
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.doctor}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{appointment.specialty}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">{appointment.date} • {appointment.time}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            appointment.type === 'Video Call' 
                              ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 dark:text-green-400 capitalize">{appointment.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </HealthCard>
          </div>

          {/* Recent Activities */}
          <div>
            <HealthCard>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{activity.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </HealthCard>

            {/* Health Tips */}
            <HealthCard className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Health Tip of the Day</h2>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Stay Hydrated</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Drinking 8 glasses of water daily helps maintain optimal health and supports your body's natural functions.
                </p>
              </div>
            </HealthCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
