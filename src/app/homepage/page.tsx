// import { SignInButton, SignOutButton, SignUp, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
// import Image from 'next/image';
import Table  from './page copy';

import { type JSX } from 'react';

export default function HomePage():JSX.Element {
    return(
        <main className="p-4 flex flex-col">
            <div className="bg-blue-100 p-4 rounded">
                <h3 className="font-bold">Bank Soal Saya</h3>
                <Table />
            </div>
            <div className="bg-green-100 p-4 rounded">
                <h3 className="font-bold">History Penyelesaian</h3>
                <Table />
            </div>
        </main>
    );
}
