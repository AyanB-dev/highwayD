import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../auth/ValidationSchemas';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import GoogleSignInButton from '../components/GoogleSignInButton';

export default function SignIn() {
    const { login } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signInSchema),
        mode: 'onTouched',
    });

    const onSubmit = (data) => {
        console.log('Login data is valid:', data);
        login();
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
                        <div className="mt-2 text-left"><a href="#" className="text-sm font-medium text-[#367AFF] underline md:text-base">Resend OTP</a></div>
                    </div>
                    <div className="flex items-center">
                        <input id="keep-logged-in" name="keep-logged-in" type="checkbox" className="h-5 w-5 rounded border-gray-300" />
                        <label htmlFor="keep-logged-in" className="ml-2 block text-sm font-medium text-[#232323] md:text-base">Keep me logged in</label>
                    </div>
                    <SubmitButton type="submit">Sign In</SubmitButton>
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