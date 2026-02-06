"use client";

import { JSX, useContext } from "react";
import { DomainContext } from "../domainProvider";

export default function Greetings(): JSX.Element {
  const { astroport } = useContext(DomainContext);

  return <h1 id="astroport-name">{astroport.name}</h1>;
}
