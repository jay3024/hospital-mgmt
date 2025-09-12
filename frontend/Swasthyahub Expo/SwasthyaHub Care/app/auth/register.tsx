import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Droplets,
  Map,
  MapIcon,
  MapPin,
  User2,
  UserCog,
  Bug,
  EyeOff,
  Eye,
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AlertModal } from '@/components/ui/AlertModal';
import { useAlertModal } from '@/hooks/useAlertModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { REGISTER } from '@/helpers/api';

import { useEffect } from 'react';
import { DateInput } from '@/components/ui/DateInput';
import { Select } from '@/components/ui/Select';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RegisterScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { alertState, hideAlert, showSuccess, showError } = useAlertModal();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      PhoneNumber: '',
      city: '',
      state: '',
      gender: '',
      pincode: '',
      AadhaarNumber: '',
      password: '',
      confirmPassword: '',

      DateOfBirth: '',
      WeightInKg: '',
      HeightInCm: '',
      bloodGroup: '',
      knownAllergies: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      addressLine1: '',
      addressLine2: '',
    },
  });

  const passwordValue = watch('password');

  // Function to format date to ISO string
  const formatDateForAPI = (dateString: string) => {
    if (!dateString) return '';

    // If it's already in ISO format, return as is
    if (dateString.includes('T')) return dateString;

    // Convert DD/MM/YYYY or similar formats to ISO
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Try parsing DD/MM/YYYY format
      const parts = dateString.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        const isoDate = new Date(
          parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
        return isoDate.toISOString();
      }
      return dateString;
    }
    return date.toISOString();
  };

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    console.log('Original data:', data);

    try {
      setLoading(true);

      // Format the data according to backend requirements
      const formattedData = {
        dto: {
          ...data,
          DateOfBirth: formatDateForAPI(data.DateOfBirth),
          WeightInKg: parseFloat(data.WeightInKg) || 0,
          HeightInCm: parseFloat(data.HeightInCm) || 0,

          confirmPassword: undefined,
        },
      };

      // Remove undefined fields
      delete formattedData.dto.confirmPassword;

      console.log('Formatted data being sent:', formattedData);

      const respRegister = await axios.post(REGISTER, formattedData.dto, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Register response:', respRegister.data);

      if (respRegister.data == 'Registration successful') {
        setLoading(false);
        showSuccess(
          'Registration Successful!',
          'Your account has been created successfully. You can now sign in.',
          {
            onConfirm: () => router.replace('/auth/login'),
            confirmText: 'Sign In'
          }
        );
      }
    } catch (error: any) {
      console.log('Register error:', error);
      setLoading(false);

      let errorTitle = 'Registration Failed';
      let errorMessage = 'Something went wrong. Please try again.';

      if (error.response) {
        console.log('Error response:', error.response.data);

        switch (error.response.status) {
          case 400:
            errorMessage = 'Please check all fields and try again.';

            // Handle specific validation errors
            if (error.response.data?.errors) {
              const errors = error.response.data.errors;
              const errorKeys = Object.keys(errors);
              if (errorKeys.length > 0) {
                const firstError = errors[errorKeys[0]][0];
                errorMessage = firstError || errorMessage;
              }
            }
            break;
          case 409:
            errorMessage =
              'An account with this email or username already exists.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage =
              error.response.data?.message ||
              'Registration failed. Please try again.';
        }
      } else if (error.request) {
        errorTitle = 'Connection Error';
        errorMessage =
          'Unable to connect to the server. Please check your internet connection.';
      }

      showError(errorTitle, errorMessage);
    }
  };

  const insets = useSafeAreaInsets();

  const genderOptions = [
    // { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleRegister = () => {
    // Basic validation would go here
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={['top', 'bottom']} // ✅ This ensures both top and bottom insets are respected
    >
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: insets.bottom + 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join our healthcare community
          </Text>
        </View>

        <Card style={styles.formCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Information
          </Text>

          <Controller
            control={control}
            name="username"
            rules={{ required: 'Username is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Username"
                placeholder="Enter your username"
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                autoCapitalize="none"
                icon={<User size={20} color={colors.textSecondary} />}
                error={errors.username?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            rules={{ required: 'Gender is required' }}
            render={({ field: { onChange, value } }) => (
              <Select
                label="Gender"
                value={value}
                onValueChange={onChange}
                items={genderOptions}
                error={errors.gender?.message}
                placeholder={{ label: 'Select Gender', value: null }}
              />
            )}
          />

          <Controller
            control={control}
            name="fullName"
            rules={{ required: 'Full Name is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                value={value}
                onChangeText={onChange}
                icon={<User size={20} color={colors.textSecondary} />}
                error={errors.fullName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
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
            name="PhoneNumber"
            rules={{
              required: 'Phone number is required',
              pattern: { value: /^\d{10}$/, message: 'Invalid phone number' },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                icon={<Phone size={20} color={colors.textSecondary} />}
                error={errors.PhoneNumber?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            rules={{
              required: 'City is required',
              pattern: { value: /^[a-zA-Z\s]+$/, message: 'Invalid city name' },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="City Name"
                placeholder="Enter your City"
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                icon={
                  <MaterialCommunityIcons
                    name="home-city-outline"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.city?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="pincode"
            rules={{
              required: 'Pincode is required',
              pattern: { value: /^\d{6}$/, message: 'Invalid pincode' },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Pin Code"
                placeholder="Enter pincode"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                icon={<Map size={20} color={colors.textSecondary} />}
                error={errors.pincode?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="addressLine1"
            rules={{
              required: 'Address is required',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Address Line 1"
                placeholder="Enter Address Line 1"
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                icon={
                  <Entypo
                    name="address"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.addressLine1?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="addressLine2"
            // rules={{
            //   required: 'Address is required',

            // }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Address Line 2"
                placeholder="Enter Address Line 2"
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                icon={
                  <FontAwesome
                    name="map-signs"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                // error={errors.addressLine1?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            rules={{
              required: 'State is required',
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: 'Invalid state name',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="State Name"
                placeholder="Enter your State"
                value={value}
                onChangeText={onChange}
                keyboardType="default"
                icon={<MapPin size={20} color={colors.textSecondary} />}
                error={errors.state?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="AadhaarNumber"
            rules={{
              required: 'Aadhaar number is required',
              pattern: { value: /^\d{12}$/, message: 'Invalid Aadhaar number' },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Aadhaar Number"
                placeholder="Enter your Aadhaar number"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                maxLength={12}
                icon={
                  <AntDesign
                    name="idcard"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.AadhaarNumber?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="DateOfBirth"
            rules={{ required: 'Date of Birth is required' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <DateInput
                label="Date of Birth"
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />

          <Text
            style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}
          >
            Health Information
          </Text>

          <View style={styles.row}>
            <Controller
              control={control}
              name="WeightInKg"
              rules={{ required: 'Weight is required' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Weight (kg)"
                  placeholder=""
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  style={[styles.halfInput, { width: '5%' }]}
                  error={errors.WeightInKg?.message}
                  // icon={<FontAwesome5 name="weight" size={20} color={colors.textSecondary} />}
                />
              )}
            />

            <Controller
              control={control}
              name="HeightInCm"
              rules={{ required: 'Height is required' }}
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Height (cm)"
                  placeholder=""
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  style={styles.halfInput}
                  error={errors.HeightInCm?.message}
                  // icon={<FontAwesome5 name="ruler-vertical" size={20} color={colors.textSecondary} />}
                />
              )}
            />
          </View>

          <Controller
            control={control}
            name="bloodGroup"
            rules={{
              required: 'Blood group is required',
              pattern: {
                value: /^[ABO]{1,2}[+-]$/,
                message: 'Invalid blood group format',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Blood Group"
                placeholder="Enter blood group (e.g., A+, AB-)"
                value={value}
                onChangeText={(text) => {
                  const upperText = text.toUpperCase();
                  const formatted = upperText.replace(/[^ABO+-]/g, '');
                  const limited = formatted.slice(0, 3);
                  onChange(limited);
                }}
                autoCapitalize="characters"
                maxLength={3}
                icon={
                  <Fontisto
                    name="blood-drop"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.bloodGroup?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="knownAllergies"
            rules={{ required: 'Known Allergies is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Known Allergies"
                placeholder="Select Allergies"
                value={value}
                onChangeText={onChange}
                icon={
                  <FontAwesome5
                    name="allergies"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.knownAllergies?.message}
              />
            )}
          />

          <Text
            style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}
          >
            Security
          </Text>

          <Controller
            control={control}
            name="emergencyContactName"
            rules={{
              required: 'Emergency Contact Name is required',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Emergency Contact Name"
                placeholder=" Enter emergency contact name"
                value={value}
                onChangeText={onChange}
                icon={
                  <MaterialIcons
                    name="contact-emergency"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.emergencyContactName?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="emergencyContactNumber"
            rules={{
              required: 'Emergency Contact Number is required',
              pattern: { value: /^\d{10}$/, message: 'Invalid phone number' },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Emergency Contact Number"
                placeholder=" Enter emergency contact Number"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                icon={
                  <MaterialIcons
                    name="emergency"
                    size={20}
                    color={colors.textSecondary}
                  />
                }
                error={errors.emergencyContactNumber?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Password"
                placeholder="Create a password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showPassword}
                icon={<Lock size={20} color={colors.textSecondary} />}
                error={errors.password?.message}
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
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm Password is required',
              validate: (value) =>
                value === passwordValue || 'Passwords do not match',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={!showConfirmPassword}
                icon={<Lock size={20} color={colors.textSecondary} />}
                error={errors.confirmPassword?.message}
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
              />
            )}
          />

          <Button
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={[styles.loginLink, { color: colors.primary }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formCard: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',

    gap: 16,
  },
  halfInput: {},
  registerButton: {
    marginTop: 24,
    marginBottom: 24,
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
  selectHeight: {
    height: 30,
  },
});
