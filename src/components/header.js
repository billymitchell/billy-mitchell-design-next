'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BrandMark from './BrandMark';

const Header = ({ page }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (page !== 'home') return;
        const update = () => setScrolled(window.scrollY > 24);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [page]);

    return (
            <header className={page} data-scrolled={scrolled}>
                <div className="outer-container">
                <div className="gradient-top"></div>
                    <div className="inner-width header-main-container">
                   
                        <Link className="logo" href="/" aria-label="Billy Mitchell Design home">
                            <BrandMark />
                        </Link>
                  
                        <ul id="menu-items">
                            <li><Link href="/#services"><small>Services</small></Link></li>
                            <li><Link href="/portfolio"><small>Work</small></Link></li>
                            <li><Link href="/#about"><small>About</small></Link></li>
                            <li><Link href="/contact"><small>Start a Project</small></Link></li>
                        </ul>
                    </div>
                </div>
            </header>

    )
}
export default Header

