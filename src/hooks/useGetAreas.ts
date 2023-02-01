import { useEffect, useState } from "react";
import { IArea } from "../Model/MultiSelectModel";

const useGetAreas = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  useEffect(() => {
    fetch("https://shipment-df1e4-default-rtdb.firebaseio.com/areas.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const areaArray: IArea[] = [
          ...data,
          { id: 9, area: "All", label: "All" },
        ];
        setAreas(areaArray);
      });
  }, []);
  return areas;
};

export default useGetAreas;
