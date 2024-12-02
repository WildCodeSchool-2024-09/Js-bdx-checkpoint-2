import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import { useState, useEffect } from "react";

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

interface Accessories {
  id: string;
  name: string;
  slug: string;
}
[];

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const cupcakes = useLoaderData() as CupcakeArray;
  console.info(useLoaderData() as CupcakeArray);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fecth accessories");
        }
        return response.json();
      })
      .then((data: Accessories[]) => {
        console.info("Accessory fetched =", data);
        setAccessories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // Step 5: create filter state
  const [selectedAccessory, setSelectedAccessory] = useState(" ");

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessory)
    : cupcakes;
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            onChange={(event) => setSelectedAccessory(event.target.value)}
          >
            <option value="">...</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
