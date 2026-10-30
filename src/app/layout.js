import '../styles/global.scss';
import Footer from '../components/footer';
import ParallaxContextProvider from '../components/utilities/ParallaxContextProvider';
import { Mulish } from 'next/font/google';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-mulish',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.variable}>
        <div className="outer-wrapper">
          <div className="main-container">
            <ParallaxContextProvider>{children}</ParallaxContextProvider>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
