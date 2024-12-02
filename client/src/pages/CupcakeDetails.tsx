import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cupcake from "../components/Cupcake";
import { fetchApi } from "../services/fetchApi";

type CupcakeProps = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

export default function CupcakeDetails() {
  const { id } = useParams();
  const [cupcake, setCupckake] = useState<CupcakeProps>();

  useEffect(() => {
    const fetchCupcake = async () => {
      const result = await fetchApi(`cupcakes/${id}`);
      setCupckake(result);
    };

    fetchCupcake();
  }, [id]);

  return cupcake && <Cupcake data={cupcake as CupcakeProps} />;
}
