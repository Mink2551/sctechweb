"use client"

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import SC_Logo from '../../../public/logo_sc.png';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const { data: session } = useSession();
    if (session) router.replace("/");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false
            });            
    
            if (res.error) {
                setError("Invalid credentials");
                return;
            }
    
            router.replace("/"); // Replace with the correct URL path for the welcome page
    
        } catch(error) {
            console.error(error);
        }
    }
    

  return (
    <div>
      <Navbar/>
      <div className="bg-orange-300 grid justify-center items-start centered-container mx-auto my-32 rounded-3xl shadow-2xl">
         <div className="grid mt-5">
           <div className="flex mb-10">
               <Image src={SC_Logo} alt="Logo" className=' bg-white rounded-full' width={72} height={72} />
               <span className="mt-6 mx-2 text-xl text-gray-800 ">Technician Login</span>
           </div>
           <div className=''>
           <hr className="my-5"/>
            <form onSubmit={handleSubmit} action="" className='mx-auto grid gap-y-7'>

                  {error && (
                    <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                      {error}
                    </div>
                  )}

                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter Your Email" className="px-2 py-1 rounded-xl"/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className="px-2 py-1 rounded-xl"/>
                <button type='submit' className="bg-orange-400 rounded-xl w-2/5 py-1.5 text-white">Sign In</button>
            </form>
            <hr className="my-5"/>
         </div>
         </div>
      </div>
    </div>
  )
}

export default LoginPage
