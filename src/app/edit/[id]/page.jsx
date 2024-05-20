"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar from '../../components/Navbar';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function EditPostPage({ params }) {

    const { data: session } = useSession();
    if (!session) redirect("/");

    const { id } = params;

    const [postData, setPostData] = useState("");

    // new data of post
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");
    const [newUrl, setNewUrl] = useState("");

    const router = useRouter();

    const getPostById = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("failed to fetch a posts");
            }

            const data = await res.json();
            console.log("edit post: ", data)
            setPostData(data.post);

        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ newTitle, newContent, newUrl })
            });            
    
            if (!res.ok) {
                throw new Error("Failed to update a post");
            }

            router.refresh();
            router.push('/packet');
    
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div>
            <Navbar session={session} />
            <div className="border-gray-800 border-2 min-h-screen m-5">
                <p className="text-7xl text-red-800 mt-10 w-fit mx-auto">-Packet-</p>
                <hr className="w-11/12 grid mx-auto my-8 border-gray-800 border-2" />
                
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto">
                    <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                        <h4 className="m-3 text-2xl text-gray-800">Edit Post!</h4>
                        <hr className="border-gray-800 w-11/12 mx-auto m-3" />
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setNewTitle(e.target.value)} type="text" className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder={postData.title} />
                            <textarea onChange={(e) => setNewContent(e.target.value)} className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder={postData.content}></textarea>
                            <input onChange={(e) => setNewUrl(e.target.value)} type="text" className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder={postData.url} />
                            <button type="submit" className="bg-green-500 text-white border py-1 px-2 mx-auto flex rounded-lg mt-5">Submit</button>
                        </form>
                    </div>
                   
                </div>
            </div>
        </div>
  )
}

export default EditPostPage;
