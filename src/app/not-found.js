import Link from 'next/link';
import Header from '../components/header';

export const metadata = {
  title: 'Page Not Found - Billy Mitchell Design & Development',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="bg-black">
      <Header />
      <div className="outer-container">
        <div className="inner-text-width text-center padding-top-100 padding-bottom-100">
          <h1>Page not found</h1>
          <p>
            That page doesn&apos;t exist or has moved. Head back{' '}
            <Link href="/">home</Link> or browse the{' '}
            <Link href="/portfolio">portfolio</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
