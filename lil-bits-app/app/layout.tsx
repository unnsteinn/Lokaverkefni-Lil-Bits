import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/lib/utils';
import { NavigationMenuDemo } from '@/components/navigation-bar';
import Logo from '@/public/lil-bits.svg';
import Image from 'next/image';

interface RootLayoutProps {
    children: React.ReactNode;
}

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                style={{ backgroundColor: '#faedcd' }}
                className={cn(
                    'min-h-screen mx-4 sm:mx-8 md:mx-20 lg:mx-40 my-10 sm:my-20 bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <a href="/" className="flex justify-center">
                    <Image
                        className="w-max sm:w-3/4 md:1/2"
                        src={Logo}
                        alt="Lil-bits logo"
                        width={50}
                        height={50}
                    ></Image>
                </a>

                <div>
                    <div className="flex justify-between my-5 lg:px-4">
                        <NavigationMenuDemo />
                    </div>
                </div>
                {children}
            </body>
        </html>
    );
}
