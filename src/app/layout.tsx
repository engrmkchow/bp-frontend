import '../styles/globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function BPLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Header />
      
      <head />
      <body className='bg-slate-900'>{children}</body>
      
      <Footer />
    </html>
  );
}
