export const fetchCupcakes = () => {
  return fetch("http://localhost:3310/api/cupcakes").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch cupcakes");
    }
    return response.json();
  });
};
