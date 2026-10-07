import axios from "axios";
import type { NasaItem } from "./types";

export async function fetchNasaItems(): Promise<NasaItem[]> {
  const response = await axios.get("https://images-api.nasa.gov/search", {
    params: {
      media_type: "image",
      page_size: 500,
    },
  });
  const items: NasaItem[] = response.data.collection.items ?? [];
  return items.filter((item) => item.data[0]?.nasa_id !== 'iss014e08744');
}
