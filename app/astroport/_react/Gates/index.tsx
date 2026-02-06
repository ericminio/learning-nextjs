"use client";

import { JSX } from "react";
import { useGates } from "./useGates";

export default function Gates(): JSX.Element {
  const { one, name, setName, dock } = useGates();

  return (
    <section>
      <section id="gate-1">
        <h2>Gate 1</h2>
        <label id="ship-1">{one}</label>
      </section>

      <section id="gate-2">
        <h2>Gate 2</h2>
        <label id="ship-2"></label>
      </section>

      <section id="gate-3">
        <h2>Gate 3</h2>
        <label id="ship-3"></label>
      </section>

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
    </section>
  );
}
