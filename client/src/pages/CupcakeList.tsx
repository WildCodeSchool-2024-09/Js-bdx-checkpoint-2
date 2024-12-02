import { type ChangeEvent, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import type { CupCake } from "../types/CupCakeProps";

type AccessoryArray = { id: string; name: string; slug: string };
function CupcakeList() {
  const [accessories, setAccessories] = useState<AccessoryArray[]>([]);
  const [selectAccessories, setSelectAccessories] = useState<string>("");
  const [filteredCake, setFilteredCake] = useState<CupCake[]>([]);
  // Step 1: get all cupcakes
  const cupCakes = useLoaderData() as CupCake[];
  // Step 3: get all accessories
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data) => setAccessories(data));
  }, []);
  // Step 5: create filter state
  useEffect(() => {
    if (selectAccessories) {
      const filter = cupCakes.filter(
        (cake) => cake.accessory_id === selectAccessories,
      );
      setFilteredCake(filter);
    } else {
      setFilteredCake(cupCakes);
    }
  }, [selectAccessories, cupCakes]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectAccessories(event.target.value);
  };
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={handleChange}>
            <option value="">---</option>
            {accessories.map((accessorie) => (
              <option key={accessorie.id} value={accessorie.id}>
                {accessorie.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCake.map((cake) => (
          <li key={cake.id} className="cupcake-item">
            Nom: {cake.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;
