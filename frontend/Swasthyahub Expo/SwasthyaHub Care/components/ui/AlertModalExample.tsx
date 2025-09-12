import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { AlertModal } from './AlertModal';
import { useAlertModal } from '@/hooks/useAlertModal';

export function AlertModalExample() {
  const { alertState, hideAlert, showSuccess, showWarning, showError } = useAlertModal();

  const handleShowSuccess = () => {
    showSuccess(
      'Success!',
      'Your action was completed successfully.',
      {
        onConfirm: () => console.log('Success confirmed'),
        confirmText: 'Great!'
      }
    );
  };

  const handleShowWarning = () => {
    showWarning(
      'Warning',
      'Are you sure you want to proceed? This action cannot be undone.',
      {
        onConfirm: () => console.log('Warning confirmed'),
        confirmText: 'Proceed',
        cancelText: 'Cancel',
        showCancel: true
      }
    );
  };

  const handleShowError = () => {
    showError(
      'Error',
      'Something went wrong. Please try again.',
      {
        onConfirm: () => console.log('Error acknowledged'),
        confirmText: 'OK'
      }
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Show Success Modal" onPress={handleShowSuccess} />
      <Button title="Show Warning Modal" onPress={handleShowWarning} />
      <Button title="Show Error Modal" onPress={handleShowError} />

      {/* Alert Modal */}
      <AlertModal
        visible={alertState.visible}
        onClose={hideAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={alertState.onConfirm}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        showCancel={alertState.showCancel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
});
