import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ModGen.js',
    description: 'Code generator',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang='en'>
        <body className={`${inter.className} min-h-screen`}>
            <Providers>{children}</Providers>
        </body>
    </html>
);

export default RootLayout;
