import { FormEvent, useContext, useEffect, useState } from "react";
import { DomainContext } from "../domainProvider";
import { Ship } from "@domain/ship";

export function useGates() {
  const { user, astroport, astroportUpdated } = useContext(DomainContext);
  const [gates, setGates] = useState(astroport?.gates ?? []);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await user.flies({ ship: new Ship({ name }) });
      const gate = await user.requestsGate({ astroport: astroport! });
      await user.docks({ astroport: astroport!, gate });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    }
  };

  useEffect(() => {
    setGates(astroport?.gates ?? []);
  }, [astroport, astroportUpdated]);

  return { gates, name, setName, dock, error };
}
