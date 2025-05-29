// import { SignInButton, SignOutButton, SignUp, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
import Image from 'next/image';

import { type JSX } from 'react';

export default function HomePage():JSX.Element {
    return(
        <div>
            <main className="p-4 flex flex-col gap-4">
                <div className="bg-blue-100 p-4 rounded">
                    <h3 className="font-bold">Bank Soal Saya</h3>
                    <div className="border-black border-2 rounded p-4 w-72">
                        <div>
                            <Image src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" alt="img1" width={120} height={120}/>
                        </div>
                    </div>
                </div>
                <div className="bg-green-100 p-4 rounded">
                    <h3 className="font-bold">History Penyelesaian</h3>

                    <div className="border-black border-2 rounded p-4 w-72">
                        <div>
                            <Image src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" alt="img2" width={120} height={120} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
