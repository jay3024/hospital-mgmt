import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Lock, Eye, EyeOff, User, Mail, KeyRound, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AlertModal } from '@/components/ui/AlertModal';
import { useAlertModal } from '@/hooks/useAlertModal';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { SEND_OTP, RESET_PASSWORD } from '@/helpers/api';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { alertState, hideAlert, showSuccess, showError } = useAlertModal();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const watchedPassword = watch('newPassword');

  const onSendOTP = async (data: any) => {
    try {
      setLoading(true);
      //here I am passing userType as patient, for doctor you should pass userType as doctor in doctor's app
      const response = await axios.post(SEND_OTP, { email: data.email , userType: 'patient'}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        setLoading(false);
        setCurrentStep(2);
      }else if (response.status === 400) {
        setLoading(false);
        showError(`${response.data.message}`, 'Please try again.');
      }
    } catch (e: any) {
      setLoading(false);
      showError(`${e.response.data.message}`, 'Please try again.');
    }
  };

  const onResetPassword = async (data: any) => {
    try {
      setLoading(true);
      const response = await axios.post(RESET_PASSWORD, {
        email: data.email,
        otpCode: data.otp,
        newPassword: data.newPassword,
        userType: 'patient'
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        setLoading(false);
        showSuccess(
          'Password Reset Successful!',
          'Your password has been reset successfully. You can now sign in.',
          {
            onConfirm: () => router.replace('/auth/login'),
            confirmText: 'Sign In'
          }
        );
      }else if (response.status === 400) {
        setLoading(false);
        showError(`${response.data.message}`, 'Please try again.');
      }
    } catch (e: any) {
      setLoading(false);
      showError(`${e.response.data.message}`, 'Please try again.');

    }
  };

  const goBackToStep1 = () => {
    setCurrentStep(1);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          {currentStep === 1 ? 'Forgot Password' : 'Reset Password'}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {currentStep === 1 
            ? 'Enter your email to receive a verification code'
            : 'Enter the code and your new password'
          }
        </Text>
      </View>

      {/* Step indicator */}
      <View style={styles.stepIndicator}>
        <View style={[styles.step, currentStep >= 1 && styles.activeStep]}>
          <Text style={[styles.stepNumber, { color: currentStep >= 1 ? colors.onPrimary : colors.textSecondary }]}>
            1
          </Text>
        </View>
        <View style={[styles.stepLine, { backgroundColor: currentStep >= 2 ? colors.primary : colors.border }]} />
        <View style={[styles.step, currentStep >= 2 && styles.activeStep]}>
          <Text style={[styles.stepNumber, { color: currentStep >= 2 ? colors.onPrimary : colors.textSecondary }]}>
            2
          </Text>
        </View>
      </View>

      <Card style={styles.formCard}>
        {currentStep === 1 ? (
          // Step 1: Send OTP
          <Controller
            control={control}
            name="email"
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email Address"
                placeholder="Enter your email address"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                icon={<Mail size={20} color={colors.textSecondary} />}
                error={errors.email?.message}
              />
            )}
          />
        ) : (
          // Step 2: Reset Password
          <>
            <Controller
              control={control}
              name="email"
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email Address"
                  placeholder="Enter your email address"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon={<Mail size={20} color={colors.textSecondary} />}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="otp"
              rules={{ 
                required: 'OTP is required',
                minLength: { value: 6, message: 'OTP must be at least 6 characters' }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Verification Code"
                  placeholder="Enter the 6-digit code"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  maxLength={6}
                  icon={<KeyRound size={20} color={colors.textSecondary} />}
                  error={errors.otp?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="newPassword"
              rules={{ 
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="New Password"
                  placeholder="Enter your new password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showPassword}
                  icon={<Lock size={20} color={colors.textSecondary} />}
                  trailingIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={colors.textSecondary} />
                      ) : (
                        <Eye size={20} color={colors.textSecondary} />
                      )}
                    </TouchableOpacity>
                  }
                  error={errors.newPassword?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{ 
                required: 'Please confirm your password',
                validate: (value) => value === watchedPassword || 'Passwords do not match'
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Confirm New Password"
                  placeholder="Confirm your new password"
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry={!showConfirmPassword}
                  icon={<Lock size={20} color={colors.textSecondary} />}
                  trailingIcon={
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} color={colors.textSecondary} />
                      ) : (
                        <Eye size={20} color={colors.textSecondary} />
                      )}
                    </TouchableOpacity>
                  }
                  error={errors.confirmPassword?.message}
                />
              )}
            />
          </>
        )}

        <Button
          title={currentStep === 1 ? "Send Verification Code" : "Reset Password"}
          onPress={handleSubmit(currentStep === 1 ? onSendOTP : onResetPassword)}
          style={styles.submitButton}
          disabled={loading}
        />

        {currentStep === 2 && (
          <TouchableOpacity style={styles.backToStep1} onPress={goBackToStep1}>
            <Text style={[styles.backToStep1Text, { color: colors.primary }]}>
              ← Back to step 1
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: colors.textSecondary }]}>
            Remember your password?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={[styles.loginLink, { color: colors.primary }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Card>

      {/* Loading Modal */}
      <Modal
        isVisible={loading}
        backdropOpacity={0.5}
        animationIn="fadeIn"
        animationOut="fadeOut"
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.surface }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.modalText, { color: colors.text }]}>
            {currentStep === 1 ? 'Sending verification code...' : 'Resetting password...'}
          </Text>
        </View>
      </Modal>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  step: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  activeStep: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  formCard: {
    padding: 24,
  },
  submitButton: {
    marginBottom: 24,
  },
  backToStep1: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  backToStep1Text: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  // Modal Styles
  modalContainer: {
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  modalButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
    marginTop: 8,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
