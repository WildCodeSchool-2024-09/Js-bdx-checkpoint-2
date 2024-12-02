import type { LoaderFunction } from "react-router-dom";

export type CupcakeData = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

export const cupcakesLoader: LoaderFunction = async () => {
  const response = await fetch("http://localhost:3310/api/cupcakes");

  if (!response.ok) {
    throw new Error("Failed to load cupcakes");
  }

  return response.json();
};
