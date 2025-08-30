import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

export default function SignIn() {
    return (
        <AuthLayout>
            <div className="flex h-full flex-col">
                {/* Top Section */}
                <div className="space-y-4 text-center md:text-left">
                    <div className="flex justify-center md:justify-start">
                        <Logo />
                    </div>
                    <h1 className="text-3xl font-bold text-[#232323] md:text-4xl">
                        Sign in
                    </h1>
                    <p className="text-[#969696] md:text-lg">
                        Please login to continue to your account.
                    </p>
                </div>

                {/* Form Section */}
                <form className="mt-8 space-y-6">
                    <InputField
                        id="email"
                        label="Email"
                        type="email"
                        placeholder="jonas_kahnwald@gmail.com"
                    />
                    <div>
                        <InputField id="otp" label="OTP" type="text" placeholder="OTP" />
                        <div className="mt-2 text-left">
                            <a href="#" className="text-sm font-medium text-[#367AFF] underline md:text-base">
                                Resend OTP
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="keep-logged-in"
                            name="keep-logged-in"
                            type="checkbox"
                            className="h-5 w-5 rounded border-gray-300"
                        />
                        <label htmlFor="keep-logged-in" className="ml-2 block text-sm font-medium text-[#232323] md:text-base">
                            Keep me logged in
                        </label>
                    </div>
                    <SubmitButton>Sign In</SubmitButton>
                </form>

                {/* Footer Section */}
                <p className="mt-auto pt-8 text-center text-sm text-[#6C6C6C] md:text-base">
                    Need an account?{' '}
                    <Link to="/signup" className="font-medium text-[#367AFF] hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}