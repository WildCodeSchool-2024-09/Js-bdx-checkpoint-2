import { useLoaderData } from "react-router-dom";
import Cupcake from "../components/Cupcake";

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
  const cupcake = useLoaderData() as CupcakeProps["data"];
  console.info(cupcake);

  return (
    <>
      <h1>My Cupcake</h1>
      <Cupcake data={cupcake} />
    </>
  );
}
