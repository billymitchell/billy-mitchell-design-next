"use client";
import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  galleryImageUrl,
  galleryVideoPosterUrl,
  galleryVideoSources,
} from './utilities/cloudinary';

const THUMB_WIDTHS = [400, 800, 1200];
const LIGHTBOX_WIDTHS = [800, 1600, 2400];

const allowedExtensions = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'mp4', 'webm', 'ogg', 'mov', 'avi'
];

// Resized copies of an image, never larger than the original upload.
const imageSizes = (asset, widths) => {
  if (asset.format === 'svg' || !asset.width || !asset.height) return [];
  const usable = widths.filter((width) => width < asset.width);
  // Always include a size at (or capped to) the original width
  const largest = Math.min(asset.width, widths[widths.length - 1]);
  if (!usable.includes(largest)) usable.push(largest);
  return usable.map((width) => ({
    src: galleryImageUrl(asset, width),
    width,
    height: Math.round((asset.height / asset.width) * width),
  }));
};

export default function GalleryLightbox({ assets, title = 'Project' }) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  // Only allow images and videos
  const supportedAssets = assets.filter(asset => {
    // Only allow images and videos by resource_type
    if (asset.resource_type === 'image' || asset.resource_type === 'video') return true;
    // Fallback: check file extension (strip query/hash)
    const url = asset.secure_url || '';
    const cleanUrl = url.split('?')[0].split('#')[0];
    const ext = cleanUrl.split('.').pop()?.toLowerCase();
    return allowedExtensions.includes(ext);
  });

  if (!supportedAssets.length) return <div>No gallery assets found.</div>;

  const altFor = (asset, idx) =>
    `${title} – gallery ${asset.resource_type === 'video' ? 'video' : 'image'} ${idx + 1} of ${supportedAssets.length}`;

  // Full-size slides are only requested once the lightbox is opened
  const slides = supportedAssets.map((asset, idx) => {
    if (asset.resource_type === 'video') {
      return {
        type: 'video',
        poster: galleryVideoPosterUrl(asset, 1280),
        sources: galleryVideoSources(asset),
        width: asset.width,
        height: asset.height,
        preload: 'none',
      };
    }
    const sizes = imageSizes(asset, LIGHTBOX_WIDTHS);
    const largest = sizes[sizes.length - 1];
    return {
      src: largest ? largest.src : galleryImageUrl(asset, 2400),
      alt: altFor(asset, idx),
      ...(largest ? { width: largest.width, height: largest.height, srcSet: sizes } : {}),
    };
  });

  // Dynamically set columns: 1 for 1 image, 2 for 2, 3 for 3 or more
  const columns = Math.min(supportedAssets.length, 3);

  const openAt = (idx) => { setIndex(idx); setOpen(true); };

  return (
    <div>
      <h4>Gallery</h4>
      <div
        className={`gallery-masonry${supportedAssets.length === 3 ? ' grid-layout' : ''}`}
        style={
          supportedAssets.length === 1
            ? { columnCount: 1, columnGap: 15 }
            : supportedAssets.length === 3
            ? {}
            : { columnCount: columns, columnGap: 15 }
        }
      >
        {supportedAssets.map((asset, idx) => {
          const isVideo = asset.resource_type === 'video';
          const thumbSizes = isVideo ? [] : imageSizes(asset, THUMB_WIDTHS);
          return (
            <div
              key={asset.asset_id || asset.public_id || idx}
              className={`gallery-thumb${isVideo ? ' video-thumb' : ''}`}
              role="button"
              tabIndex={0}
              aria-label={`Open ${altFor(asset, idx)}`}
              onClick={() => openAt(idx)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openAt(idx);
                }
              }}
            >
              {/* Thumbnails are resized stills; originals never load in the grid */}
              <img
                src={isVideo ? galleryVideoPosterUrl(asset, 800) : galleryImageUrl(asset, 800)}
                srcSet={
                  thumbSizes.length
                    ? thumbSizes.map((size) => `${size.src} ${size.width}w`).join(', ')
                    : undefined
                }
                sizes={
                  thumbSizes.length
                    ? `(max-width: 600px) 50vw, (max-width: 1230px) ${Math.round(100 / columns)}vw, ${Math.round(1200 / columns)}px`
                    : undefined
                }
                alt={altFor(asset, idx)}
                width={asset.width || undefined}
                height={asset.height || undefined}
                loading="lazy"
                decoding="async"
                className="gallery-thumb-media"
              />
              {isVideo && (
                <>
                  <div className="gallery-thumb-overlay" />
                  <div className="gallery-thumb-play">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)" />
                      <polygon points="20,16 34,24 20,32" fill="#fff" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Thumbnails, Video, Zoom]}
        thumbnails={{ position: 'bottom' }}
        on={{ view: ({ index }) => setIndex(index) }}
      />
      <style jsx>{`
        .gallery-masonry {
          column-gap: 15px;
          width: 100%;
          column-count: ${columns};
        }
        @media (max-width: 600px) {
          .gallery-masonry {
            column-count: 2 !important;
          }
        }
        .gallery-masonry.grid-layout {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          column-count: unset !important;
        }
        .gallery-masonry.grid-layout .gallery-thumb {
          margin-bottom: 0;
        }
        .gallery-thumb {
          break-inside: avoid;
          margin-bottom: 12px;
          cursor: pointer;
          width: 100%;
          overflow: hidden;
          background: hsl(0, 0%, 6%);
          display: block;
          position: relative;
        }
        .gallery-thumb::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.18); /* Adjust tint color and opacity as needed */
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 2;
        }
        .gallery-thumb:hover::after {
          opacity: 1;
        }
        .gallery-thumb-media {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          background: hsl(0, 0%, 6%);
        }
        .video-thumb .gallery-thumb-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          transition: background 0.2s;
          pointer-events: none;
          z-index: 1;
        }
        .video-thumb .gallery-thumb-play {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 2;
          transform: translate(-50%, -50%);
          opacity: 1;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .video-thumb:hover .gallery-thumb-overlay {
          background: rgba(0,0,0,0);
        }
        .video-thumb:hover .gallery-thumb-play {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}