import { User } from '@repo/shared/schema';
import { toast } from '@repo/ui/sonner';
import { useState } from 'react';
import { deleteUserById } from '../actions/user';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

interface UserCardActionsProps {
    user: User;
}

const UserCardActions = ({ user }: UserCardActionsProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDeleteUser = async () => {
        const result = await deleteUserById(user.id);

        if (!result.success) {
            toast('Error', {
                description: result.error,
            });
        } else {
            toast('Success', {
                description: `User with Id: ${result.userId} deleted successfully`,
            });
            setIsConfirmOpen(false);
        }
    };

    return (
        <div>
            <ConfirmDeleteDialog
                isDialogOpen={isConfirmOpen}
                setIsDialogOpen={setIsConfirmOpen}
                handleDelete={handleDeleteUser}
            />
        </div>
    );
};

export default UserCardActions;
