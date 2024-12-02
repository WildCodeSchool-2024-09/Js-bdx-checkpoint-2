export const cupcakesLoader = () => {
    return fetch("http://localhost:3310/api/cupcakes").then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.json();
      },
    );
  };
  