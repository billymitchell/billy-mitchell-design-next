const services = [
  {
    title: 'Web Design & E-commerce',
    iconPath: 'M8 7l-5 5 5 5m8-10 5 5-5 5m-3-13-2 16',
    description: 'Launch a new website, redesign an existing one, or extend your Shopify store. We design and build responsive websites, custom themes, and storefront features.',
  },
  {
    title: 'Applications & Internal Tools',
    iconPath: 'M3 4h18v16H3zM3 8h18M9 8v12m3-8h6m-6 4h4',
    description: 'Build a web application or internal tool around a workflow your team manages every day. We design the interface and develop the features your staff or customers need to get things done.',
  },
  {
    title: 'Automation & API Integrations',
    iconPath: 'M3 4h6v6H3zm12 10h6v6h-6zM9 7h5a4 4 0 0 1 4 4v3m-3-3 3 3 3-3',
    description: 'Connect the systems you already use and reduce manual work. We build custom APIs and microservices for tasks such as validating credentials, syncing product data, and automating order and shipping workflows.',
  },
  {
    title: 'Brand Identity',
    iconPath: 'M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z',
    description: 'Create or refresh your visual identity with a logo, color palette, and typography that work across your website, storefront, and marketing materials.',
  },
];

export default function FetchServices() {
  return services.map(({ title, iconPath, description }) => (
    <article key={title} className="service padding-top-30 padding-bottom-30 padding-left-20 padding-right-20 border border-solid border-width-1 border-color-white bg-green-dark-4">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={iconPath} />
      </svg>
      <h3 className="margin-top-20">{title}</h3>
      <p>{description}</p>
    </article>
  ));
}
