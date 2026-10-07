import { useState } from 'react';
import SearchResult from '../components/SearchResult';
import { formatDate, getImageUrl, type NasaItem } from '../types';

interface SearchProps {
  items: NasaItem[];
  loading: boolean;
  error: boolean;
}

type SortField = 'title' | 'date';
type SortOrder = 'asc' | 'desc';

function Search({ items, loading, error }: SearchProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<SortField>('title');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  if (loading) return <p className="status">Loading...</p>;
  if (error) return <p className="status">Failed to load images.</p>;

  const filteredItems = items.filter((item) =>
    item.data[0].title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const displayedItems = [...filteredItems].sort((a, b) => {
    if (sortField === 'title') {
      const aTitle = a.data[0].title ?? '';
      const bTitle = b.data[0].title ?? '';

      if (sortOrder === 'asc') {
        return aTitle.localeCompare(bTitle);
      }

      return bTitle.localeCompare(aTitle);
    }

    const aDate = a.data[0].date_created;
    const bDate = b.data[0].date_created;
    const cmp = aDate.localeCompare(bDate);

    if (sortOrder === 'asc') {
      return cmp;
    }

    return -cmp;
  });

  const nasaIds = displayedItems.map((item) => item.data[0].nasa_id);

  return (
    <section className="search-page">
      <div className="controls">
        <input
          type="text"
          className="search-input"
          placeholder="Search titles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="sort-field">
          <label>
            Sort by:{' '}
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
            >
              <option value="title">Title</option>
              <option value="date">Date</option>
            </select>
          </label>
        </div>

        <div className="sort-order">
          <label>
            <input
              type="radio"
              name="sortOrder"
              checked={sortOrder === 'asc'}
              onChange={() => setSortOrder('asc')}
            />{' '}
            Ascending
          </label>
          <label>
            <input
              type="radio"
              name="sortOrder"
              checked={sortOrder === 'desc'}
              onChange={() => setSortOrder('desc')}
            />{' '}
            Descending
          </label>
        </div>
      </div>

      <ul className="item-list">
        {displayedItems.map((item) => {
          const data = item.data[0];
          return (
            <SearchResult
              key={data.nasa_id}
              imageUrl={getImageUrl(item)}
              title={data.title}
              center={data.center}
              date={formatDate(data.date_created)}
              nasaId={data.nasa_id}
              nasaIds={nasaIds}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default Search;
