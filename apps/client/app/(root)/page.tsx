"use client";

import { Book } from '@repo/shared/schema';
import { useEffect, useState } from 'react';
import { getLatestBooks } from '../../actions/book';
import BookList from '../../components/BookList';
import BookOverview from '../../components/BookOverview';

export default function Home() {

    const [latestBooks, setLatestBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchLatestBooks = async () => {
            const newBooks = await getLatestBooks();
            setLatestBooks(newBooks);
        };

        fetchLatestBooks();
    }, []);

    return (
        <>  
            {latestBooks.length > 0 && (
                <BookOverview latestBook={latestBooks[0]!} />
            )}

            <BookList title='Latest Books' books={latestBooks} containerClassName="mt-16"/>
        </>
    );
}
