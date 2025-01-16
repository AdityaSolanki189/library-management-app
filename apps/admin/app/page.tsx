import { Button } from '@repo/ui/button';

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center bg-slate-300">
            <h1>Hello World, This is the Admin Portal</h1>
            <Button className='border border-blue-400 rounded-md'>
                Click me
            </Button>
        </div>
    );
}
