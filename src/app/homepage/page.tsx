// import { SignInButton, SignOutButton, SignUp, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';

import { type JSX } from 'react';

export default function HomePage():JSX.Element {
    return(
        <div>
            <header className="flex justify-end items-center p-4 gap-4 h-16 outline-dashed ">
                <div className="flex items-center flex-1">
                    <Image src="https://i.pinimg.com/736x/8d/ca/11/8dca11e2f18ddedc934f95cc307ebf8d.jpg" alt="logo icon" width={80} height={80}/>
                    <p>Quizz...</p>
                </div>
                <button className="border-black border-2 rounded-lg py-1 px-2 ">
                    🏠
                    Join Room
                </button>
                <UserButton />
            </header>
            <main className="p-4 flex flex-col gap-4">
                <div className="bg-blue-100 p-4 rounded">
                    <div className="border-black border-2 rounded p-4 w-72">
                        <div className="pb-4 font-bold">
                            <p>Bank Soal Saya</p>
                        </div>
                        <div>
                            <Image src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" alt="img1" width={120} height={120}/>
                        </div>
                    </div>
                </div>
                <div className="bg-green-100 p-4 rounded">
                    <div className="border-black border-2 rounded p-4 w-72">
                        <div className="pb-4 font-bold">
                            <p>Histori Bank Soal</p>
                        </div>
                        <div>
                            <Image src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" alt="img2" width={120} height={120} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
