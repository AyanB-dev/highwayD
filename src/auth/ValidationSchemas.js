import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    dateOfBirth: z.date({ required_error: 'Date of Birth is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    otp: z.string().optional(),
});

export const signInSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Must be a valid email' }),
    otp: z.string().min(6, { message: 'OTP must be 6 characters' }),
});