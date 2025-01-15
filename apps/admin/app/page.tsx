import { Button } from '@repo/ui/button';

export default function Home() {
    return (
        <div className="h-full w-full flex">
            <h1>Hello World, This is the Admin Portal</h1>
            <Button className="bg-blue-500 text-white" appName="Admin">
                Click me
            </Button>
        </div>
    );
}
