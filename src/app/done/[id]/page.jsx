"use client"

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react';

function DonePage({ params }) {
    const { data: session } = useSession();
    const router = useRouter();
    const { id } = params;

    const [newProjectStatus, setNewProjectStatus] = useState("Done");
    const [newProjectUrl, setNewProjectUrl] = useState("");
    const [projectData, setProjectData] = useState("");

    const getProjectById = async (id) => {
        try {
            const res = await fetch(`/api/project/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("Failed to fetch a project");
            }

            const data = await res.json();
            setProjectData(data.project);
        } catch(error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProjectById(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/project/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ 
                    newProjectStatus: newProjectStatus,
                    newProjectUrl: newProjectUrl
                })
            });
            
            if (!res.ok) {
                throw new Error("Failed to update a project");
            }

            router.push('/working');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar session={session} />
            <div className="min-h-screen m-5">
                <p className="text-7xl text-red-800 mt-10 w-fit mx-auto">-Status-</p>
                <hr className="w-11/12 grid mx-auto my-8 border-gray-800 border-2" />
                <div className="justify-center grid">
                    <div className="bg-gray-200 px-4 rounded-xl shadow-2xl h-80 my-5 mx-auto">
                        <h4 className="m-3 text-2xl text-gray-800">Take Project!</h4>
                        <hr className="border-gray-800 w-11/12 mx-auto m-3" />
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value="Done"
                                disabled
                                className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2"
                            />
                            <input
                                type="text"
                                placeholder="New URL"
                                value={newProjectUrl}
                                onChange={(e) => setNewProjectUrl(e.target.value)}
                                className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2"
                            />
                            <button
                                type="submit"
                                className="bg-yellow-500 text-white border py-1 px-2 mx-auto flex rounded-lg mt-5"
                            >
                                Take
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DonePage;
