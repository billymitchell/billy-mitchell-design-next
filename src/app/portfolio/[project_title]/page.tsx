import React from "react"
import Layout from "../../layout"
//import MetaData from "../components/layout/header/mettadata"

const IfLiveURL = function (data) {
    if (data.allAirtable.nodes[0].data.Live_Web_Project_URL !== null) {
        return (
            <>
                <span>
                    <b>Live Project URL:</b>{" "}
                </span>
                <a target="_blank" rel="noreferrer" href={data.allAirtable.nodes[0].data.Live_Web_Project_URL}>
                    {data.allAirtable.nodes[0].data.Live_Web_Project_URL}
                </a>
                <br />
            </>
        )
    } else {
        return (<></>)
    }
}

const IfGitHubURL = function (data) {
    if (data.allAirtable.nodes[0].data.Github_URL !== null) {
        return (
            <>
                <span><b>GitHub Code Repository:</b>{" "}
                </span>
                <a target="_blank" rel="noreferrer" href={data.allAirtable.nodes[0].data.GitHub_URL}>
                    {data.allAirtable.nodes[0].data.GitHub_URL}
                </a>
                <br />
            </>
        )
    } else {
        return (<></>)
    }
}

const IfPosition = function (data) {
    if (data.allAirtable.nodes[0].data.Position_on_Project !== null) {
        return (
            <>
                <span>
                    <b>Position:</b>{" "}
                </span>
                <span>
                    {data.allAirtable.nodes[0].data.Position_on_Project}
                </span>
                <br />
            </>
        )
    }
}

const renderHeader = function (data) {
    console.log(data.allAirtable.nodes[0].data.Hide_Featured_Image_In_Body)
    // If  custom html header, show header
    if (data.allAirtable.nodes[0].data.Custom_HTML) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data.allAirtable.nodes[0].data.Custom_HTML,
                }}
            ></div>
        )
    } else if (
        // if no html header & hide featured image is true
        data.allAirtable.nodes[0].data.Hide_Featured_Image_In_Body === true
    ) {
        // Don't show anything
        return <></>
    } else {
        // if condition 1 & 2 are false
        // Show featured image
        return (
            <>
                <img
                    className="fetched-header"
                    src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:best/portfolio/${data.allAirtable.nodes[0].data.Featured_Image_URL}`}
                    alt={data.allAirtable.nodes[0].data.Project_Title}
                ></img>
            </>
        )
    }
}

const ifCustomBodyHTML = function (data) {
    if (data.allAirtable.nodes[0].data.Body_Text) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data.allAirtable.nodes[0].data.Body_Text,
                }}
            ></div>
        )
    } else {
        return (<></>)
    }
}


const ifIntroText = function (data) {
    if (data.allAirtable.nodes[0].data.Intro_Text) {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: data.allAirtable.nodes[0].data.Intro_Text,
                }}
            ></div>
        )
    } else {
        return (<></>)
    }
}

// const checkData = function (data) {
//   console.log(data)
//   {data.allAirtable.nodes[0].data.Creative_Discipline.map(Creative_Discipline => (
//     console.log({Creative_Discipline})
//   ))}
// }

export const query = graphql`
query ($Project_Title: String) {
  allAirtable (filter: {table: {eq: "Project"}, data: {Project_Title: {eq: $Project_Title}}}) {
    nodes {
      data {
        Project_Title
        End_Date(formatString: "MMMM DD, YYYY")
        Live_Web_Project_URL
        GitHub_URL
        Creative_Discipline
        Job_Type
        Made_For {
          recordId
          data {
            Company_Name
          }
        }
        Position_on_Project
        Featured_Image_URL
        Body_Text
        Custom_HTML
        Hide_Featured_Image_In_Body
        Made_With
        Intro_Text
      }
    }
  }
}
`



const Portfolio = ({ selected_portfolio_item }) => (
    <>
        {/* {checkData(data)} */}
        <div id="portfolio" className="bg-black">
            <MetaData
                title={data.allAirtable.nodes[0].data.Project_Title}
                description={data.allAirtable.nodes[0].data.Made_For.map(item => (
                    <>
                        <span className="Company"> | {item.data.Company_Name}</span>
                    </>
                ))}
                url={`/portfolio/project/${data.allAirtable.nodes[0].data.slug}`}
                // To Do: Add Fallback Meta Image If No Featured Image
                socialimg={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/portfolio/${data.allAirtable.nodes[0].data.Featured_Image_URL}`}
            />
            <Layout>
                <div className="portfolio-header-container">
                    {/* To Do: Add Fallback Header If No Featured Image*/}
                    <div className="image-container">

                        <img
                            className="portfolio-header"
                            src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/portfolio/${data.allAirtable.nodes[0].data.Featured_Image_URL}`}
                            alt={data.allAirtable.nodes[0].data.Project_Title}
                        ></img>

                    </div>
                    <h2>{data.allAirtable.nodes[0].data.Project_Title}</h2>
                </div>
                <div className="outer-container-body">
                    <div className="inner-text-width">
                        <div className="portfolio-meta-data">
                            <p>
                                <span>
                                    <b>Completed:</b> {data.allAirtable.nodes[0].data.End_Date}
                                </span><br />
                                {IfLiveURL(data)}
                                <span>
                                    {IfGitHubURL(data)}
                                </span>
                                <span>
                                    <b>Creative Discipline:</b>{" "}


                                    {data.allAirtable.nodes[0].data.Creative_Discipline.map(Creative_Discipline => (

                                        <span>
                                            {" "}
                                            | {Creative_Discipline}
                                        </span>

                                    ))}
                                </span><br />
                                <span>
                                    <b>Job Type:</b> {data.allAirtable.nodes[0].data.Job_Type}
                                </span><br />
                                <span>
                                    <b>Made for:</b>{" "}
                                    {data.allAirtable.nodes[0].data.Made_For.map(item => (

                                        <span className="Company">
                                            {" "}
                                            | {item.data.Company_Name}
                                        </span>

                                    ))}
                                </span><br />
                                {IfPosition(data)}
                                <span>
                                    <b>Made With:</b>{" "}
                                    {data.allAirtable.nodes[0].data.Made_With.map(Made_With => (

                                        <span className="Company">
                                            {" "}
                                            | {Made_With}
                                        </span>

                                    ))}
                                </span><br />
                            </p>
                        </div>
                        <div className="intro-text">
                            {ifIntroText(data)}
                        </div>
                    </div>
                    <div className="inner-width">{renderHeader(data)}</div>
                    <div className="inner-text-width imported-text">
                        {ifCustomBodyHTML(data)}
                    </div>
                </div>
            </Layout>
        </div>
    </>
)

export default Portfolio
