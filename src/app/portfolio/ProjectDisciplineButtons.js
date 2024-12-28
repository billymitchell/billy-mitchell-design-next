// src/app/portfolio/ProjectDisciplineButtons.js
import projectsData from '../../components/utilities/data/projectsData.json';

const ProjectDisciplineButtons = ({ onDisciplineSelect }) => {
  // Create an array of all disciplines
  const allDisciplines = [];
  projectsData.forEach((project) => {
    if (project.fields.Published) {
      // Check if the project is published and featured
      const disciplines = project.fields['Creative Discipline'];
     
        disciplines.forEach((discipline) => {
          allDisciplines.push(discipline);
        });
      
    }
  });

  // Step 2: Create a unique array of disciplines using a Set
  const uniqueDisciplinesArray = Array.from(new Set(allDisciplines));

  return (
    <>
      {/* ALL Button */}
      <button onClick={() => onDisciplineSelect("All")}>
          All
      </button>
      {/* Dynamically Generated Buttons Based on POrtfolio Disciplines */}
      {uniqueDisciplinesArray.map((discipline, index) => (
        <button key={index} onClick={() => onDisciplineSelect(discipline)}>
          {discipline}
        </button>
      ))}
    </>
  );
};

export default ProjectDisciplineButtons;
