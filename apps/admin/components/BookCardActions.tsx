import { Book } from '@repo/shared/schema';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@repo/ui/alert-dialog';
import { Button } from '@repo/ui/button';
import editIcon from '@repo/ui/icons/admin/edit.svg';
import trashIcon from '@repo/ui/icons/admin/trash.svg';
import { toast } from '@repo/ui/sonner';
import Image from 'next/image';
import React from 'react';
import { deleteBookById } from '../actions/book';

interface BookCardActionsProps {
    book: Book;
}

const BookCardActions = ({ book }: BookCardActionsProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

    const handleDeleteBook = async () => {
        const result = await deleteBookById(book.id);

        if (!result.success) {
            toast('Error', {
                description: result.error,
            });
        } else {
            toast('Success', {
                description: 'Book deleted successfully',
            });
            setIsConfirmOpen(false);
        }
    };

    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will mark the file for deletion. It will
                            be moved to the Trash bin. And it will be
                            permanently deleted after 30 days.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteBook}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex  space-x-3">
                <Button className="text-primary-admin">
                    <Image src={editIcon} alt="edit" width={20} height={20} />
                </Button>
                <Button
                    onClick={() => setIsConfirmOpen(true)}
                    className="text-red-500"
                >
                    <Image
                        src={trashIcon}
                        alt="delete"
                        width={20}
                        height={20}
                    />
                </Button>
            </div>
        </>
    );
};

export default BookCardActions;
