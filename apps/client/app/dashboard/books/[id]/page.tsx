'use client';

import { Book } from '@repo/shared/schema';
import { toast } from '@repo/ui/sonner';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBookById } from '../../../../actions/book';
import BookOverview from '../../../../components/BookOverview';
import BookOverviewSkeleton from '../../../../components/BookOverviewSkeleton';

const BookPage = () => {
    const { id } = useParams();
    const [bookDetails, setBookDetails] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || typeof id !== 'string') {
            toast('Error', { description: 'Invalid book ID' });
            redirect('/dashboard');
        }

        const fetchBookDetails = async () => {
            try {
                const response = await getBookById(id);
                if (!response) {
                    toast('Error', { description: 'Book not found' });
                    redirect('/404');
                    return;
                }
                setBookDetails(response.book);
            } catch (error) {
                toast('Error', { description: 'Failed to fetch book details' });
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) return <BookOverviewSkeleton />;

    if (!bookDetails) return <p>Book details not available.</p>;

    return (
        <div>
            <BookOverview latestBook={bookDetails} />
            <div className="book-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>
                        {/* Uncomment and add BookVideo component when available */}
                        {/* <BookVideo videoUrl={bookDetails.videoUrl} /> */}
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <h3>Summary</h3>
                        <div className="space-y-5 text-xl text-light-100">
                            {bookDetails.summary.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default BookPage;
