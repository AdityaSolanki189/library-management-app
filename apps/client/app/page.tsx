import { Button } from '@repo/ui/button';

export default function Home() {
    return (
        <div>
            <h2>Hello, World! This is the Client App</h2>
            <Button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                appName="client"
            >
                Click me
            </Button>
        </div>
    );
}
