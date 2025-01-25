import React from 'react';
import { cn } from '@repo/ui/global.css';

const BookOverviewSkeleton = () => {
    return (
        <section className="book-overview">
            <div className="flex flex-1 flex-col gap-4 ">
                {/* Title skeleton */}
                <Skeleton className="h-16 w-3/4" />

                {/* Book info skeleton */}
                <div className="book-info space-y-2 mt-6">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-8 " /> {/* "By" text */}
                        <Skeleton className="h-6 w-32 bg-primary" />{' '}
                        {/* Author name */}
                    </div>

                    {/* Genre */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-12" /> {/* "Genre" text */}
                        <Skeleton className="h-6 w-24 bg-primary" />{' '}
                        {/* Genre value */}
                    </div>

                    {/* Rating */}
                    <div className="flex flex-row items-center gap-1">
                        <Skeleton className="h-6 w-6" /> {/* Star icon */}
                        <Skeleton className="h-6 w-12 bg-primary" />{' '}
                        {/* Rating value */}
                    </div>
                </div>

                {/* Book copies skeleton */}
                <div className="book-copies space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-24" />{' '}
                        {/* "Total Books" text */}
                        <Skeleton className="h-6 w-8 bg-primary" />{' '}
                        {/* Total copies value */}
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-32" />{' '}
                        {/* "Available Books" text */}
                        <Skeleton className="h-6 w-8 bg-primary" />{' '}
                        {/* Available copies value */}
                    </div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                </div>
            </div>
        </section>
    );
};

export default BookOverviewSkeleton;

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-muted opacity-30',
                className,
            )}
            {...props}
        />
    );
}
