import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title?: string;
  onPress?: () => void; // Now optional
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode; 
}

export function Button({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  style,
  textStyle, 
  children
}: ButtonProps) {
  const { colors } = useTheme();

  const noop = () => {};

  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      ...styles.base,
    };

    const sizeStyles = {
      small: { paddingVertical: 8, paddingHorizontal: 16 },
      medium: { paddingVertical: 12, paddingHorizontal: 24 },
      large: { paddingVertical: 16, paddingHorizontal: 32 },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? colors.textSecondary : colors.primary,
      },
      secondary: {
        backgroundColor: disabled ? colors.border : colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled ? colors.textSecondary : colors.primary,
      },
    };

    return [baseStyle, sizeStyles[size], variantStyles[variant], style];
  };

  const getTextStyle = () => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
    };

    const variantTextStyles = {
      primary: { color: colors.secondary },
      secondary: { color: colors.text },
      outline: { color: disabled ? colors.textSecondary : colors.primary },
    };

    return [baseTextStyle, variantTextStyles[variant], textStyle];
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={disabled ? undefined : onPress || noop}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {children ? (
    children
  ) : (
    <Text style={getTextStyle()}>{title}</Text>
  )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
  },
});
