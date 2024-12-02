import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import { fetchApi } from "../services/fetchApi";

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

type CupcakeArray = typeof sampleCupcakes;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const cupcakes = useLoaderData() as CupcakeArray;
  const [accessories, setAccessories] = useState<
    { id: number; name: string; slug: string }[]
  >([]);
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  // Step 3: get all accessories
  useEffect(() => {
    const fetchAccessories = async () => {
      const result = await fetchApi("accessories");
      setAccessories(result);
    };

    fetchAccessories();
  }, []);

  // Step 5: create filter state
  const filteredCupckakes = selectedAccessory
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
            <option value="">All Cupcakes</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessory) => (
              <option value={accessory.id} key={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {filteredCupckakes.map((cupcake) => (
          <li className="cupcake-item" key={cupcake.id}>
            <Link to={`/cupcakes/${cupcake.id}`}>
              <Cupcake data={cupcake} />
            </Link>
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;
