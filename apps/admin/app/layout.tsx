import type { Metadata } from 'next';
import localFont from 'next/font/local';
import "@repo/ui/globals.css";
import { Toaster } from "@repo/ui/sonner";

const ibmPlexSans = localFont({
    src: [
        {
            path: '/fonts/IBMPlexSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '/fonts/IBMPlexSans-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: '/fonts/IBMPlexSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        { path: '/fonts/IBMPlexSans-Bold.ttf', weight: '700', style: 'normal' },
    ],
});

const bebasNeue = localFont({
    src: [
        {
            path: '/fonts/BebasNeue-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--bebas-neue',
});

export const metadata: Metadata = {
    title: 'Bookshelf Admin',
    description:
        'Bookshelf Admin is a book borrowing university library management solution',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
            >
                <Toaster />
                {children}
            </body>
        </html>
    );
}
