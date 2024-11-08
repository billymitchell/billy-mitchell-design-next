// src/app/portfolio/ProjectDisciplineButtons.tsx

// Import the pre-fetched Airtable data
import { airtableData } from '@/components/utilities/getAirtableData';

interface ProjectDisciplineButtonsProps {
    onDisciplineSelect: (discipline: string) => void;
}

const ProjectDisciplineButtons = ({ onDisciplineSelect }: ProjectDisciplineButtonsProps) => {
    // Access projects data from airtableData
    const { projectsData } = airtableData;

    const allDisciplines = ["Design", "Development", "Marketing"];
    const uniqueDisciplines = new Set(allDisciplines);

    // Convert the Set to an array before iterating
    const uniqueDisciplinesArray = Array.from(uniqueDisciplines);

    for (const discipline of uniqueDisciplinesArray) {
        console.log(discipline);
    }

    return (
        <>
            {uniqueDisciplinesArray.map((discipline, index) => (
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
