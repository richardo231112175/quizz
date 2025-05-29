import { SignInButton, SignOutButton, SignUp, SignUpButton, UserButton, UserProfile } from '@clerk/nextjs';
import { HomeIcon, LogOut, UserIcon } from 'lucide-react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { type JSX } from 'react';

export default function HomePage() {
  return(
    <div>
    <header className="flex justify-end items-center p-4 gap-4 h-16 outline-dashed">
        <div className='flex flex-1'>
            <p>tempat isi logo</p>
        </div>
        <button className='border-black border-2 rounded-lg py-1 px-2 '>
            🏠
            Join Room
        </button>
        <UserIcon/>
    </header>
    <main className="p-4 flex flex-col gap-4">
        <div className="bg-blue-100 p-4 rounded">
          <div className='border-black border-2 rounded p-4 w-72'>
            <div className='pb-4 font-bold'>
              <p>Bank Soal Saya</p>
            </div>
            <div>
              <img src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" width={120} alt="" />
            </div>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded">
          <div className='border-black border-2 rounded p-4 w-72'>
            <div className='pb-4 font-bold'>
              <p>Histori Bank Soal</p>
            </div>
            <div>
              <img src="https://static.vecteezy.com/system/resources/previews/013/901/773/original/facebook-icon-ios-facebook-social-media-logo-on-white-background-free-free-vector.jpg" width={120} alt="" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}