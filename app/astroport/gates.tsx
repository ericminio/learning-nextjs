"use client";
import { FormEvent, JSX, useState } from "react";

export default function Gates(): JSX.Element {
  const [one, setOne] = useState("");
  const [ship, setShip] = useState("");

  async function dock(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setOne(ship);
  }

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

      <input
        id="ship"
        name="ship"
        value={ship}
        onChange={(e) => setShip(e.currentTarget.value)}
      />
      <button type="button" id="dock" onClick={dock}>
        Dock
      </button>
    </section>
  );
}
