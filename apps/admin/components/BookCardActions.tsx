import type { Book } from '@repo/shared/schema';
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
import editIcon from '@repo/ui/icons/admin/edit.svg';
import trashIcon from '@repo/ui/icons/admin/trash.svg';
import { toast } from '@repo/ui/sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { deleteBookById } from '../actions/book';

interface BookCardActionsProps {
    book: Book;
}

const BookCardActions = ({ book }: BookCardActionsProps) => {
    const router = useRouter();
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

    const handleNavigation = () => {
        router.push(`/admin/books/edit/${book.id}`);
    };

    const handleDeleteBook = async () => {
        try {
            const result = await deleteBookById(book.id);
            if (!result.success) {
                toast('Error', { description: result.error });
            } else {
                toast('Success', { description: 'Book deleted successfully' });
            }
        } catch (error) {
            toast('Error', { description: 'Failed to delete the book.' });
        } finally {
            setIsConfirmOpen(false);
        }
    };

    return (
        <div className="flex space-x-3 justify-center">
            <Button className="text-primary-admin" onClick={handleNavigation}>
                <Image
                    src={editIcon || '/placeholder.svg'}
                    alt="edit"
                    width={20}
                    height={20}
                />
            </Button>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogTrigger asChild>
                    <Button className="text-red-500">
                        <Image
                            src={trashIcon || '/placeholder.svg'}
                            alt="delete"
                            width={20}
                            height={20}
                        />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="display-block">
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
        </div>
    );
};

export default BookCardActions;
