import { FormEvent, useContext, useEffect, useState } from "react";
import { DomainContext } from "../domainProvider";
import { Ship } from "@domain/ship";

export function useGates() {
  const [one, setOne] = useState("");
  const [name, setName] = useState("");
  const { user, astroport } = useContext(DomainContext);
  
  const dock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    user.docks(new Ship({ name }));
    setOne(name);
  }

  useEffect(() => {
    astroport.getDockedShip({gate: 1}).then((ship) => {
      setOne(ship?.name??"");
    });
  }, []);

  return { one, name, setName, dock };
}