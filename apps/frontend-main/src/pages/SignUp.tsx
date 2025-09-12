import React, { useState } from "react";
import { Link } from "react-router-dom";
import HealthCard from "../components/ui/HealthCard";
import HealthInput from "../components/ui/HealthInput";
import HealthButton from "../components/ui/HealthButton";
import HealthCalendar from "../components/ui/HealthCalendar";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Heart,
  Shield,
  Globe,
  CheckCircle,
  MapPin,
  Calendar,
  Droplets,
  Activity,
  AlertTriangle,
  Home,
  UserCheck,
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SigunUpPatient } from "@/api";
import AnimatedAlertModal from "../components/ui/AnimatedAlertModal";

interface PatientSignupFormData {
  // Basic Info
  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  // Contact & Identity
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  aadhaarNumber: string;

  // Address Info
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  // Health Profile
  heightInCm: string;
  weightInKg: string;
  bloodGroup: string;
  knownAllergies: string;

  // Emergency Contact
  emergencyContactName: string;
  emergencyContactNumber: string;

  // Terms
  agreeToTerms: boolean;
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "warning" | "error">("success");
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertDescription, setAlertDescription] = useState<string>("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
    reset,
  } = useForm<PatientSignupFormData>({
    mode: "onChange",
  });

  const watchedPassword = watch("password");
  const watchedConfirmPassword = watch("confirmPassword");
  const watchedAgreeToTerms = watch("agreeToTerms");

  const passwordStrength = () => {
    const password = watchedPassword || "";
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength();
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Fair";
    if (strength <= 4) return "Good";
    return "Strong";
  };

  const handleStep1Submit = async () => {
    const isStep1Valid = await trigger([
      "fullName", "email", "username", "phoneNumber", "gender", "dateOfBirth", "aadhaarNumber"
    ]);
    if (isStep1Valid) {
      setStep(2);
    }
  };

  const handleStep2Submit = async () => {
    const isStep2Valid = await trigger([
      "addressLine1", "city", "state", "pincode"
    ]);
    if (isStep2Valid) {
      setStep(3);
    }
  };

  const handleStep3Submit = async () => {
    const isStep3Valid = await trigger([
      "heightInCm", "weightInKg", "bloodGroup", "emergencyContactName", "emergencyContactNumber"
    ]);
    if (isStep3Valid) {
      setStep(4);
    }
  };

  const onSubmit: SubmitHandler<PatientSignupFormData> = async (data) => {
    setIsLoading(true);
    
    const signupData = {
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      dateOfBirth: new Date(data.dateOfBirth),
      aadhaarNumber: data.aadhaarNumber,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || "",
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      heightInCm: data.heightInCm ? parseFloat(data.heightInCm) : null,
      weightInKg: data.weightInKg ? parseFloat(data.weightInKg) : null,
      bloodGroup: data.bloodGroup,
      knownAllergies: data.knownAllergies || "",
      emergencyContactName: data.emergencyContactName,
      emergencyContactNumber: data.emergencyContactNumber,
      createdAt: new Date(),
    };

    try {
      const signUpResp = await fetch(SigunUpPatient, {
        method: 'POST',
        body: JSON.stringify(signupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (signUpResp.ok) {
        setAlertType("success");
        setAlertTitle("Account created successfully");
        setAlertDescription("Your SwasthyaHub account has been created. You can now sign in and continue your journey.");
        setAlertOpen(true);
      } else {
        let extra = "";
        try {
          const errJson = await signUpResp.json();
          extra = typeof errJson === 'string' ? errJson : (errJson?.message || JSON.stringify(errJson));
        } catch (_) {
          try {
            extra = await signUpResp.text();
          } catch {}
        }
        setAlertType("error");
        setAlertTitle("Signup failed");
        setAlertDescription(extra ? `Failed to create account. ${extra}` : "Failed to create account. Please try again.");
        setAlertOpen(true);
      }
    } catch (e: any) {
      setAlertType("error");
      setAlertTitle("Network error");
      setAlertDescription(e?.message ? String(e.message) : "Something went wrong. Please check your connection and try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
      reset();
      navigate("/signin");
    }
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const genderOptions = ["Male", "Female", "Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-24 h-24 bg-secondary/5 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-500/5 rounded-full animate-ping"></div>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Join SwasthyaHub
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete your health profile to get started
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {step} of 4
            </span>
            <span className="text-sm text-gray-500">
              {step === 1 && "Basic Information"}
              {step === 2 && "Address Details"}
              {step === 3 && "Health Profile"}
              {step === 4 && "Account Setup"}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Sign Up Form */}
        <HealthCard variant="elevated" className="w-full">
          <form key={`signup-form-${step}`} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Basic Information
                </h2>
                
                  <HealthInput
                  label="Full Name"
                  {...register("fullName", {
                    required: "Full name is required",
                      minLength: {
                        value: 2,
                      message: "Full name must be at least 2 characters"
                      }
                    })}
                    icon={<User size={20} />}
                  placeholder="Enter your full name"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  error={errors.fullName?.message || undefined}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HealthInput
                  label="Email Address"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  })}
                  icon={<Mail size={20} />}
                  placeholder="Enter your email"
                  required
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                  error={errors.email?.message || undefined}
                />

                  <HealthInput
                    label="Username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters"
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Username can only contain letters, numbers, and underscores"
                      }
                    })}
                    icon={<User size={20} />}
                    placeholder="Choose a username"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.username?.message || undefined}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HealthInput
                  label="Phone Number"
                  type="tel"
                    {...register("phoneNumber", {
                    required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                    }
                  })}
                  icon={<Phone size={20} />}
                  placeholder="Enter your phone number"
                  required
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.phoneNumber?.message || undefined}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("gender", { required: "Gender is required" })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select gender</option>
                      {genderOptions.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                    {errors.gender && (
                      <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <HealthCalendar
                  label="Date of Birth"
                  value={watch("dateOfBirth")}
                  onChange={(date) => setValue("dateOfBirth", date)}
                  placeholder="Select your date of birth"
                  required
                  maxDate={new Date()}
                  minDate={new Date(1900, 0, 1)}
                  error={errors.dateOfBirth?.message || undefined}
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                />

                  <HealthInput
                    label="Aadhaar Number"
                    {...register("aadhaarNumber", {
                      required: "Aadhaar number is required",
                      pattern: {
                        value: /^[0-9]{12}$/,
                        message: "Please enter a valid 12-digit Aadhaar number"
                      }
                    })}
                    icon={<UserCheck size={20} />}
                    placeholder="Enter your Aadhaar number"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.aadhaarNumber?.message || undefined}
                  />
                </div>

                <HealthButton
                  type="button"
                  onClick={handleStep1Submit}
                  fullWidth
                  size="lg"
                  className="group relative overflow-hidden"
                >
                  Continue
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </HealthButton>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Address Details
                </h2>

                <HealthInput
                  label="Address Line 1"
                  {...register("addressLine1", {
                    required: "Address is required"
                  })}
                  icon={<Home size={20} />}
                  placeholder="Enter your street address"
                  required
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                  error={errors.addressLine1?.message || undefined}
                />

                <HealthInput
                  label="Address Line 2 (Optional)"
                  {...register("addressLine2")}
                  icon={<Home size={20} />}
                  placeholder="Apartment, suite, etc. (optional)"
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <HealthInput
                    label="City"
                    {...register("city", {
                      required: "City is required"
                    })}
                    icon={<MapPin size={20} />}
                    placeholder="Enter your city"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.city?.message || undefined}
                  />

                  <HealthInput
                    label="State"
                    {...register("state", {
                      required: "State is required"
                    })}
                    icon={<MapPin size={20} />}
                    placeholder="Enter your state"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.state?.message || undefined}
                  />

                  <HealthInput
                    label="Pincode"
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit pincode"
                      }
                    })}
                    icon={<MapPin size={20} />}
                    placeholder="Enter your pincode"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.pincode?.message || undefined}
                  />
                </div>

                <div className="flex space-x-4">
                  <HealthButton
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    fullWidth
                    size="lg"
                  >
                    Back
                  </HealthButton>
                  <HealthButton
                    type="button"
                    onClick={handleStep2Submit}
                    fullWidth
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    Continue
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </HealthButton>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Health Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HealthInput
                    label="Height (cm)"
                    type="number"
                    {...register("heightInCm", {
                      required: "Height is required",
                      min: {
                        value: 50,
                        message: "Height must be at least 50 cm"
                      },
                      max: {
                        value: 250,
                        message: "Height must be less than 250 cm"
                      }
                    })}
                    icon={<Activity size={20} />}
                    placeholder="Enter your height in cm"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.heightInCm?.message || undefined}
                  />

                  <HealthInput
                    label="Weight (kg)"
                    type="number"
                    {...register("weightInKg", {
                      required: "Weight is required",
                      min: {
                        value: 10,
                        message: "Weight must be at least 10 kg"
                      },
                      max: {
                        value: 300,
                        message: "Weight must be less than 300 kg"
                      }
                    })}
                    icon={<Activity size={20} />}
                    placeholder="Enter your weight in kg"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.weightInKg?.message || undefined}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("bloodGroup", { required: "Blood group is required" })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select blood group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                    {errors.bloodGroup && (
                      <p className="text-sm text-red-500 mt-1">{errors.bloodGroup.message}</p>
                    )}
                  </div>

                  <HealthInput
                    label="Known Allergies (Optional)"
                    {...register("knownAllergies")}
                    icon={<AlertTriangle size={20} />}
                    placeholder="List any known allergies"
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <HealthInput
                    label="Emergency Contact Name"
                    {...register("emergencyContactName", {
                      required: "Emergency contact name is required"
                    })}
                    icon={<User size={20} />}
                    placeholder="Enter emergency contact name"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.emergencyContactName?.message || undefined}
                  />

                  <HealthInput
                    label="Emergency Contact Number"
                    type="tel"
                    {...register("emergencyContactNumber", {
                      required: "Emergency contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Please enter a valid 10-digit phone number"
                      }
                    })}
                    icon={<Phone size={20} />}
                    placeholder="Enter emergency contact number"
                    required
                    className="transition-all duration-300 focus-within:scale-[1.02]"
                    error={errors.emergencyContactNumber?.message || undefined}
                  />
                </div>

                <div className="flex space-x-4">
                  <HealthButton
                    type="button"
                    onClick={() => setStep(2)}
                    variant="outline"
                    fullWidth
                    size="lg"
                  >
                    Back
                  </HealthButton>
                  <HealthButton
                    type="button"
                    onClick={handleStep3Submit}
                    fullWidth
                    size="lg"
                    className="group relative overflow-hidden"
                  >
                    Continue
                    <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </HealthButton>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Account Setup
                </h2>

                <HealthInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                  icon={<Lock size={20} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  placeholder="Create a strong password"
                  required
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                  error={errors.password?.message || undefined}
                />

                {/* Password Strength */}
                {watchedPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Password strength:
                      </span>
                      <span
                        className={`text-sm font-medium ${getPasswordStrengthColor().replace(
                          "bg-",
                          "text-"
                        )}`}
                      >
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <CheckCircle
                          className={`w-3 h-3 ${
                            (watchedPassword || "").length >= 8
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span>At least 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle
                          className={`w-3 h-3 ${
                            /[A-Z]/.test(watchedPassword || "")
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span>One uppercase letter</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle
                          className={`w-3 h-3 ${
                            /[0-9]/.test(watchedPassword || "")
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span>One number</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle
                          className={`w-3 h-3 ${
                            /[^A-Za-z0-9]/.test(watchedPassword || "")
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        <span>One special character</span>
                      </div>
                    </div>
                  </div>
                )}

                <HealthInput
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => {
                      if (value !== watchedPassword) {
                        return "Passwords do not match";
                      }
                      return true;
                    }
                  })}
                  icon={<Lock size={20} />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  placeholder="Confirm your password"
                  required
                  className="transition-all duration-300 focus-within:scale-[1.02]"
                  error={errors.confirmPassword?.message || undefined}
                />

                <label className="flex items-start cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("agreeToTerms", {
                      required: "You must agree to the terms"
                    })}
                    className="mr-3 mt-1 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    required
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-500">{errors.agreeToTerms.message}</p>
                )}

                <div className="flex space-x-4">
                  <HealthButton
                    type="button"
                    onClick={() => setStep(3)}
                    variant="outline"
                    fullWidth
                    size="lg"
                  >
                    Back
                  </HealthButton>
                  <HealthButton
                    type="submit"
                    fullWidth
                    size="lg"
                    disabled={isLoading || !watchedAgreeToTerms || watchedPassword !== watchedConfirmPassword}
                    className="group relative overflow-hidden"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      <>
                        Create Account
                        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </>
                    )}
                  </HealthButton>
                </div>
              </>
            )}

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </HealthCard>

        {/* Trust Indicators */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>

      <AnimatedAlertModal
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        type={alertType}
        title={alertTitle}
        description={alertDescription}
        confirmText="OK"
      />
    </div>
  );
};

export default SignUp;
