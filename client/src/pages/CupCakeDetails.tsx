import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CupcakeData } from "../components/Cupcake";

export const CupcakeDetails = () => {
  const { id } = useParams(); // Get the 'id' from the URL
  const [cupcake, setCupcake] = useState<CupcakeData>();

  useEffect(() => {
    // Fetch the details of the cupcake by its id
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((res) => res.json())
      .then((data) => setCupcake(data))
      .catch((error) =>
        console.error("Error fetching cupcake details:", error),
      );
  }, [id]);

  // Display loading state or cupcake details
  if (!cupcake) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{cupcake.name}</h1>
      <p>Accessory: {cupcake.accessory}</p>
      <p>
        Colors: {cupcake.color1}, {cupcake.color2}, {cupcake.color3}
      </p>
    </div>
  );
};
