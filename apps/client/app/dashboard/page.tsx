'use client';

import { Book } from '@repo/shared/schema';
import { useEffect, useState } from 'react';
import { getLatestBooks } from '../../actions/book';
import BookList from '../../components/BookList';
import BookOverview from '../../components/BookOverview';
import { toast } from '@repo/ui/sonner';
import Loader from '../../components/Loader';

const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export default function Home() {
    const [latestBooks, setLatestBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestBooks = async () => {
            await delay(1000);
            const newBooks = await getLatestBooks();
            if (newBooks?.success) {
                toast('Success', {
                    description: 'Fetched latest books',
                });
                setLatestBooks(newBooks.books);
                setLoading(false);
            } else {
                toast('Error', {
                    description: newBooks?.error,
                });
                setLoading(false);
            }
        };

        fetchLatestBooks();
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {latestBooks.length > 0 && (
                        <>
                            <BookOverview latestBook={latestBooks[0]!} />
                            <BookList
                                title="Latest Books"
                                books={latestBooks}
                                containerClassName="mt-12"
                            />
                        </>
                    )}
                </>
            )}
        </>
    );
}
