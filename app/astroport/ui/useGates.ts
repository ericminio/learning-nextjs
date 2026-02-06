import { FormEvent, useContext, useEffect, useState } from "react";
import { getDockedShip } from "../server/actions";
import { UserContext } from "./userProvider";
import { Ship } from "../_domain/ship";

export function useGates() {
  const [one, setOne] = useState("");
  const [name, setName] = useState("");
  const user = useContext(UserContext);
  
  const dock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    user.docks(new Ship({ name }));
    setOne(name);
  }

  useEffect(() => {
    getDockedShip().then((result) => {
      setOne(result.ship);
    });
  }, []);

  return { one, name, setName, dock };
}