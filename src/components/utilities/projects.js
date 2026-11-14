import projectsData from './data/projectsData.json';
import cloudinaryData from './data/cloudinaryData.json';
import { getProjectSlug, getLegacyProjectSlugs } from '../../app/seo';

export const publishedProjects = projectsData.filter(
  (project) => project.fields.Published
);

const safeDecode = (value) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/**
 * Resolve a URL slug to a project.
 * Returns { project, slug, isLegacy } where `slug` is always the canonical
 * slug and `isLegacy` is true when the request used an old URL format.
 */
export function findProjectBySlug(rawSlug) {
  const requested = safeDecode(String(rawSlug || ''));

  for (const project of publishedProjects) {
    const slug = getProjectSlug(project.fields['Project Title']);
    if (slug === requested) return { project, slug, isLegacy: false };
  }

  for (const project of publishedProjects) {
    const title = project.fields['Project Title'];
    if (getLegacyProjectSlugs(title).includes(requested)) {
      return { project, slug: getProjectSlug(title), isLegacy: true };
    }
  }

  return null;
}

const cloudinaryAssets = new Map(
  Object.values(cloudinaryData)
    .flat()
    .map((asset) => [asset.public_id, asset])
);

/** Width/height of a project's featured image, when Cloudinary knows it. */
export function getFeaturedImageDimensions(fields) {
  const imageUrl = fields['Featured Image URL'];
  if (!imageUrl) return null;
  const publicId = `portfolio/${safeDecode(imageUrl)}`;
  const asset =
    cloudinaryAssets.get(publicId) ||
    cloudinaryAssets.get(publicId.replace(/\.[^.]+$/, ''));
  return asset ? { width: asset.width, height: asset.height } : null;
}

/** Plain-text excerpt from an HTML field, for meta descriptions. */
export function toPlainText(html, maxLength = 160) {
  const text = String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, '')}…`;
}
