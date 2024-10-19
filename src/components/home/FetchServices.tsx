import InViewAnimationTwo from "../utilities/InViewAnimationTwo"

let airtable_base_api_URL = "https://api.airtable.com/v0"
let airtable_base_id = "appvr5KrgKiJo1E7M"
let portfolio_table_id = "tblP47ZjTFmoBkeDl"
let api_token = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN

const AirtableFetch = async function () {
  // const [portfolio_data, blog_data] = await Promise.all([get_portfolio(), get_blogs()])
  const get_data = async function getData() {
    // URL Builder
    // https://codepen.io/airtable/full/MeXqOg
    const response = await fetch(`${airtable_base_api_URL}/${airtable_base_id}/${portfolio_table_id}`, {
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
  return (
    data.records.map((service, index) => (
      <div key={service.fields["Services Order"]}>
        <InViewAnimationTwo
          rootMargin="-25% 0%"
          animationdelay={`delay-${(index * 50) + 200}ms`}
          className="init-invisible" animation={undefined} duration={undefined} fillmode={undefined} easing={undefined} iteration={undefined} threshold={undefined}>
          <div className="block service padding-top-30 padding-bottom-30 padding-left-20 padding-right-20 border border-solid border-width-1 border-color-white bg-green-dark-4 small-padding-top-20 mall-padding-bottom-20 small-padding-left-18 small-padding-right-18">
            <img className="block center w-25" src={`https://res.cloudinary.com/billymitchell/image/upload/q_auto:best/${service.fields["Services Image"]}`} alt={service.fields["Services Name"]}></img>
            <small className="text-center block margin-bottom-0 margin-top-20">{service.fields["Services Name"]}</small>
          </div>
        </InViewAnimationTwo>
      </div>
    ))
  )
}

export default AirtableFetch




