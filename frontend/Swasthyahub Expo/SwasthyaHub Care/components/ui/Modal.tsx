import React from 'react';
import { 
  Modal as RNModal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from './Card';
import { StyleProp } from 'react-native';


interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export function Modal({ visible, onClose, title, children, size = 'medium' }: ModalProps) {
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { width: width * 0.8, maxHeight: height * 0.4 };
      case 'large':
        return { width: width * 0.95, maxHeight: height * 0.8 };
      default:
        return { width: width * 0.9, maxHeight: height * 0.6 };
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Card style={[styles.modal, getSizeStyle()]}>
          {title && (
            <View style={styles.header}>
              <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.content}>
            {children}
          </View>
        </Card>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  modal: {
    maxWidth: '95%',
    height: '100%',
    minHeight: '50%',
    marginHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1001,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
});