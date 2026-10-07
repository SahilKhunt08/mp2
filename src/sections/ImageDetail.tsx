import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { formatDate, getImageUrl, type NasaItem } from '../types';

interface DetailLocationState {
  nasaIds?: string[];
}

interface ImageDetailProps {
  items: NasaItem[];
  loading: boolean;
}

function ImageDetail({ items, loading }: ImageDetailProps) {
  const { nasaId } = useParams<{ nasaId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const stateNasaIds = (location.state as DetailLocationState | null)?.nasaIds;
  let nasaIds: string[];
  if (Array.isArray(stateNasaIds) && stateNasaIds.length > 0) {
    nasaIds = stateNasaIds;
  } else {
    nasaIds = items.map((item) => item.data[0].nasa_id);
  }

  const item = items.find((i) => i.data[0].nasa_id === nasaId);

  function goAdjacent(direction: -1 | 1) {
    if (!nasaId || nasaIds.length === 0) {
      return;
    }

    const currentIndex = nasaIds.indexOf(nasaId);
    if (currentIndex === -1) {
      navigate(`/image/${nasaIds[0]}`, { state: { nasaIds } });
      return;
    }

    let nextIndex: number;
    if (direction === 1) {
      nextIndex = (currentIndex + 1) % nasaIds.length;
    } else {
      nextIndex = (currentIndex - 1 + nasaIds.length) % nasaIds.length;
    }

    navigate(`/image/${nasaIds[nextIndex]}`, { state: { nasaIds } });
  }

  if (loading) {
    return <p className="status">Loading...</p>;
  }
  if (!item) {
    return <p className="status">Image not found.</p>;
  }

  const data = item.data[0];
  const imageUrl = getImageUrl(item);

  let imageElement;
  if (imageUrl) {
    imageElement = <img src={imageUrl} alt="" className="detail-image" />;
  } else {
    imageElement = <div className="detail-image placeholder">No image</div>;
  }

  let keywordsText = '';
  if (data.keywords && data.keywords.length > 0) {
    keywordsText = data.keywords.join(', ');
  }

  return (
    <section className="detail-page">
      <div className="detail-nav">
        <button type="button" onClick={() => goAdjacent(-1)}>
          ← Previous
        </button>
        <button type="button" onClick={() => goAdjacent(1)}>
          Next →
        </button>
      </div>

      <h2 className="detail-title">{data.title}</h2>

      <div className="detail-body">
        {imageElement}

        <div className="detail-info">
          <p>
            <strong>Center:</strong> {data.center}
          </p>
          <p>
            <strong>Created:</strong> {formatDate(data.date_created)}
          </p>
          {data.description && (
            <p>
              <strong>Description:</strong> {data.description}
            </p>
          )}
          {keywordsText && (
            <p>
              <strong>Keywords:</strong> {keywordsText}
            </p>
          )}
          <p>
            <strong>NASA ID:</strong> {data.nasa_id}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ImageDetail;
