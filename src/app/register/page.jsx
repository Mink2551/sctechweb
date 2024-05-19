"use client"

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import SC_Logo from '../../../public/logo_sc.png';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {
  const [code, setCode] = useState('');
  const [isValidCode, setIsValidCode] = useState(false); // Set to false by default
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  if (session) redirect("/")

  const handleCodeChange = (event) => {
    const inputCode = event.target.value;
    setCode(inputCode);
    setIsValidCode(inputCode === 'SCTechRegister');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isValidCode) {
      setError('Invalid code. Please enter the correct code to sign up.');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all input fields!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      if (res.ok) {
        setSuccess("Registration successful!");
        e.target.reset();
      } else {
        const errorData = await res.json();
        setError(errorData.error || "User registration failed.");
      }
    } catch (error) {
      setError("Error during registration: " + error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-orange-300 grid justify-center items-start centered-container mx-auto my-32 rounded-3xl shadow-2xl">
        <div className="grid mt-5 mx-3">
          <div className="flex mb-10">
            <Image src={SC_Logo} alt="Logo" className="bg-white rounded-full" width={72} height={72} />
            <span className="mt-6 mx-2 text-xl text-gray-800">Technician Register</span>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="mx-auto grid gap-y-5">

              {error && (
                <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
                  {success}
                </div>
              )}

              <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Name" className="px-2 py-1 rounded-xl" />
              <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" className="px-2 py-1 rounded-xl" />
              <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" className="px-2 py-1 rounded-xl" />
              <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Your Password" className="px-2 py-1 rounded-xl" />
              <div className="flex">
                <button type="submit" className={`bg-orange-400 rounded-xl w-2/5 py-1.5 text-white ${!isValidCode && 'opacity-50 cursor-not-allowed'}`} disabled={!isValidCode}>
                  Sign Up
                </button>
                <input type="text" placeholder="  Code" className="w-32 ml-4 rounded-xl" value={code} onChange={handleCodeChange} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
