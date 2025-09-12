import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Modal } from './Modal';

export type AlertType = 'success' | 'warning' | 'error';

interface AlertModalProps {
  visible: boolean;
  onClose: () => void;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export function AlertModal({
  visible,
  onClose,
  type,
  title,
  message,
  onConfirm,
  confirmText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
}: AlertModalProps) {
  const { colors } = useTheme();

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: colors.success,
          borderColor: colors.success,
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: colors.warning,
          borderColor: colors.warning,
        };
      case 'error':
        return {
          icon: XCircle,
          iconColor: colors.error,
          borderColor: colors.error,
        };
    }
  };

  const config = getAlertConfig();
  const IconComponent = config.icon;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose} size="small">
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        <View style={[
          styles.iconContainer, 
          { 
            borderColor: config.borderColor, 
            backgroundColor: `${config.iconColor}20` // Changed from 15 to 20 for better visibility
          }
        ]}>
          <IconComponent size={32} color={config.iconColor} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
        
        <View style={styles.buttonContainer}>
          {showCancel && (
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
            >
              <Text style={[styles.buttonText, { color: colors.textSecondary }]}>
                {cancelText}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[
              styles.button,
              styles.confirmButton,
              { backgroundColor: config.iconColor },
              !showCancel && styles.singleButton
            ]}
            onPress={handleConfirm}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
              {confirmText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        borderRadius: 12,
        minWidth: 280,
        maxWidth: 320,
        height: 350,
        alignSelf: 'center', // Changed from 'flex-start' to 'center'
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        position: 'absolute',
        top: -100
      },
      
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between', // Better button spacing
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    flex: 1,
    marginHorizontal: 6, // Added margin for spacing
  },
  cancelButton: {
    borderWidth: 1,
    marginRight: 6,
  },
  confirmButton: {
    marginLeft: 6,
  },
  singleButton: {
    marginHorizontal: 0, // No margin when it's the only button
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
