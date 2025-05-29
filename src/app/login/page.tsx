'use client';
import { type JSX } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
 
export default function CardWithForm():JSX.Element {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-[350px] justify-center items-center border-4 border-black">
                <CardHeader className="text-center">
                    <CardTitle>Welcome to Quizz</CardTitle>
                    <CardDescription>Please Login First.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Password</Label>
                                <Input id="pass" type="password" placeholder="Enter your password" required minLength={8} />
                            </div>
                            <div className="flex flex-col space-y-1.5 text-sm">
                                <p>
                                    Don&apos;t have any account?{' '}
                                    <Link href="/signup" className="text-blue-600 hover:underline">
                                    Create new now!
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Login</Button>
                </CardFooter>
            </Card>

        </div>
    );
}
