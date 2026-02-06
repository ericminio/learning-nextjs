import { FormEvent, useEffect, useState } from "react";
import { dockShip, getDockedShip } from "./actions";

export function useGates() {
  const [one, setOne] = useState("");
  const [ship, setShip] = useState("");
  
  const dock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dockShip(ship);
    setOne(ship);
  }

  useEffect(() => {
    getDockedShip().then((result) => {
      setOne(result.ship);
    });
  }, []);

  return { one, ship, setShip, dock };
}