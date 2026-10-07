import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchNasaItems } from './api';
import Header from './components/Header';
import Gallery from './sections/Gallery';
import ImageDetail from './sections/ImageDetail';
import Search from './sections/Search';
import type { NasaItem } from './types';

function App() {
  const [items, setItems] = useState<NasaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadItems() {
      try {
        const nasaItems = await fetchNasaItems();
        setItems(nasaItems);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadItems();
  }, []);

  return (
    <div className="app">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Search items={items} loading={loading} error={error} />}
          />
          <Route
            path="/gallery"
            element={<Gallery items={items} loading={loading} error={error} />}
          />
          <Route
            path="/image/:nasaId"
            element={<ImageDetail items={items} loading={loading} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
