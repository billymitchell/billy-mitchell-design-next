import projectsData from '../components/utilities/data/projectsData.json';
import { getProjectSlug, SITE_URL } from './seo';

export default function sitemap() {
  const projectUrls = projectsData
    .filter((project) => project.fields.Published)
    .map((project) => ({
      url: `${SITE_URL}/portfolio/${getProjectSlug(
        project.fields['Project Title']
      )}`,
    }));

  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/portfolio` },
    ...projectUrls,
  ];
}
