import type { Book } from '@repo/shared/schema';
import { Button } from '@repo/ui/button';
import editIcon from '@repo/ui/icons/admin/edit.svg';
import { toast } from '@repo/ui/sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteBookById } from '../actions/book';
import ConfirmDeleteDialog from './ConfirmDeleteDialog';

interface BookCardActionsProps {
    book: Book;
}

const BookCardActions = ({ book }: BookCardActionsProps) => {
    const router = useRouter();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
            <ConfirmDeleteDialog
                isDialogOpen={isConfirmOpen}
                setIsDialogOpen={setIsConfirmOpen}
                handleDelete={handleDeleteBook}
            />
        </div>
    );
};

export default BookCardActions;
