import { useState } from 'react';
import { AlertType } from '@/components/ui/AlertModal';

interface AlertModalState {
  visible: boolean;
  type: AlertType;
  title: string;
  message: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}

export function useAlertModal() {
  const [alertState, setAlertState] = useState<AlertModalState>({
    visible: false,
    type: 'success',
    title: '',
    message: '',
  });

  const showAlert = (
    type: AlertType,
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void;
      confirmText?: string;
      cancelText?: string;
      showCancel?: boolean;
    }
  ) => {
    setAlertState({
      visible: true,
      type,
      title,
      message,
      onConfirm: options?.onConfirm,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      showCancel: options?.showCancel,
    });
  };

  const hideAlert = () => {
    setAlertState(prev => ({ ...prev, visible: false }));
  };

  const showSuccess = (
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void;
      confirmText?: string;
    }
  ) => {
    showAlert('success', title, message, options);
  };

  const showWarning = (
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void;
      confirmText?: string;
      cancelText?: string;
      showCancel?: boolean;
    }
  ) => {
    showAlert('warning', title, message, options);
  };

  const showError = (
    title: string,
    message: string,
    options?: {
      onConfirm?: () => void;
      confirmText?: string;
    }
  ) => {
    showAlert('error', title, message, options);
  };

  return {
    alertState,
    showAlert,
    hideAlert,
    showSuccess,
    showWarning,
    showError,
  };
}
