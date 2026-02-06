"use client";

import Gates from "@react/Gates";
import Greetings from "@react/Greetings";
import { UserProvider } from "@react/userProvider";

export default function Home() {
  return (
    <UserProvider>
      <Greetings />
      <Gates />
    </UserProvider>
  );
}
