import { Outfit, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import FloatingActions from '../components/FloatingActions';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-heading' });
const inter = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'Radiance Dentistry | Best Dental Clinic in Vesu, Surat',
  description: 'Experience world-class dentistry with Dr. Ruchi Jain in Vesu, Surat. Advanced technology meets compassionate care for a pain-free, perfect smile.',
};

import SchemaMarkup from '../components/SchemaMarkup';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <SchemaMarkup />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
