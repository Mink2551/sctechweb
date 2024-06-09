"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'
import Navbar from '../components/Navbar';

function CarlendarPage() {

    const { data: session } = useSession();
    if (!session) redirect("/status");

  return (
    <div>
      <Navbar session={session}/>
      <div classname="">
          
      </div>
    </div>
  )
}

export default CarlendarPage
