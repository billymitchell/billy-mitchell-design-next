'use client';
import React, { useState, useEffect } from 'react';
import { fetchPortfolioButtons } from "./fetchPortfolioButtons";
import PortfolioContent from "./PortfolioContent";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useGlobalState } from '../context/fetchPortfolioData';


const Portfolio = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const discipline = searchParams.get('discipline')
    const search = searchParams.get('search');
    //const { globalState, setGlobalState } = useGlobalState();
    const [buttons, setButtons] = useState([]);
    const [selectedDiscipline, setSelectedDiscipline] = useState("Featured");
    const { globalState } = useGlobalState();
    console.log("globalState", globalState);


    useEffect(() => {
        const fetchButtons = async () => {
            const portfolioButtonData = await fetchPortfolioButtons();
            setButtons(portfolioButtonData);
        };
        fetchButtons();
    }, []);

    const onButtonClick = (event) => {
        const clickedDiscipline = event.target.getAttribute('discipline');
        if (selectedDiscipline) {
            setSelectedDiscipline(clickedDiscipline);
        }
    };

    // useEffect(() => {
    //     if (!search) {
    //         setDiscipline(""); // Fixed here
    //     } else if (search === "branding") {
    //         setDiscipline("Branding");
    //     } else if (search === "ui-design") {
    //         setDiscipline("UI Design");
    //     } else if (search === "ux-design") {
    //         setDiscipline("UX Design");
    //     } else if (search === "web-development") {
    //         setDiscipline("Web Development");
    //     } else if (search === "print-design") {
    //         setDiscipline("Print Design");
    //     } else if (search === "motion-design") {
    //         setDiscipline("Motion Design");
    //     } else if (search === "illustration") {
    //         setDiscipline("Illustration");
    //     } else if (search === "mural-art") {
    //         setDiscipline("Mural Art");
    //     }
    // }, [search]);

    return (
        <div id="portfolio" className="bg-black">
            <div className="outer-container">
                <div className="inner-width">
                    <h1>Featured Work</h1>
                    <div className='button-container'>
                        {buttons.length > 0 &&
                            buttons.map((discipline, index) => (
                                <button
                                    key={index}
                                    discipline={discipline}
                                    onClick={onButtonClick}
                                    className="button"
                                >
                                    {discipline}
                                </button>
                            ))}
                    </div>
                </div>
            </div>
            <div className="outer-container">
                <div className="inner-width-full">
                    <PortfolioContent selectedDiscipline={selectedDiscipline} />
                    <div className="text-center padding-top-15 padding-bottom-15">
                        <a href="/portfolio/all">View All Other Published Portfolio Work</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
