// fetchPortfolioData.js
export async function fetchPortfolioData() {
    const airtable_base_api_URL = "https://api.airtable.com/v0";
    const airtable_base_id = "appvr5KrgKiJo1E7M";
    const portfolio_table_id = "tbl3ySVeDHggX6AnR";
    const api_token = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;

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
    return data.records.map(record => record.fields);
}
