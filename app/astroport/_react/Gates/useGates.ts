import { FormEvent, useContext, useEffect, useState } from "react";
import { DomainContext } from "../domainProvider";
import { Ship } from "@domain/ship";

export function useGates() {
  const { user, astroport, astroportUpdated } = useContext(DomainContext);
  const [gates, setGates] = useState(astroport.gates);
  const [name, setName] = useState("");

  const dock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await user.flies({ ship: new Ship({ name }) });
    const gate = await user.requestsGate({ astroport });
    await user.docks({ astroport, gate });
  };

  useEffect(() => {
    setGates(astroport.gates);
  }, [astroport, astroportUpdated]);

  return { gates, name, setName, dock };
}
