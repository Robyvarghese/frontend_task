import { useEffect, useState } from "react";
import carData from "../../public/api/cars.json";
import { CarObject } from "../../types/car";

type Status = "loading" | "success" | "error";

export default function useCars() {
  const [data, setData] = useState<CarObject[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(carData);
        setStatus("success");
      } catch (error) {
        console.error("Error fetching car data:", error);
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  return { data, status };
}
