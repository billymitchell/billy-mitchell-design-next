"use client"
let airtable_base_api_URL = "https://api.airtable.com/v0"
let airtable_base_id = "appvr5KrgKiJo1E7M"
let portfolio_table_id = "tbl3ySVeDHggX6AnR"
let api_token = process.env.AIR_TABLE_TOKEN
import Masonry from "react-masonry-css"
import InViewAnimationTwo from "../../../../components/utilities/InViewAnimationTwo"


const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

const fetchData = async () => {
  const response = await fetch(`${airtable_base_api_URL}/${airtable_base_id}/${portfolio_table_id}`, {
      method: "GET",
      headers: {
          'Authorization': `Bearer ${api_token}`,
      },
      redirect: "follow",
  });
  if (!response.ok) {
      console.error('Failed to fetch data');
      return null;
  }
  const data = await response.json();
  return data;
};

//Return an image if there is one, else just the title
const IfFeaturedImage = function (node) {
  if (node.data.Featured_Image_URL) {
    return (
      <>
        <img
          className="fluid"
          id={node.recordId}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,f_auto,q_auto:good/portfolio/${node.data.Featured_Image_URL}`}
          alt={node.data.Project_Title}
        />
        <p className="title">
          <strong>{node.data.Project_Title}</strong>
        </p>
      </>
    )
  } else {
    return (
      <p className="title-no-featured-image">
        <strong>{node.data.Project_Title}</strong>
      </p>
    )
  }
}

const AllWork = () => (
  <StaticQuery
    query={graphql`
    {
      allAirtable(filter: {table: {eq: "Project"}, data: {Published: {eq: true}, Featured: {ne: true}}}, sort: {order: DESC, fields: data___End_Date}) {
        nodes {
          recordId
          data {
            Project_Title
            Featured_Image_URL
            End_Date(formatString: "MM-YYYY")
            Featured
          }
        }
      }
    }
    `}
    render={data => (
      <div className="portfolio-item-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data.allAirtable.nodes.map((node, index) => (
            <InViewAnimationTwo rootMargin="-8% 0%"
              animationdelay={`delay-${((index * 50) + 200)}ms`}
              className="init-invisible"
            >
              <div
                key={node.recordId}
                id={node.recordId}
                className="portfolio-item"
              >
                <Link to={`/portfolio/${node.data.Project_Title.toLowerCase().replace('&', 'and').replace(/\s/gi, '-').replace("/", "").replace(" / ", "")}`}>
                  {IfFeaturedImage(node)}
                </Link>
              </div>
            </InViewAnimationTwo>
          ))}
        </Masonry>
      </div>
    )}
  />
)

export default AllWork;