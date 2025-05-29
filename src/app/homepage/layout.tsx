import { JSX } from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';


export default function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode
}>):JSX.Element {
    return (
        <html lang="en">
            <body>
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
                {children}
            </body>
        </html>
    );
}
