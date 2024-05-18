"use client"

import HomeBody from "./Sections/BodyfirstPage";
import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
      <Navbar session={session}/>
      <HomeBody session={session}/>
    </main>
  );
}
