export async function fetchPortfolioButtons() {
    const airtable_base_api_URL = "https://api.airtable.com/v0";
    const airtable_base_id = "appvr5KrgKiJo1E7M";
    const portfolio_table_id = "tbl3ySVeDHggX6AnR";
    const api_token = process.env.NEXT_PUBLIC_AIR_TABLE_TOKEN;

    if (!api_token) {
        console.error("API token is missing.");
        return [];
    }

    console.log('API Token:', api_token);

    const response = await fetch(`${airtable_base_api_URL}/${airtable_base_id}/${portfolio_table_id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${api_token}`,
        },
        redirect: "follow",
    });

    if (!response.ok) {
        console.error('Failed to fetch data:', response.statusText);
        return [];
    }

    const data = await response.json();
    let allDisciplines = [];



    data.records.forEach(portfolioItem => {
        if (portfolioItem.fields.Published && portfolioItem.fields.Featured) {
            portfolioItem.fields["Creative Discipline"].forEach(discipline => {
                allDisciplines.push(discipline);
            });
        }
    });


    return [...new Set(allDisciplines)];
}
