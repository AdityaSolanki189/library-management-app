import React from 'react';
import { getBookById } from '../../../../actions/book';
import { redirect } from 'next/navigation';
import BookOverview from '../../../../components/BookOverview';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;

    const [bookDetails] = await getBookById(id);

    if (!bookDetails) redirect('/404');

    return (
        <>
            <BookOverview latestBook={bookDetails} />

            <div className="book-details">
                <div className="flex-[1.5]">
                    <section className="flex flex-col gap-7">
                        <h3>Video</h3>

                        {/* <BookVideo videoUrl={bookDetails.videoUrl} /> */}
                    </section>
                    <section className="mt-10 flex flex-col gap-7">
                        <h3>Summary</h3>

                        <div className="space-y-5 text-xl text-light-100">
                            {bookDetails.summary
                                .split('\n')
                                .map((line: string, i: number) => (
                                    <p key={i}>{line}</p>
                                ))}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default page;
