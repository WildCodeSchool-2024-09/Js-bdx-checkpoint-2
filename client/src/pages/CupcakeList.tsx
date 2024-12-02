import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
const sampleCupcakes = [
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
];
export interface Accessory {
  id: string;
  name: string;
}

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeArray;
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const filterCupcakes = cupcakes.filter(
    (cupcake) =>
      selectedAccessory === "" || cupcake.accessory === selectedAccessory,
  );
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch accessories");
        }
        return response.json();
      })
      .then((data: Accessory[]) => {
        console.info("Accessories fetched:", data);
        setAccessories(data);
      })
      .catch((error) => {
        console.error("Error fetching accessories:", error);
      });
  }, []);
  console.info(filterCupcakes);
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={(event) => setSelectedAccessory(event.target.value)}
          >
            <option value="">-- All Accessories --</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.name}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {filterCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
