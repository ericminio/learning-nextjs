"use client";

import Gates from "@react/Gates";
import Greetings from "@react/Greetings";
import { DomainProvider } from "@/app/astroport/_react/domainProvider";

export default function Home() {
  return (
    <DomainProvider>
      <div className="astroport-container">
        <div className="astroport-content">
          <Greetings />
          <Gates />
        </div>
      </div>
    </DomainProvider>
  );
}
