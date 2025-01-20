'use client';

import { toast } from '@repo/ui/sonner';

const ClientToast = ({ error }: { error: string | null }) => {
    if (error) {
        toast('Error', {
            description: error,
        });
    }

    return null;
};

export default ClientToast;
