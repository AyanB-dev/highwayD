import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../auth/ValidationSchemas';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig'; // This path is now correct for your structure
import { useAuth } from '../context/AuthContext';

import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import DatePickerField from '../components/DatePickerField';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function SignUp() {
  const [otpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    if (!otpSent) {
      try {
        const response = await api.post('/auth/register', {
          name: data.name,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
        });
        toast.success(response.data.message);
        setOtpSent(true);
      } catch (error) {
        toast.error(error.response?.data?.error || 'An error occurred while sending OTP.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    if (otpSent) {
      try {
        const response = await api.post('/auth/verify-otp', {
          email: data.email,
          otp: data.otp,
        });
        toast.success('Account created successfully!');

        login(response.data.user, response.data.token);

        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.error || 'An error occurred during verification.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="flex h-full flex-col">
        <div className="space-y-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-[#232323] md:text-4xl">
            Sign up
          </h1>
          <p className="text-[#969696] md:text-lg">
            Sign up to enjoy the feature of HD
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
                <InputField id="name" label="Your Name" type="text" {...field} />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
              </div>
            )}
          />
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <div>
                <DatePickerField id="dob" label="Date of Birth" field={field} />
                {errors.dateOfBirth && <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth.message}</p>}
              </div>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <div>
                <InputField id="email" label="Email" type="email" active {...field} />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
            )}
          />
          {otpSent && (
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <div>
                  <InputField id="otp" label="OTP" type="text" {...field} />
                  {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>}
                </div>
              )}
            />
          )}
          <SubmitButton type="submit" isSubmitting={isSubmitting}>
            {otpSent ? 'Sign up' : 'Get OTP'}
          </SubmitButton>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
          <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div>
        </div>
        <GoogleSignInButton />
        <p className="mt-auto pt-8 text-center text-sm text-[#6C6C6C] md:text-base">
          Already have an account?{' '}
          <Link to="/signin" className="font-medium text-[#367AFF] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}