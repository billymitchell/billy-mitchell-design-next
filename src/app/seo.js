export const SITE_URL = 'https://billymitchell.design';

export const getProjectSlug = (title) =>
  String(title).toLowerCase().replace(/[\s&/:]/g, '-');
