import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Logo from '../components/Logo';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';
import DatePickerField from '../components/DatePickerField'

export default function SignUp() {
  const [otpSent, setOtpSent] = useState(false);

  const handleGetOtp = (e) => {
    e.preventDefault();
    
    console.log('Getting OTP...');
    setOtpSent(true);
  };

  return (
    <AuthLayout>
      <div className="flex h-full flex-col">
        {}
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

        {/* Form Section */}
        <form className="mt-8 space-y-6">
          <InputField id="name" label="Your Name" type="text" />
          <DatePickerField id="dob" label="Date of Birth" />
          <InputField
            id="email"
            label="Email"
            type="email"
            active 
          />

          {}
          {otpSent && <InputField id="otp" label="OTP" type="text" />}

          <SubmitButton onClick={!otpSent ? handleGetOtp : null}>
            {otpSent ? 'Sign up' : 'Get OTP'}
          </SubmitButton>
        </form>

        {/* Footer Section */}
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