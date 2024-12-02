import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import fetchAccessories from "./CupcakeList";

interface CupcakeItem {
  id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
}

type CupcakeArray = CupcakeItem[];

interface CupcakeProps {
  data: {
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
    name: string;
  };
}

export default function CupcakeDetails() {
  const cupcakes = useLoaderData() as CupcakeArray;
  fetchAccessories();
  return <Cupcake data={cupcakes[0] as unknown as CupcakeProps["data"]} />;
}
