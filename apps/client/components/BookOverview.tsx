import { Book } from '@repo/shared/schema';
import star from '@repo/ui/icons/star.svg';
import Image from 'next/image';

interface BookOverviewProps {
    latestBook: Book;
}

const BookOverview = ({ latestBook } : BookOverviewProps) => {
    return (
        <section className="book-overview">
            <div className="flex flex-1 flex-col gap-4">
                <h1>{latestBook.title} </h1>

                <div className="book-info">
                    <p>
                        By{' '}
                        <span className="font-semibold text-light-200">
                            {latestBook.author}
                        </span>
                    </p>

                    <p>
                        Genre{' '}
                        <span className="font-semibold text-light-200">
                            {latestBook.genre}
                        </span>
                    </p>

                    <div className="flex flex-row gap-1">
                        <Image src={star} alt="star" width={22} height={22} className='cursor-pointer hover:decoration-primary'/>
                        <p>{latestBook.rating}</p>
                    </div>
                </div>

                <div className="book-copies">
                    <p>
                        Total Books <span>{latestBook.totalCopies}</span>
                    </p>

                    <p>
                        Available Books <span>{latestBook.availableCopies}</span>
                    </p>
                </div>

                <p className="book-description">{latestBook.description}</p>
                {/* 
                {user && (
                    <BorrowBook
                        bookId={id}
                        userId={userId}
                        borrowingEligibility={borrowingEligibility}
                    />
                )} */}
            </div>

            {/* <div className="relative flex flex-1 justify-center">
                <div className="relative">
                    <BookCover
                        variant="wide"
                        className="z-10"
                        coverColor={latestBook.coverColor}
                        coverImage={latestBook.coverUrl}
                    />

                    <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
                        <BookCover
                            variant="wide"
                            coverColor={latestBook.coverColor}
                            coverImage={latestBook.coverUrl}
                        />
                    </div>
                </div>
            </div> */}
        </section>
    );
};

export default BookOverview;
