export async function fetchApi(endpoint: string) {
  const BASE_URL = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    const data = await response.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
