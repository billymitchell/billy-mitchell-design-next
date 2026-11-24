'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandMark from './BrandMark';

const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/portfolio', label: 'Work' },
    { href: '/#about', label: 'About' },
];

const Header = ({ page }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        if (page !== 'home') return;
        const update = () => setScrolled(window.scrollY > 24);
        update();
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, [page]);

    // Close the phone menu on navigation, Escape, or a tap outside the header.
    useEffect(() => setMenuOpen(false), [pathname]);

    useEffect(() => {
        if (!menuOpen) return;
        const onKey = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        const onPointer = (event) => {
            if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointer);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointer);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
            <header ref={headerRef} className={page} data-scrolled={scrolled} data-menu={menuOpen ? 'open' : 'closed'}>
                <div className="outer-container">
                <div className="gradient-top"></div>
                    <div className="inner-width header-main-container">

                        <Link className="logo" href="/" aria-label="Billy Mitchell Design home">
                            <BrandMark />
                        </Link>

                        <nav className="site-nav" aria-label="Main">
                            <ul id="menu-items">
                                {navLinks.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link href={href} onClick={closeMenu}><small>{label}</small></Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <Link
                            className="header-cta"
                            href="/contact"
                            aria-current={pathname === '/contact' ? 'page' : undefined}
                            onClick={closeMenu}
                        >
                            Start a Project
                        </Link>

                        <button
                            type="button"
                            className="menu-toggle"
                            aria-expanded={menuOpen}
                            aria-controls="menu-items"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                                {menuOpen
                                    ? <path d="M6 6l12 12M18 6 6 18" />
                                    : <path d="M4 7h16M4 12h16M4 17h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

    )
}
export default Header
