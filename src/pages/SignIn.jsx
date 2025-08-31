import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../auth/ValidationSchemas';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';

import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function SignIn() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: zodResolver(signInSchema),
        mode: 'onTouched',
    });

    // Function to request a login OTP
    const handleGetLoginOtp = async () => {
        const email = getValues('email'); // Get email from the form
        if (!email) {
            toast.error('Please enter your email first.');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await api.post('/auth/send-login-otp', { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send OTP.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Function to verify the OTP and log in
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await api.post('/auth/verify-otp', data);
            toast.success('Login successful!');
            login(response.data.user, response.data.token);
            navigate('/'); // Redirect to dashboard
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AuthLayout>
            <div className="flex h-full flex-col">
                <div className="space-y-4 text-center md:text-left">
                    <div className="flex justify-center md:justify-start"><Logo /></div>
                    <h1 className="text-3xl font-bold text-[#232323] md:text-4xl">Sign in</h1>
                    <p className="text-[#969696] md:text-lg">Please login to continue to your account.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Controller name="email" control={control} render={({ field }) => (
                        <div>
                            <InputField id="email" label="Email" type="email" active {...field} />
                            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                        </div>
                    )} />
                    <div>
                        <Controller name="otp" control={control} render={({ field }) => (
                            <div>
                                <InputField id="otp" label="OTP" type="text" {...field} />
                                {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp.message}</p>}
                            </div>
                        )} />
                        {/* Updated "Resend OTP" to be a functional button */}
                        <div className="mt-2 text-left">
                            <button
                                type="button"
                                onClick={handleGetLoginOtp}
                                disabled={isSubmitting}
                                className="text-sm font-medium text-[#367AFF] underline disabled:text-gray-400 disabled:cursor-not-allowed md:text-base"
                            >
                                Get/Resend OTP
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input id="keep-logged-in" name="keep-logged-in" type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        <label htmlFor="keep-logged-in" className="ml-2 block text-sm font-medium text-[#232323] md:text-base">Keep me logged in</label>
                    </div>
                    <SubmitButton type="submit" isSubmitting={isSubmitting}>Sign In</SubmitButton>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                    <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-gray-500">OR</span></div>
                </div>
                <GoogleSignInButton />
                <p className="mt-auto pt-8 text-center text-sm text-[#6C6C6C] md:text-base">Need an account?{' '}<Link to="/signup" className="font-medium text-[#367AFF] hover:underline">Create one</Link></p>
            </div>
        </AuthLayout>
    );
}