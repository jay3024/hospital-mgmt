import { Tabs } from 'expo-router';
import { Heart, Calendar, Activity, Brain, Package, User } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { colors, isDark } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 88,
          elevation: isDark ? 0 : 8,
          shadowColor: isDark ? 'transparent' : '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: isDark ? 0 : 0.1,
          shadowRadius: isDark ? 0 : 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
          color: colors.textSecondary,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ size, color }) => (
            <Heart size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments"
        options={{
          title: 'Appointments',
          tabBarIcon: ({ size, color }) => (
            <Calendar size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ size, color }) => (
            <Activity size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="mental-health"
        options={{
          title: 'Mental Health',
          tabBarIcon: ({ size, color }) => (
            <Brain size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="pharmacy"
        options={{
          title: 'Pharmacy',
          tabBarIcon: ({ size, color }) => (
            <Package size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}