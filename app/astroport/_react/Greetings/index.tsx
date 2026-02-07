"use client";

import { JSX, useContext } from "react";
import { DomainContext } from "../domainProvider";

export default function Greetings(): JSX.Element {
  const { astroport } = useContext(DomainContext);

  if (!astroport) {
    return <h1 id="astroport-name">Loading...</h1>;
  }

  return <h1 id="astroport-name">{astroport.name}</h1>;
}
