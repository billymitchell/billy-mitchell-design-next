export const SITE_URL = 'https://billymitchell.design';
export const SITE_NAME = 'Billy Mitchell Design'; // public brand (DBA)
export const LEGAL_NAME = 'Mitchell Design LLC';
export const OG_IMAGE = '/files/open-graph.png';

// The one and only slug function. Used for links, static params, the sitemap,
// canonical URLs and project lookups so they can never drift apart again.
export const getProjectSlug = (title) =>
  String(title)
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Slug formats used before the unification. Kept only so old URLs (already
// linked or indexed) can be permanently redirected to the canonical slug.
export const getLegacyProjectSlugs = (title) => {
  const lower = String(title).toLowerCase();
  return [
    // old on-site link format
    lower
      .replace('&', 'and')
      .replace('/', '')
      .replace(',', '')
      .replace(':', '')
      .replace(/\s/gi, '-')
      .trim(),
    // old sitemap / generateStaticParams format
    lower.replace(/[\s&/:]/g, '-'),
  ];
};

// Safely serialise JSON-LD for use inside a <script> tag.
export const jsonLd = (data) =>
  JSON.stringify(data).replace(/</g, '\\u003c');
