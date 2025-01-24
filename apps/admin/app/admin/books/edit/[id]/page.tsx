'use client';

import { addBookSchema, Book } from '@repo/shared/schema';
import { Button } from '@repo/ui/button';
import { toast } from '@repo/ui/sonner';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookById, updateBook } from '../../../../../actions/book';
import BookForm from '../../../../../components/BookForm';
import Loader from '../../../../../components/Loader';

const page = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState<Book>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            if (typeof id !== 'string') {
                toast('Error', {
                    description: 'Invalid book ID',
                });
                redirect('/admin/books');
            }

            const bookDetails = await getBookById(id);

            if (!bookDetails) {
                toast('Error', {
                    description: 'Book not found',
                });
                redirect('/admin/books');
            }
            setBookDetails(bookDetails.book);
            setLoading(false);
        };

        fetchBookDetails();
    }, []);

    return (
        <>
            <Button asChild className="back-btn">
                <Link href="/admin/books">Go Back</Link>
            </Button>

            {loading ? (
                <Loader />
            ) : (
                <section className="w-full max-w-2xl">
                    {bookDetails ? ( // Check if bookDetails is defined
                        <BookForm
                            type="update"
                            schema={addBookSchema}
                            defaultValues={
                                bookDetails as Omit<Book, 'createdAt'>
                            }
                            onSubmit={(data) => updateBook(data, id as string)}
                        />
                    ) : (
                        <p>Book details not available.</p> // Fallback message
                    )}
                </section>
            )}
        </>
    );
};

export default page;
