import { Book } from '@repo/shared/schema';
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogAction,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogDescription,
} from '@repo/ui/alert-dialog';
import { toast } from '@repo/ui/sonner';
import React from 'react';
import { deleteBookById } from '../actions/book';

interface BookCardActionsProps {
    book: Book;
}

const BookCardActions = ({ book }: BookCardActionsProps) => {
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

    const handleDeleteBook = async () => {
        // Implement delete book functionality
        const result = await deleteBookById(book.id);

        if (!result.success) {
            toast('Error', {
                description: result.error,
            });
        } else {
            toast('Success', {
                description: 'Book deleted successfully',
            });
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

            <div className="flex flex-col space-x-3">
                <button
                    onClick={() => setIsConfirmOpen(true)}
                    className="text-red-500"
                >
                    Delete
                </button>
                <button className="text-primary-admin">Edit</button>
            </div>
        </>
    );
};

export default BookCardActions;
