'use client';
import { type JSX } from 'react';
import { SignIn } from '@clerk/nextjs';

export default function LoginPage():JSX.Element {
    return(
        <div className="min-h-screen flex justify-center items-center">
            <SignIn forceRedirectUrl="/homepage" />
        </div>
    );
}
