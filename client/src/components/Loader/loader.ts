export const loadCupcakes = async () => {
  const response = await fetch("http://localhost:3310/api/cupcakes");
  if (!response.ok) {
    throw new Error("Failed to fetch cupcakes");
  }
  return response.json();
};
