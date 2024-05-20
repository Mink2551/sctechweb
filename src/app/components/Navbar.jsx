"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SC_Logo from '../../../public/logo_sc.png';
import { signOut } from 'next-auth/react';

const Navbar = ({ session }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-col items-center'>
            {/* Logo SC */}
            <div className='bg-white shadow-2xl p-3 m-5 rounded-full w-3/4 lg:w-1/2 flex justify-between items-center'>
                <Link href="/" className='cursor-pointer hover:scale-110 transition-all flex'>
                    <Image src={SC_Logo} alt="Logo" className='h-12' width={48} height={48} />
                    <p className="my-auto text-red-400 cursor-pointer">Home</p>
                </Link>

            {/* PC Navbar*/}
                <div className='hidden md:flex justify-end'>
                    <ul className='flex gap-5 mr-8'>
                        {!session ? (
                            <>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/login">Sign In</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/register">Sign Up</Link></li>
                            </>
                        ) : (
                            <>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/reviews">Reviews</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/project">Project</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/carlendar">Carlendar</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><a onClick={() => signOut()} className="bg-red-500 text-white py-1 px-2 rounded-md my-2" >Logout</a></li>
                            </>
                        )}
                       
                    </ul>
                </div>

            {/* Icon Open Mobile */}
                <div className='md:hidden'>
                    <button onClick={toggleMenu}>
                        <svg className='w-6 h-6 mr-8' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            {isOpen && (
                <div className='bg-white shadow-2xl p-3 rounded-lg w-1/2 md:hidden'>
                    <ul className='flex flex-col items-center gap-5'>
                        {!session ? (
                            <>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/login">Sign In</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/register">Sign Up</Link></li>
                             </>
                        ) : (
                            <>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/reviews">Reviews</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/project">Project</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><Link href="/carlendar">Carlendar</Link></li>
                             <li className='font-bold text-gray-700 cursor-pointer hover:-translate-y-1 transition-all'><a onClick={() => signOut()} className="bg-red-500 text-white py-1 px-2 rounded-md my-2" >Logout</a></li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
