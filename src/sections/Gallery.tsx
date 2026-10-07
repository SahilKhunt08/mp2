import { useState } from 'react';
import ImageCard from '../components/ImageCard';
import { getImageUrl, type NasaItem } from '../types';

interface GalleryProps {
  items: NasaItem[];
  loading: boolean;
  error: boolean;
}

function getDecade(item: NasaItem): string {
  const year = new Date(item.data[0].date_created).getFullYear();
  return `${Math.floor(year / 10) * 10}s`;
}

function Gallery({ items, loading, error }: GalleryProps) {
  const [centerFilter, setCenterFilter] = useState('All');
  const [decadeFilter, setDecadeFilter] = useState('All');

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status">Failed to load images.</p>;

  const centers = Array.from(
    new Set(items.map((item) => item.data[0].center).filter(Boolean)),
  ).sort();

  const decades = Array.from(
    new Set(
      items
        .map((item) => getDecade(item))
        .filter((decade) => !decade.includes('NaN')),
    ),
  ).sort();

  const displayedItems = items.filter((item) => {
    if (centerFilter !== 'All' && item.data[0].center !== centerFilter) {
      return false;
    }

    if (decadeFilter !== 'All' && getDecade(item) !== decadeFilter) {
      return false;
    }

    return true;
  });

  const nasaIds = displayedItems.map((item) => item.data[0].nasa_id);

  return (
    <section className="gallery-page">
      <div className="filter-group">
        <p className="filter-label">Center:</p>
        <div className="category-filters">
          {['All', ...centers].map((name) => (
            <button
              key={name}
              type="button"
              className={centerFilter === name ? 'active' : ''}
              onClick={() => setCenterFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <p className="filter-label">Time Period:</p>
        <div className="category-filters">
          {['All', ...decades].map((name) => (
            <button
              key={name}
              type="button"
              className={decadeFilter === name ? 'active' : ''}
              onClick={() => setDecadeFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-grid">
        {displayedItems.map((item) => {
          const data = item.data[0];
          return (
            <ImageCard
              key={data.nasa_id}
              imageUrl={getImageUrl(item)}
              title={data.title}
              nasaId={data.nasa_id}
              nasaIds={nasaIds}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
