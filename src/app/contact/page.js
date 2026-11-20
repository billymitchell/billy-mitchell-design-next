import SeparatorTop from '../../components/separator-top';
import Header from '../../components/header';
import ProjectInquiry from './project-inquiry';
import styles from './contact.module.scss';

const title = 'Start a Project | Billy Mitchell Design & Development';
const description = 'Tell our Baltimore design and development agency what you need, from brand identity, websites, and e-commerce stores to custom applications and workflow automation.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title, description, url: '/contact' },
};

export const dynamic = 'force-dynamic';

export default function ContactPage() {
  const canReceiveInquiries = process.env.NODE_ENV === 'development' ||
    Boolean(process.env.RESEND_API_KEY || process.env.INQUIRY_DB_PATH);
  return (
    <>
      <Header page="contact" />
      <main className={styles.page}>
        <div className={styles.layout}>
          <div>
            <h1>Start a project</h1>
            <p>Tell us what you’re building or what you’d like to improve. We take on brand identity, websites and e-commerce stores, web applications, and automation projects.</p>
            <h2>What happens next</h2>
            <p>Billy will review your brief and follow up to discuss scope, timing, and how our team can help.</p>
            <p><a href="mailto:hello@billymitchell.design">hello@billymitchell.design</a></p>
          </div>
          {canReceiveInquiries && <ProjectInquiry />}
        </div>
      </main>
      <SeparatorTop className="bg-brand-dark-5 contact-footer-divider" />
    </>
  );
}
