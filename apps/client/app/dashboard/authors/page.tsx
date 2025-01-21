'use client';

import { toast } from "@repo/ui/sonner";
import { Button } from "@repo/ui/button";

export default function TestPage() {
    return (
        <div>
            <Button
                onClick={() =>
                    toast("Test Toast",{
                        description: "This is a test notification.",
                    })
                }
            >
                Show Toast
            </Button>
        </div>
    );
}
