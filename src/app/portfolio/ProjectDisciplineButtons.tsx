// src/app/portfolio/ProjectDisciplineButtons.tsx

// Import the pre-fetched Airtable data
import { airtableData } from '@/components/utilities/getAirtableData';

interface ProjectDisciplineButtonsProps {
    onDisciplineSelect: (discipline: string) => void;
}

const ProjectDisciplineButtons = ({ onDisciplineSelect }: ProjectDisciplineButtonsProps) => {
    // Access projects data from airtableData
    const { projectsData } = airtableData;

    let allDisciplines: string[] = [];

    // Collect all disciplines from published and featured projects
    projectsData.forEach(portfolioItem => {
        if (portfolioItem.fields.Published && portfolioItem.fields.Featured) {
            portfolioItem.fields["Creative Discipline"]?.forEach((discipline: string) => {
                allDisciplines.push(discipline);
            });
        }
    });

    // Create a unique list of disciplines
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
