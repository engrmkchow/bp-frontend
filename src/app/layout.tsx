import '../styles/globals.css';
import Header from '@/components/header/Header';

export default function BPLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Header />
      <head />
      <body>{children}</body>
    </html>
  );
}
