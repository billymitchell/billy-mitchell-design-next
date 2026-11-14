import '../styles/global.scss';
import Footer from '../components/footer';
import ParallaxContextProvider from '../components/utilities/ParallaxContextProvider';
import { Mulish } from 'next/font/google';
import { OG_IMAGE, SITE_NAME, SITE_URL } from './seo';

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-mulish',
});

// Site-wide defaults. Pages override what they need.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_NAME,
  description:
    'Creative web design, development, and digital solutions by Billy Mitchell, a multidisciplinary designer in Baltimore, Maryland.',
  icons: {
    icon: '/files/favicon.ico',
  },
  openGraph: {
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
};

// Content that animates in on scroll starts hidden; show it when JS is off.
const noScriptStyles =
  '.init-invisible{opacity:1}.init-width-none{width:100%}.init-height-none{height:100%}';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mulish.variable}>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
        </noscript>
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
