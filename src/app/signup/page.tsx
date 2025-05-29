'use client';
import { type JSX } from 'react';
import { useState } from 'react';
import * as React from 'react';
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
    // const [ password, setPassword ] = useState('');
    // const [ password, setPassword ] = useState<string>;
    const [ password, setPassword ]:[string,React.Dispatch<React.SetStateAction<string>>] = useState<string>(() => '');
    const isPasswordValid:boolean = password.length >= 8;
    return (
        <div className="min-h-screen flex justify-center items-center">
            <Card className="w-[350px] justify-center items-center border-4 border-black ">
                <CardHeader className="text-center">
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Please Create Your New Account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input id="email" type="email" placeholder="example@gmail.com" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="pass">Password</Label>
                                <Input
                                    id="pass"
                                    type="password"
                                    placeholder="Minimum 8 Characters"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={isPasswordValid ? '' : 'border-red-500'}
                                    minLength={8}
                                />
                                {!isPasswordValid && password.length > 0 && (
                                    <p className="text-sm text-red-600 mt-1">
                                        Password must be at least 8 characters.
                                    </p>
                                )}
                            </div>
                            <div className="flex flex-col space-y-1.5 text-sm">
                                <p>
                            Already have an account??{' '}
                                    <Link href="/login" className="text-blue-600 hover:underline">
                                    Login here!
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Sign Up</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
