"use client";

import useMenu from "./useMenu";

export default function Menu() {
  const { show } = useMenu();

  return (
    <nav className="menu-nav">
      <button className="menu-button" onClick={() => show("astroport")}>
        Enter Astroport
      </button>
    </nav>
  );
}
