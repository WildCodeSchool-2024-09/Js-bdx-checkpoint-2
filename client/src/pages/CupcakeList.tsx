import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

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

type CupcakeData = (typeof sampleCupcakes)[0];
type CupcakeArray = CupcakeData[];
type Accessory = { id: number; name: string; slug: string };
type AccessoryArray = Accessory[];

function CupcakeList() {
  const cupcakes = (useLoaderData() as CupcakeArray) || sampleCupcakes;
  console.info("Cupcakes:", cupcakes);

  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        setAccessories(data as AccessoryArray);
        console.info("Accessories:", data);
      })
      .catch((error) => console.error("Error fetching accessories:", error));
  }, []);

  const filteredCupcakes = filter
    ? cupcakes.filter((cupcake) => cupcake.accessory === filter)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
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
      </ul>
    </>
  );
}

export default CupcakeList;