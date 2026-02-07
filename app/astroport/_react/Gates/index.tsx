"use client";

import { JSX } from "react";
import { useGates } from "./useGates";

export default function Gates(): JSX.Element {
  const { gates, name, setName, dock, error } = useGates();

  return (
    <section>
      {gates.map((ship, index) => (
        <section key={index} id={`gate-${index + 1}`} className="gate-section">
          <h2 className="gate-title">{`Gate ${index + 1}`}</h2>
          <label id={`ship-${index + 1}`} className="gate-ship">
            {ship ? ship.name : "Empty"}
          </label>
        </section>
      ))}

      <section className="dock-form">
        <form id="ship-form" onSubmit={dock}>
          <input
            id="ship"
            name="ship"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="dock-input"
            placeholder="Enter ship name..."
          />
          <button type="submit" id="dock" className="dock-button">
            Dock
          </button>
        </form>
      </section>

      {error && (
        <section className="error-message">
          <p role="alert">{error}</p>
        </section>
      )}
    </section>
  );
}
