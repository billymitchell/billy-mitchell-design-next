// src/app/portfolio/[project_title]/page.tsx

import { airtableData } from "@/components/utilities/getAirtableData"; // Import the Airtable data

// Function to generate static paths for all projects
export async function generateStaticParams() {
    const { projectsData } = airtableData;
    return projectsData.map((project) => ({
        project_title: String(project.fields["Project Title"]).toLowerCase().replace(/[\s&/]/g, "-"),
    }));
}

// Helper functions
const IfLiveURL = (data: any) => {
    if (data["Live Web Project URL"]) {
        return (
            <>
                <span>
                    <b>Live Project URL:</b>{" "}
                </span>
                <a target="_blank" rel="noreferrer" href={data["Live Web Project URL"]}>
                    {data["Live Web Project URL"]}
                </a>
                <br />
            </>
        );
    }
    return null;
};

const IfGitHubURL = (data: any) => {
    if (data["Github URL"]) {
        return (
            <>
                <span>
                    <b>GitHub Code Repository:</b>{" "}
                </span>
                <a target="_blank" rel="noreferrer" href={data["Github URL"]}>
                    {data["Github URL"]}
                </a>
                <br />
            </>
        );
    }
    return null;
};

const IfPosition = (data: any) => {
    if (data["Position on Project"]) {
        return (
            <>
                <span>
                    <b>Position:</b>{" "}
                </span>
                <span>{data["Position on Project"]}</span>
                <br />
            </>
        );
    }
    return null;
};

const renderHeader = (data: any) => {
    if (data["Custom HTML"]) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data["Custom HTML"],
                }}
            ></div>
        );
    } else if (data["Hide Featured Image In Body"] === true) {
        return null;
    } else {
        return (
            <img
                className="fetched-header"
                src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:best/portfolio/${data["Featured Image URL"]}`}
                alt={String(data["Project Title"])}
            />
        );
    }
};

const ifCustomBodyHTML = (data: any) => {
    if (data["Body Text"]) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data["Body Text"],
                }}
            ></div>
        );
    }
    return null;
};

const ifIntroText = (data: any) => {
    if (data["Intro Text"]) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data["Intro Text"],
                }}
            ></div>
        );
    }
    return null;
};

// Server Component to render the project page
export default function PortfolioContent({ params }: { params: { project_title: string } }) {
    const { projectsData, companiesData } = airtableData;

    // Format the project title from params to match the data
    const projectTitle = params.project_title.replace(/-/g, " ").toLowerCase().trim();

    // Use a more robust comparison to match the project title
    const project = projectsData.find(
        (item) => typeof item.fields["Project Title"] === 'string' && item.fields["Project Title"].toLowerCase().trim() === projectTitle
    );

    if (!project) {
        return <p>Project not found.</p>;
    }

    const data = project.fields;

    // Find company names for the "Made For" field
    const companyNames = Array.isArray(data["Made For"]) ? data["Made For"].map((companyId: string) => {
        const company = companiesData.find((item) => item.id === companyId);
        return company ? company.fields["Company Name"] : "Unknown Company";
    }) : [];

    return (
        <div id="portfolio" className="bg-black">
            <div className="portfolio-header-container">
                <div className="image-container">
                    <img
                        suppressHydrationWarning
                        className="portfolio-header"
                        src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/portfolio/${data["Featured Image URL"]}`}
                        alt={String(data["Project Title"])}
                    />
                </div>
                <h2>{String(data["Project Title"])}</h2>
            </div>
            <div className="outer-container-body">
                <div className="inner-text-width">
                    <div className="portfolio-meta-data">
                        <p>
                            <span>
                                <b>Completed:</b> {String(data["End Date"])}
                            </span>
                            <br />
                            {IfLiveURL(data)}
                            {IfGitHubURL(data)}
                            <span>
                                <b>Creative Discipline:</b>{" "}
                                {Array.isArray(data["Creative Discipline"]) && data["Creative Discipline"].filter((discipline): discipline is string => typeof discipline === 'string').map((discipline: string, index: number) => (
                                    <span key={index}> | {discipline}</span>
                                ))}
                            </span>
                            <br />
                            <span>
                                <b>Job Type:</b> {String(data["Job Type"])}
                            </span>
                            <br />
                            <span>
                                <b>Made for:</b>{" "}
                                {companyNames.filter((name): name is string => typeof name === 'string').map((name: string, index: number) => (
                                    <span key={index} className="Company">
                                        {" "}
                                        | {name}
                                    </span>
                                ))}
                            </span>
                            <br />
                            {IfPosition(data)}
                            <span>
                                <b>Made With:</b>{" "}
                                {Array.isArray(data["Made With"]) && data["Made With"].filter((tech): tech is string => typeof tech === 'string').map((tech: string, index: number) => (
                                    <span key={index} className="Company">
                                        {" "}
                                        | {tech}
                                    </span>
                                ))}
                            </span>
                            <br />
                        </p>
                    </div>
                    <div className="intro-text">{ifIntroText(data)}</div>
                </div>
                <div className="inner-width">{renderHeader(data)}</div>
                <div className="inner-text-width imported-text">{ifCustomBodyHTML(data)}</div>
            </div>
        </div>
    );
}
