// src/app/portfolio/ProjectDisciplineButtons.tsx

import React from 'react';
import { airtableData } from "@/components/utilities/getAirtableData"; // Import the Airtable data

interface ProjectDisciplineButtonsProps {
    onDisciplineSelect: (discipline: string) => void;
}

const ProjectDisciplineButtons: React.FC<ProjectDisciplineButtonsProps> = ({ onDisciplineSelect }) => {
    // Access projects data from airtableData
    const { projectsData } = airtableData;

    // Step 1: Extract the 'Creative Discipline' field from each project that is published and featured, and add them to an array
    const allDisciplines: string[] = [];
    projectsData.forEach((project) => {
        if (project.fields.Published && project.fields.Featured) { // Check if the project is published and featured
            const disciplines = project.fields["Creative Discipline"];
            if (Array.isArray(disciplines)) {
                disciplines.forEach((discipline) => {
                    allDisciplines.push(discipline);
                });
            }
        }
    });

    // Step 2: Create a unique array of disciplines using a Set
    const uniqueDisciplinesArray = Array.from(new Set(allDisciplines));

    return (
        <>
            {uniqueDisciplinesArray.map((discipline, index) => (
                <button key={index} onClick={() => onDisciplineSelect(discipline)}>
                    {discipline}
                </button>
            ))}
        </>
    );
};

export default ProjectDisciplineButtons;
