"use client";

import Gates from "./ui/gates";
import Greetings from "./ui/greetings";
import { UserProvider } from "./ui/userProvider";

export default function Home() {
  return (
    <UserProvider>
      <Greetings />
      <Gates />
    </UserProvider>
  );
}
