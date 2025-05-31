// import { SignInButton, SignOutButton, SignUp, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
// import Image from 'next/image';
import Table  from './page copy';

import { type JSX } from 'react';

export default function HomePage():JSX.Element {
    return(
        <main className="p-4 flex flex-col">
            <h3 className="font-bold">Bank Soal Saya</h3>
            <div className="border-1 border-black p-4">
                <Table />
            </div>
            <h3 className="font-bold">History Penyelesaian</h3>
            <div className="border-1 border-black p-4">
                <Table />
            </div>
        </main>
    );
}
