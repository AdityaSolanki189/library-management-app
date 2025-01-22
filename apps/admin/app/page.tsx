'use client';

import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/sonner';
import { redirect } from 'next/navigation';

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-300">
            <span className='text-4xl font-bebas-neue'>Hello World, This is the Admin Portal</span>
            <Button className='border-4 border-blue-400 rounded-xl py-2 px-3 mt-4 font-semibold font-ibm-plex-sans' onClick={() => {
                toast.success('Hello World');
                redirect('/admin');
            }}>
                Click me
            </Button>
        </div>
    );
}
