export async function fetchApi() {
  try {
    const response = await fetch("http://localhost:3310/api/cupcakes");
    const data = await response.json();
    return data;
  } catch (err) {
    return console.error(err);
  }
}
