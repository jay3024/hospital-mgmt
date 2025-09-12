
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Heart, Activity, Moon, TrendingUp, Calendar } from 'lucide-react';
import HealthCard from './ui/HealthCard';
import HealthButton from './ui/HealthButton';
import HealthInput from './ui/HealthInput';

interface HealthTrackerProps {
  className?: string;
}

const HealthTracker: React.FC<HealthTrackerProps> = ({ className = '' }) => {
  const [activeMetric, setActiveMetric] = useState<'weight' | 'steps' | 'sleep' | 'heart'>('weight');
  
  // Sample data
  const weightData = [
    { date: '2024-01-01', value: 75 },
    { date: '2024-01-08', value: 74.5 },
    { date: '2024-01-15', value: 74.2 },
    { date: '2024-01-22', value: 73.8 },
    { date: '2024-01-29', value: 73.5 },
  ];

  const stepsData = [
    { date: '2024-01-01', value: 8500 },
    { date: '2024-01-02', value: 10200 },
    { date: '2024-01-03', value: 9800 },
    { date: '2024-01-04', value: 12500 },
    { date: '2024-01-05', value: 11200 },
    { date: '2024-01-06', value: 9500 },
    { date: '2024-01-07', value: 13200 },
  ];

  const sleepData = [
    { date: '2024-01-01', deep: 2.5, light: 4.5, rem: 1.5 },
    { date: '2024-01-02', deep: 2.2, light: 5.1, rem: 1.3 },
    { date: '2024-01-03', deep: 2.8, light: 4.2, rem: 1.7 },
    { date: '2024-01-04', deep: 2.1, light: 4.8, rem: 1.4 },
    { date: '2024-01-05', deep: 2.6, light: 4.6, rem: 1.6 },
  ];

  const heartRateData = [
    { time: '6:00', resting: 65, active: 85 },
    { time: '9:00', resting: 68, active: 110 },
    { time: '12:00', resting: 70, active: 95 },
    { time: '15:00', resting: 72, active: 120 },
    { time: '18:00', resting: 69, active: 105 },
    { time: '21:00', resting: 66, active: 88 },
  ];

  const pieColors = ['#0066CC', '#10B981', '#F59E0B', '#EF4444'];

  const renderChart = () => {
    switch (activeMetric) {
      case 'weight':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#0066CC" 
                strokeWidth={3}
                dot={{ fill: '#0066CC', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'steps':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stepsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'sleep':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sleepData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="deep" stackId="a" fill="#0066CC" />
              <Bar dataKey="light" stackId="a" fill="#10B981" />
              <Bar dataKey="rem" stackId="a" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'heart':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="resting" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Resting HR"
              />
              <Line 
                type="monotone" 
                dataKey="active" 
                stroke="#EF4444" 
                strokeWidth={2}
                name="Active HR"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  const getMetricData = () => {
    switch (activeMetric) {
      case 'weight':
        return { current: '73.5 kg', change: '-1.5 kg', trend: 'down' };
      case 'steps':
        return { current: '10,847', change: '+1,247', trend: 'up' };
      case 'sleep':
        return { current: '7.8 hrs', change: '+0.3 hrs', trend: 'up' };
      case 'heart':
        return { current: '68 bpm', change: '-2 bpm', trend: 'down' };
      default:
        return { current: '0', change: '0', trend: 'stable' };
    }
  };

  const metricData = getMetricData();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <HealthCard
          className={`cursor-pointer transition-all ${activeMetric === 'weight' ? 'ring-2 ring-primary' : ''}`}
          hoverable
          onClick={() => setActiveMetric('weight')}
          icon={<TrendingUp className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Weight</p>
            <p className="text-2xl font-bold">73.5 kg</p>
            <p className="text-sm text-success">-1.5 kg this month</p>
          </div>
        </HealthCard>

        <HealthCard
          className={`cursor-pointer transition-all ${activeMetric === 'steps' ? 'ring-2 ring-primary' : ''}`}
          hoverable
          onClick={() => setActiveMetric('steps')}
          icon={<Activity className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Steps Today</p>
            <p className="text-2xl font-bold">10,847</p>
            <p className="text-sm text-success">Goal: 10,000</p>
          </div>
        </HealthCard>

        <HealthCard
          className={`cursor-pointer transition-all ${activeMetric === 'sleep' ? 'ring-2 ring-primary' : ''}`}
          hoverable
          onClick={() => setActiveMetric('sleep')}
          icon={<Moon className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Sleep</p>
            <p className="text-2xl font-bold">7.8 hrs</p>
            <p className="text-sm text-info">Good quality</p>
          </div>
        </HealthCard>

        <HealthCard
          className={`cursor-pointer transition-all ${activeMetric === 'heart' ? 'ring-2 ring-primary' : ''}`}
          hoverable
          onClick={() => setActiveMetric('heart')}
          icon={<Heart className="w-5 h-5" />}
        >
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Heart Rate</p>
            <p className="text-2xl font-bold">68 bpm</p>
            <p className="text-sm text-success">Resting</p>
          </div>
        </HealthCard>
      </div>

      {/* Main Chart */}
      <HealthCard header={`${activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)} Trends`} padding="lg">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-primary">{metricData.current}</div>
              <div className={`flex items-center space-x-1 text-sm ${
                metricData.trend === 'up' ? 'text-success' : 
                metricData.trend === 'down' ? 'text-warning' : 'text-muted-foreground'
              }`}>
                <TrendingUp className={`w-4 h-4 ${metricData.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{metricData.change}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <HealthButton variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 7 days
              </HealthButton>
            </div>
          </div>
          
          {renderChart()}
        </div>
      </HealthCard>

      {/* Data Entry */}
      <HealthCard header="Log New Entry" padding="lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <HealthInput
            label="Weight (kg)"
            type="number"
            placeholder="75.0"
          />
          <HealthInput
            label="Steps"
            type="number"
            placeholder="10000"
          />
          <HealthInput
            label="Sleep (hours)"
            type="number"
            placeholder="8.0"
            step="0.1"
          />
          <div className="flex items-end">
            <HealthButton variant="primary" fullWidth>
              Log Entry
            </HealthButton>
          </div>
        </div>
      </HealthCard>
    </div>
  );
};

export default HealthTracker;
