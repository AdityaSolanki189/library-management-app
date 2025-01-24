import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@repo/ui/alert-dialog';
import { Button } from '@repo/ui/button';
import Image from 'next/image';
import trashIcon from '@repo/ui/icons/admin/trash.svg';

interface ConfirmDeleteDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: (value: boolean) => void;
    handleDelete: () => void;
}

const ConfirmDeleteDialog = ({
    isDialogOpen,
    setIsDialogOpen,
    handleDelete,
}: ConfirmDeleteDialogProps) => {
    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    className="text-red-500"
                    onClick={() => console.log('clicked the trash icon')}
                >
                    <Image
                        src={trashIcon || '/placeholder.svg'}
                        alt="delete"
                        width={20}
                        height={20}
                    />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="alert-dialog">
                <AlertDialogHeader className="mb-4 text-center">
                    <AlertDialogTitle className="text-2xl font-bold text-gray-900">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-gray-600 text-base">
                        This action will mark the item for deletion. Are you
                        sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex justify-end gap-4 mt-6">
                    <AlertDialogCancel className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:font-bold"
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDeleteDialog;
