import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SplashScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View 
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <Heart size={80} color={colors.secondary} strokeWidth={2} fill={colors.secondary} />
        <Text style={[styles.title, { color: colors.secondary }]}>HealthCare+</Text>
        <Text style={[styles.subtitle, { color: colors.secondary }]}>Your Wellness Companion</Text>
      </Animated.View>
      
      <Animated.View style={[styles.pulseContainer, { opacity: fadeAnim }]}>
        <View style={[styles.pulse, { backgroundColor: colors.secondary }]} />
        <View style={[styles.pulse, styles.pulse2, { backgroundColor: colors.secondary }]} />
        <View style={[styles.pulse, styles.pulse3, { backgroundColor: colors.secondary }]} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    opacity: 0.9,
  },
  pulseContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  pulse: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginHorizontal: 2,
    opacity: 0.6,
  },
  pulse2: {
    height: 60,
    opacity: 0.8,
  },
  pulse3: {
    height: 30,
    opacity: 0.4,
  },
});