//import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

const cupcake = [
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

type CupcakeArray = typeof cupcake;

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  console.info(useLoaderData() as CupcakeArray);

  // const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  //const filteredCupcakes = selectedAccessory
  //? cupcake.filter((cupcake) => cupcake.accessory === selectedAccessory)
  //: cupcake;

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{""}
          <select id="cupcake-select">
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list">
        {cupcake.map(
          (cupcake: {
            accessory: string;
            color1: string;
            color2: string;
            color3: string;
            name: string;
          }) => (
            <li key={cupcake.name} className="cupcake-item">
              <Cupcake data={cupcake} />
            </li>
          ),
        )}
      </ul>
    </>
  );
}
export default CupcakeList;
