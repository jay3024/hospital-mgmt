import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  helperText?: string;
}

export function Input({
  label,
  error,
  icon,
  trailingIcon,
  helperText,
  style,
  ...props
}: InputProps) {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
          },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            { color: colors.text, flex: 1 },
            !!icon && styles.inputWithIcon,
            style,
          ]}
          placeholderTextColor={colors.textSecondary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {trailingIcon && (
          <View style={styles.trailingIconContainer}>{trailingIcon}</View>
        )}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
      {helperText && !error && (
        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    minHeight: 48,
    position: 'relative',
  },
  iconContainer: {
    paddingLeft: 12,
    paddingRight: 8,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  trailingIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
});
