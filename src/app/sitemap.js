import { publishedProjects } from '../components/utilities/projects';
import { getProjectSlug, SITE_URL } from './seo';

export default function sitemap() {
  const projectUrls = publishedProjects.map((project) => {
    const modified = project.fields['Date Modified'];
    return {
      url: `${SITE_URL}/portfolio/${getProjectSlug(
        project.fields['Project Title']
      )}`,
      ...(modified ? { lastModified: new Date(modified) } : {}),
    };
  });

  const latest = projectUrls
    .map((entry) => entry.lastModified)
    .filter(Boolean)
    .sort((a, b) => b - a)[0];
  const siteModified = latest ? { lastModified: latest } : {};

  return [
    { url: `${SITE_URL}/`, ...siteModified },
    { url: `${SITE_URL}/portfolio`, ...siteModified },
    { url: `${SITE_URL}/contact` },
    ...projectUrls,
  ];
}
