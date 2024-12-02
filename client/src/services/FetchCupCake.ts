import { json } from "react-router-dom";

export const fetchCupCake = async () => {
  try {
    const response = await fetch("http://localhost:3310/api/cupcakes");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return json({ error: "Failed to fetch cupcakes" });
  }
};
