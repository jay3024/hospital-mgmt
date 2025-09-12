import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react-native';

interface SelectProps extends Omit<React.ComponentProps<typeof RNPickerSelect>, 'onValueChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  onValueChange: (value: any) => void;
  value: any;
}

export function Select({
  label,
  error,
  helperText,
  icon,
  value,
  onValueChange,
  items,
  placeholder,
  ...props
}: SelectProps) {
  const { colors, isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handlePress = () => {
    if (props.onOpen) {
      props.onOpen();
    }
    setIsFocused(true);
  };

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handlePress}
        style={[
          styles.selectContainer,
          {
            backgroundColor: isDark ? colors.surface : colors.background,
            borderColor: error
              ? colors.error
              : isFocused
              ? colors.primary
              : colors.border,
          },
        ]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <RNPickerSelect
          onValueChange={(val) => {
            onValueChange(val);
            setIsFocused(false);
          }}
          items={items}
          value={value}
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
          placeholder={
            placeholder ?? { label: 'Select an option...', value: null }
          }
          style={{
            inputIOS: [
              styles.input,
              { color: colors.text },
              !!icon && styles.inputWithIcon,
            ],
            inputAndroid: [
              styles.input,
              { color: colors.text },
              !!icon && styles.inputWithIcon,
            ],
            placeholder: {
              color: colors.textSecondary,
            },
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => null}
          {...props}
        />
        <ChevronDown
          size={20}
          color={colors.textSecondary}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>
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
  selectContainer: {
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
    paddingRight: 30, // Make room for the chevron icon
    flex: 1,
  },
  inputWithIcon: {
    paddingLeft: 8,
  },
  chevronIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -10 }],
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
