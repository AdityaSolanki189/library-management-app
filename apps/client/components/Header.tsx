'use client';

import { cn } from '@repo/ui/global.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import logo from '@repo/ui/icons/logo.svg';
import SignOutButton from './SignOutButton';

const Header = () => {
    const pathname = usePathname();

    return (
        <header className="my-10 flex justify-between gap-3">
            <Link href={'/'} className="flex justify-center items-center gap-5">
                <Image src={logo} alt="logo" width={40} height={40} />
                <h1 className="font-ibm-plex-sans text-3xl text-primary">
                    BookShelf
                </h1>
            </Link>

            <ul className="flex flex-row items-center gap-8">
                <li>
                    <Link
                        href={'/dashboard/library'}
                        className={cn(
                            'text-base cursor-pointer capitalize hover:underline',
                            pathname === '/dashboard/library'
                                ? 'text-light-200'
                                : 'text-light-100',
                        )}
                    >
                        Library
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/dashboard/authors'}
                        className={cn(
                            'text-base cursor-pointer capitalize hover:underline',
                            pathname === '/dashboard/authors'
                                ? 'text-light-200'
                                : 'text-light-100',
                        )}
                    >
                        Authors
                    </Link>
                </li>
                <li>
                    <Link
                        href={'/dashboard/genres'}
                        className={cn(
                            'text-base cursor-pointer capitalize hover:underline',
                            pathname === '/dashboard/genres'
                                ? 'text-light-200'
                                : 'text-light-100',
                        )}
                    >
                        Genres
                    </Link>
                </li>
                <li>
                    <SignOutButton />
                </li>
            </ul>
        </header>
    );
};

export default Header;
