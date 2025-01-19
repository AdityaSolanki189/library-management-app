'use client';

import { toast } from "@repo/ui/use-toast";
import { Button } from "@repo/ui/button";

export default function TestPage() {
    return (
        <div>
            <Button
                onClick={() =>
                    toast({
                        title: "Test Toast",
                        description: "This is a test notification.",
                    })
                }
            >
                Show Toast
            </Button>
        </div>
    );
}
