const CLOUD = 'https://res.cloudinary.com/billymitchell';

// Cloudinary refuses to transform very large videos on the fly, so anything
// over this size is served as the original file.
const MAX_TRANSFORMABLE_VIDEO_BYTES = 40 * 1024 * 1024;

export const isVideoFile = (url) =>
  !!url && /\.(mp4|webm|ogg|mov|avi)$/i.test(url);

/** Insert a transformation string into an existing Cloudinary delivery URL. */
export const withTransform = (url, transformation) =>
  url.replace('/upload/', `/upload/${transformation}/`);

/** URL for an image in the portfolio folder, resized and auto-formatted. */
export const portfolioImageUrl = (filename, width) =>
  `${CLOUD}/image/upload/f_auto,q_auto,c_limit,w_${width}/portfolio/${filename}`;

export const portfolioImageSrcSet = (filename, widths) =>
  widths.map((width) => `${portfolioImageUrl(filename, width)} ${width}w`).join(', ');

/** 1200x630 social share crop of a portfolio image. */
export const portfolioOgImageUrl = (filename) =>
  `${CLOUD}/image/upload/f_jpg,q_auto,c_fill,g_auto,w_1200,h_630/portfolio/${filename}`;

/** Optimised image URL for a gallery asset returned by the Cloudinary API. */
export function galleryImageUrl(asset, width) {
  // SVGs are already tiny and vector; leave them alone.
  if (asset.format === 'svg') return asset.secure_url;
  // PDFs are delivered as an image of their first page.
  if (asset.format === 'pdf') {
    return withTransform(
      asset.secure_url.replace(/\.pdf$/i, '.jpg'),
      `pg_1,f_auto,q_auto,c_limit,w_${width}`
    );
  }
  return withTransform(asset.secure_url, `f_auto,q_auto,c_limit,w_${width}`);
}

/** Still frame used as the poster/thumbnail for a gallery video. */
export const galleryVideoPosterUrl = (asset, width = 800) =>
  withTransform(
    asset.secure_url.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '.jpg'),
    `so_0,f_jpg,q_auto,c_limit,w_${width}`
  );

/** Playback sources for a gallery video. */
export function galleryVideoSources(asset) {
  if (asset.bytes > MAX_TRANSFORMABLE_VIDEO_BYTES) {
    return [{ src: asset.secure_url, type: `video/${asset.format === 'mov' ? 'quicktime' : asset.format}` }];
  }
  return [
    {
      src: withTransform(
        asset.secure_url.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '.mp4'),
        'q_auto,c_limit,w_1280'
      ),
      type: 'video/mp4',
    },
  ];
}
