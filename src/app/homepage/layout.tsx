import { JSX } from 'react';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';


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
                    <Button className="bg-white text-black border-black border-2 hover:text-white">🏠 Join Room</Button>
                    <UserButton />
                </header>
                {children}
            </body>
        </html>
    );
}
