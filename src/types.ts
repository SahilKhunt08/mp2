export interface NasaData {
  nasa_id: string;
  title: string;
  description?: string;
  media_type: string;
  center: string;
  date_created: string;
  keywords?: string[];
}

export interface NasaLink {
  href: string;
  rel?: string;
  render?: string;
}

export interface NasaItem {
  data: NasaData[];
  links?: NasaLink[];
}

export function getImageUrl(item: NasaItem): string | undefined {
  const links = item.links ?? [];
  const imageLink = links.find((link) => link.render === 'image');

  if (imageLink?.href) {
    return imageLink.href;
  }

  return links[0]?.href;
}

export function formatDate(dateCreated: string): string {
  const date = new Date(dateCreated);

  if (Number.isNaN(date.getTime())) {
    return dateCreated;
  }

  return date.toLocaleDateString();
}
