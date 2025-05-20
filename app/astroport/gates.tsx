"use client";
import { FormEvent, JSX, useEffect, useState } from "react";

export default function Gates(): JSX.Element {
  const [one, setOne] = useState("");
  const [ship, setShip] = useState("");

  async function dock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOne(ship);
  }

  useEffect(() => {
    fetch("/api/docks").then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          setOne(data.dock);
        });
      } else {
        console.error("Failed to fetch dock data");
      }
    });
  }, []);

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
          value={ship}
          onChange={(e) => setShip(e.currentTarget.value)}
        />
        <button type="submit" id="dock">
          Dock
        </button>
      </form>
    </section>
  );
}
