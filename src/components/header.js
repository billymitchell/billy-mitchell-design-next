import BrandMark from './BrandMark';
//import React, { useEffect, useState } from 'react';
import Link from 'next/link'
//import { usePathname } from 'next/navigation';

const Header = ({page}) => {
    // const [isHome, setIsHome] = useState(false);
    // const pathname = usePathname();

    // useEffect(() => {
    //     const checkIfHome = () => {
    //         setIsHome(pathname === '/');
    //     };

    //     // Check on initial load and whenever pathname changes
    //     checkIfHome();
    // }, [pathname]);



    return (
            <header className={page}>
                <div className="outer-container">
                <div className="gradient-top"></div>
                    <div className="inner-width header-main-container">
                   
                        <Link className="logo" href="/" aria-label="Billy Mitchell Design home">
                            <BrandMark />
                        </Link>
                  
                        <ul id="menu-items" >
                       
                            <li>
                                <a data-scroll href="/#contact">
                                    <small>Contact</small>
                                </a>
                            </li>
                            <li>
                                <Link href="/portfolio">
                                    <small>Portfolio</small>
                                </Link>
                            </li>
                            <li>
                                <a href="/files/Billy-Mitchell-Resume-Design-2026.pdf" target='_blank' rel="noreferrer">
                                    <small>Resume</small>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>

    )
}
export default Header

