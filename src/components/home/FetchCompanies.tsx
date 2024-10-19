let airtable_base_api_URL = "https://api.airtable.com/v0"
let airtable_base_id = "appvr5KrgKiJo1E7M"
let portfolio_table_id = "tblhfc3tSqTRUwTzI"
let api_token = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN
//import Image from 'next/image'


const AirtableFetch = async function () {
  // const [portfolio_data, blog_data] = await Promise.all([get_portfolio(), get_blogs()])
  const get_data = async function getData() {
    // "use server"
    // URL Builder
    // https://codepen.io/airtable/full/MeXqOg
    const response = await fetch(`${airtable_base_api_URL}/${airtable_base_id}/${portfolio_table_id}?sort%5B0%5D%5Bfield%5D=Company+Name&sort%5B0%5D%5Bdirection%5D=asc&view=viwgaQ2GUF9Q6O1rM`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${api_token}`,
      },
      redirect: "follow",
    })
    if (!response.ok) {
      console.error
    }
    return response.json()
  }
  const data = await get_data()
  // data.records.forEach(portfolio_item => {
  //   console.log(portfolio_item.fields)
  // });
  return (
    <div className="companies-container grid-container col-5 col-gap-60 small-col-3 small-col-gap-25">
      {data.records.map((portfolio_item: {
        id: string | number;
        fields: {
          'Company Name': string;
          'Company Logo': string;
          // Add other fields as needed
        };
      }) => (
        <img
          // fill={true}
          key={`${portfolio_item.id}`}
          className={`companies fluid justify-self-center align-self-center ${portfolio_item.fields['Company Name']
            .toLowerCase()
            .replace('&', 'and')
            .replace(/\s/gi, '-')}`}
          src={`https://res.cloudinary.com/billymitchell/image/upload/dpr_auto,fl_lossy,q_auto/${portfolio_item.fields['Company Logo']}`}
          alt={portfolio_item.fields['Company Name']}
        // style={{ objectFit: "contain" }}
        />
      ))
      }
    </div >

  )
}

export default AirtableFetch