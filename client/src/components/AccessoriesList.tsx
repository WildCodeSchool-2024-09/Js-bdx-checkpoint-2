import { useEffect } from "react";

type Accessory = {
  id: string;
  name: string;
};

type AccessoriesListProps = {
  onAccessoriesFetched: (accessories: Accessory[]) => void;
};

const AccessoriesList = ({ onAccessoriesFetched }: AccessoriesListProps) => {
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => {
        onAccessoriesFetched(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des accessoires", error);
      });
  }, [onAccessoriesFetched]);

  return null;
};

export default AccessoriesList;
