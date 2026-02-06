"use client";

import Gates from "./client/Gates";
import Greetings from "./client/Greetings";
import { UserProvider } from "./client/userProvider";

export default function Home() {
  return (
    <UserProvider>
      <Greetings />
      <Gates />
    </UserProvider>
  );
}
