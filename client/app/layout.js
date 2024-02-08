import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer.jsx';
import ChildrenProvider from '@/context/ChildrenProvider.jsx';
import Header from '@/components/Header.jsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Fiverr Clone',
  description: 'Fiverr Clone'
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ChildrenProvider>
          <Header /> {children}
          <Footer />
        </ChildrenProvider>
      </body>
    </html>
  );
}
