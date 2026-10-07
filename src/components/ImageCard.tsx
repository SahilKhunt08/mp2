import { Link } from 'react-router-dom';

interface ImageCardProps {
  imageUrl?: string;
  title: string;
  nasaId: string;
  nasaIds: string[];
}

function ImageCard({ imageUrl, title, nasaId, nasaIds }: ImageCardProps) {
  let imageElement;
  if (imageUrl) {
    imageElement = <img src={imageUrl} alt={title} />;
  } else {
    imageElement = <div className="gallery-placeholder">No image</div>;
  }

  return (
    <Link
      to={`/image/${nasaId}`}
      state={{ nasaIds }}
      className="gallery-item"
      title={title}
    >
      {imageElement}
    </Link>
  );
}

export default ImageCard;
