import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import type { CupcakeData } from "../loaders/cupcakesLoader";
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
type Accessory = {
  id: number;
  name: string;
};

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeData[];
  console.info(useLoaderData() as CupcakeArray);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<Accessory[]>([]);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        if (!response.ok) {
          throw new Error("Failed to load accessories");
        }
        const data = await response.json();
        setAccessories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAccessories();
  }, []);
  // Step 5: create filter state
  const [selectedAccessoryId, setSelectedAccessoryID] = useState<string>("");

  const handleAccessoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedAccessoryID(event.target.value);
  };

  const filteredCupcakes = selectedAccessoryId
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === selectedAccessoryId)
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
            value={selectedAccessoryId}
            onChange={handleAccessoryChange}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
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
          <li className="cupcake-item" key={cupcake.id}>
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
