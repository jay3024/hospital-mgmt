
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HealthCard from '../components/ui/HealthCard';
import HealthInput from '../components/ui/HealthInput';
import HealthButton from '../components/ui/HealthButton';
import { Mail, Lock, Eye, EyeOff, Heart, Shield, Globe, User2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SigunInPatient } from '@/api';
import AnimatedAlertModal from '@/components/ui/AnimatedAlertModal';

interface SignInFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "warning" | "error">("success");
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertDescription, setAlertDescription] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    setIsLoading(true);

    const signInData = {
      username: data.username,
      password: data.password,
     
    };
    
  const signInResp = await fetch(SigunInPatient, {
    method: 'POST',
    body: JSON.stringify(signInData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (signInResp.ok) {
    setIsLoading(false);
    navigate("/health-tracker");
  } else {
    let extra = "";
    try {
      const errJson = await signInResp.json();
      extra = typeof errJson === 'string' ? errJson : (errJson?.message || JSON.stringify(errJson));
    } catch (_) {
      try {
        extra = await signInResp.text();
      } catch {}
    }
    setIsLoading(false);
    setAlertType("error");
    setAlertTitle("Signin failed");
    setAlertDescription(extra ? `Failed to sign in. ${extra}` : "Failed to sign in. Please try again.");
    setAlertOpen(true);
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/5 rounded-full animate-ping"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Sign in to continue your health journey
          </p>
        </div>

        {/* Sign In Form */}
        <HealthCard variant="elevated" className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <HealthInput
              label="Username"
              type="text"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message: "Please enter a valid username"
                }
              })}
              icon={<User2 size={20} />}
              placeholder="Enter your username"
              required
              className="transition-all duration-300 focus-within:scale-[1.02]"
              error={errors.username?.message || undefined}
            />

            <HealthInput
              label="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required"
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
              placeholder="Enter your password"
              required
              className="transition-all duration-300 focus-within:scale-[1.02]"
              error={errors.password?.message || undefined}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="mr-3 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <HealthButton 
              type="submit" 
              fullWidth 
              size="lg"
              disabled={isLoading}
              className="group relative overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In
                  <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </>
              )}
            </HealthButton>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Twitter
              </button>
            </div>

            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Sign Up
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

export default SignIn;
