'use client';
import { type JSX } from 'react';
import { ClerkProvider, SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return(
    <div className='min-h-screen flex justify-center items-center'>
      <SignIn/>
    </div>
  )
}