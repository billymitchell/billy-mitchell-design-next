'use client';
import React from 'react';
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export default function GalleryLightbox({ assets }) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const allowedExtensions = [
    'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
    'mp4', 'webm', 'ogg', 'mov', 'avi'
  ];

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

  const slides = supportedAssets.map((asset) => {
    if (asset.resource_type === 'video') {
      return {
        type: 'video',
        poster: asset.secure_url.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '.jpg'),
        sources: [
          { src: asset.secure_url, type: `video/${asset.format}` }
        ],
        description: asset.public_id,
      };
    }
    return {
      src: asset.secure_url,
      description: asset.public_id,
    };
  });

  // Dynamically set columns: 1 for 1 image, 2 for 2, 3 for 3 or more
  const columns = Math.min(supportedAssets.length, 3);
  const breakpointColumnsObj = {
    default: columns,
    900: Math.min(columns, 2),
    600: 1
  };
  const columnWidth = `${100 / columns}%`;

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
        {supportedAssets.map((asset, idx) => (
          <div
            key={asset.asset_id || asset.public_id || idx}
            className={`gallery-thumb${asset.resource_type === 'video' ? ' video-thumb' : ''}`}
            onClick={() => { setIndex(idx); setOpen(true); }}
          >
            {asset.resource_type === 'video' ? (
              <>
                <video
                  className="gallery-thumb-media"
                  poster={asset.secure_url.replace(/\.(mp4|webm|ogg|mov|avi)$/i, '.jpg')}
                  muted
                  playsInline
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {/* Try to serve webm if available */}
                  <source src={asset.secure_url.replace(/\.mp4$/i, '.webm')} type="video/webm" />
                  <source src={asset.secure_url} type={`video/${asset.format}`} />
                  Your browser does not support the video tag.
                </video>
                <div className="gallery-thumb-overlay" />
                <div className="gallery-thumb-play">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.6)" />
                    <polygon points="20,16 34,24 20,32" fill="#fff" />
                  </svg>
                </div>
              </>
            ) : (
              <img
                src={asset.secure_url}
                alt={asset.public_id}
                className="gallery-thumb-media"
              />
            )}
          </div>
        ))}
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