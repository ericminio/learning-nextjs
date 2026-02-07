"use client";

import { JSX } from "react";
import { useGates } from "./useGates";

export default function Gates(): JSX.Element {
  const { gates, name, setName, dock, error } = useGates();

  return (
    <section>
      {gates.map((ship, index) => (
        <section key={index} id={`gate-${index + 1}`}>
          <h2>{`Gate ${index + 1}`}</h2>
          <label id={`ship-${index + 1}`}>{ship ? ship.name : ""}</label>
        </section>
      ))}

      <form id="ship-form" onSubmit={dock}>
        <input
          id="ship"
          name="ship"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <button type="submit" id="dock">
          Dock
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
