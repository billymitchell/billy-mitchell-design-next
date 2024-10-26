// src/app/portfolio/ProjectDisciplineButtons.tsx
'use client';

import { useGlobalState } from "@/app/context/setGlobalState";

interface ProjectDisciplineButtonsProps {
    onDisciplineSelect: (discipline: string) => void;
}

const ProjectDisciplineButtons = ({ onDisciplineSelect }: ProjectDisciplineButtonsProps) => {
    const { globalState } = useGlobalState();

    const portfolioData = globalState?.projectsData || [];


    let allDisciplines: string[] = [];

    portfolioData.forEach(portfolioItem => {

        if (portfolioItem.fields.Published && portfolioItem.fields.Featured) {

            portfolioItem.fields["Creative Discipline"]?.forEach((discipline: string) => {
                allDisciplines.push(discipline);
            });
        }
    });

    const uniqueDisciplines = [...new Set(allDisciplines)];

    return (
        <>
            {uniqueDisciplines.map((discipline, index) => (
                <button
                    key={index}
                    className="button"
                    onClick={() => onDisciplineSelect(discipline)}
                >
                    {discipline}
                </button>
            ))}
        </>
    );
};

export default ProjectDisciplineButtons;
