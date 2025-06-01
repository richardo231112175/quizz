'use client';
import { Button } from '@/components/ui/button';
import { type JSX } from 'react';
import { Plus,UserRound } from 'lucide-react';
import Link from 'next/link';


export default function HomePage():JSX.Element {
    return(
        <main className="p-4 flex flex-col px-15">
            <div className="flex gap-6">
                <h3 className="font-bold">My Quizz</h3>
                <Link href="/" className="text-blue-400 hover:underline">View all</Link>
            </div>
            <div className="border-1 border-black p-4 flex items-center gap-2.5 flex-wrap">
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white"> <Plus /> </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">5 Dosa Janupolis</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">KamenRider</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Kota</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Buah</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Ultraman</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Politik Kerajaan</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Politik Kerajaan</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Politik Kerajaan</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">Politik Kerajaan</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
                <Button className="bg-white w-20 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs truncate">PPKN</p>
                    </div>
                    <div className="flex flex-row items-center ml-auto">
                        <UserRound className="size-3"/>
                        <p className="text-xs">39</p>
                    </div>
                </Button>
            </div>
            <div className="flex gap-6">
                <h3 className="font-bold">Completed Quizz</h3>
                <Link href="/" className="text-blue-400 hover:underline">View all</Link>
            </div>
            <div className="border-1 border-black p-4 flex items-center gap-2.5 flex-wrap">
                <Button className="bg-white w-20 h-10 text-black border-black border-2 hover:text-white px-3 flex flex-col gap-0">
                    <div className="w-15 ">
                        <p className="text-xs h-fit truncate mt-2">Matematika</p>
                    </div>
                    <div className="ml-auto mb-2">
                        <p className="text-base"> <span className="underline">75</span><span className="text-xs">/100</span></p>
                    </div>
                </Button>
            </div>
        </main>
    );
}
