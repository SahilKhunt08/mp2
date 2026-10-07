import { Link } from 'react-router-dom';

interface SearchResultProps {
  imageUrl?: string;
  title: string;
  center: string;
  date: string;
  nasaId: string;
  nasaIds: string[];
}

function SearchResult({
  imageUrl,
  title,
  center,
  date,
  nasaId,
  nasaIds,
}: SearchResultProps) {
  let imageElement;
  if (imageUrl) {
    imageElement = <img src={imageUrl} alt="" className="item-row-image" />;
  } else {
    imageElement = (
      <div className="item-row-image placeholder">No image</div>
    );
  }

  return (
    <li>
      <Link
        to={`/image/${nasaId}`}
        state={{ nasaIds }}
        className="item-row"
      >
        {imageElement}
        <div className="item-row-info">
          <span className="item-name">{title}</span>
          <span>
            {center} - {date}
          </span>
        </div>
      </Link>
    </li>
  );
}

export default SearchResult;
