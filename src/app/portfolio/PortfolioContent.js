import ClientMasonry from '../../components/utilities/clientMasonry';
import Link from 'next/link';

const imageWidths = [320, 480, 640, 960, 1280];

const IfFeaturedMedia = ({ portfolioItem, priority, loading }) => {
  const imageUrl = portfolioItem.fields['Featured Image URL'];
  const title = portfolioItem.fields['Project Title'] || 'Untitled Project';
  const imageDimensions = portfolioItem.featuredImageDimensions;

  if (!imageUrl) return null;

  const isVideo = /\.(mp4|webm|mov|gif)$/i.test(imageUrl); // Include GIFs as videos

  if (isVideo) {
    const webmUrl = `https://res.cloudinary.com/billymitchell/video/upload/f_webm,q_auto:low/v1750459284/portfolio/${imageUrl}`;
    const mp4Url = `https://res.cloudinary.com/billymitchell/video/upload/f_mp4,q_auto:low/v1750459284/portfolio/${imageUrl}`;

    return (
      <>
        <video
          className="fluid"
          id={portfolioItem.id}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={webmUrl} type="video/webm" />
          <source src={mp4Url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="title">
          <strong>{title}</strong>
        </p>
      </>
    );
  }

  const isTallerThan916 =
    imageDimensions &&
    imageDimensions.height / imageDimensions.width > 16 / 9;
  const aspectRatio = isTallerThan916
    ? '9:16'
    : imageDimensions
      ? `${imageDimensions.width}:${imageDimensions.height}`
      : '4:3';
  const [aspectWidth, aspectHeight] = aspectRatio.split(':');
  const getImageUrl = (width) => {
    const transformations =
      isTallerThan916 || !imageDimensions
        ? `dpr_auto,f_auto,q_auto:good,c_fill,ar_${aspectRatio},g_auto,w_${width}`
        : `dpr_auto,f_auto,q_auto:good,c_limit,w_${width}`;

    return `https://res.cloudinary.com/billymitchell/image/upload/${transformations}/v1750459284/portfolio/${imageUrl}`;
  };

  return (
    <>
      <img
        className="fluid"
        id={portfolioItem.id}
        src={getImageUrl(640)}
        srcSet={imageWidths
          .map((width) => `${getImageUrl(width)} ${width}w`)
          .join(', ')}
        sizes="(min-width: 700px) 33vw, (min-width: 500px) 50vw, 100vw"
        alt={title}
        loading={loading}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        width={aspectWidth}
        height={aspectHeight}
      />
      <p className="title">
        <strong>{title}</strong>
      </p>
    </>
  );
};

const PortfolioContent = ({ projects, selectedDiscipline }) => {
  const generatePortfolioUrl = (title) => {
    return `/portfolio/${title
      .toLowerCase()
      .replace('&', 'and')
      .replace('/', '')
      .replace(',', '')
      .replace(':', '')
      .replace(/\s/gi, '-')
      .trim()}`;
  };

  const handleLinkClick = (item) => {
    // Only log critical errors or important events
    if (!item || !item.id) {
      console.error('Portfolio item missing or invalid:', item);
    }
    // Remove other non-critical logs
  };

  const selectedPortfolioContent = projects.filter((item) => {
    if (selectedDiscipline === 'All') return item.fields.Published;
    return item.fields['Creative Discipline']?.includes(selectedDiscipline);
  });

  const sortedPortfolioItems = selectedPortfolioContent.sort((a, b) => {
    const dateA = new Date(a.fields['End Date'] || '1970-01-01');
    const dateB = new Date(b.fields['End Date'] || '1970-01-01');
    return dateB.getTime() - dateA.getTime();
  });
  const firstImageIndex = sortedPortfolioItems.findIndex((item) => {
    const imageUrl = item.fields['Featured Image URL'];
    return imageUrl && !/\.(mp4|webm|mov|gif)$/i.test(imageUrl);
  });

  const breakpointCols = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="portfolio-item-container">
      {sortedPortfolioItems.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ClientMasonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {sortedPortfolioItems.map((portfolioItem, index) => (
            <div
              key={portfolioItem.id}
              id={portfolioItem.id}
              className="portfolio-item"
            >
              <Link
                href={generatePortfolioUrl(
                  portfolioItem.fields['Project Title']
                )}
                onClick={() => handleLinkClick(portfolioItem)}
              >
                <IfFeaturedMedia
                  portfolioItem={portfolioItem}
                  priority={index === firstImageIndex}
                  loading={index < 3 ? 'eager' : 'lazy'}
                />
              </Link>
            </div>
          ))}
        </ClientMasonry>
      )}
    </div>
  );
};

export default PortfolioContent;
