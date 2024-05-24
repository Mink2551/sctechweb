"use client"

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteBtn from "../Contents/DeleteBtn"
import LoadingPage from '../loading/page';

function PacketPage() {
    const { data: session, status } = useSession();
    const [postData, setPostData] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [url, setUrl] = useState("");
    const router = useRouter();

    const getPosts = async () => {
        try {
            const res = await fetch("/api/posts", {
                method: "GET",
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await res.json();
            setPostData(data.posts)

        } catch(error) {
            console.log("Error loading posts: ", error );
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") {
            redirect("/package");
        }
    }, [status]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !content || !url) {
            alert("Please complete all inputs!");
            return;
        }
    
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ title, content, url })
            });
    
            if (!res.ok) {
                throw new Error("Failed to create a post");
            }
    
            await getPosts();
    
            setTitle("");
            setContent("");
            setUrl("");
    
            router.push("/package");
        } catch (error) {
            console.error(error);
        }
    };        

    if (status === "loading") {
        return <LoadingPage/>;
    }

    const titleCharCount = title.length;
    const contentCharCount = content.length;

    return (
        <div>
            <Navbar session={session} />
            <div className="border-gray-800 border-2 min-h-screen m-5">
                <p className="text-7xl text-red-800 mt-10 w-fit mx-auto">-Packet-</p>
                <hr className="w-11/12 grid mx-auto my-8 border-gray-800 border-2" />
                
                <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto">
                    <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                        <h4 className="m-3 text-2xl text-gray-800">Create New!</h4>
                        <hr className="border-gray-800 w-11/12 mx-auto m-3" />
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setTitle(e.target.value.slice(0, 15))} type="text" maxLength={15} className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder="Title 15 letters" />
                            <p className="text-sm ml-8">{titleCharCount}/15</p>
                            <textarea onChange={(e) => setContent(e.target.value.slice(0, 160))} className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder="Enter Your Content" maxLength={160}></textarea>
                            <p className="text-sm ml-8">{contentCharCount}/160</p>
                            <input onChange={(e) => setUrl(e.target.value)} type="text" className="bg-gray-300 w-[250px] mx-auto grid rounded-md text-md my-2" placeholder="Url" />
                            <button type="submit" className="bg-green-500 text-white border py-1 px-2 mx-auto flex rounded-lg mt-5">Submit</button>
                        </form>
                    </div>

                    {postData && postData.length > 0 ? (
                        postData.map(val => (
                          <div key={val._id} className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                              <h4 className="m-3 text-2xl text-gray-800">{val.title}</h4>
                              <p className="m-3 text-md h-[150px] text-gray-700" style={{ wordWrap: 'break-word' }}>{val.content}</p>
                              <button className="mx-4 mt-3 text-blue-700 hover:text-blue-800 hover:underline transition-all hover:scale-110">
                                  <a target="blank" href={val.url}>Link url</a>
                              </button>
                              <div className="mt-5 m-3 flex">
                                  <Link className="bg-gray-500 text-white border py-1 px-2 rounded-md text-md w-fit" href={`/edit/${val._id}`}>Edit</Link>
                                  <DeleteBtn id={val._id} />
                              </div>
                          </div>
                        ))
                    ) : (
                        <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto"><p className="m-3">You do not have any posts yet.</p></div>
                    )}
                   
                </div>
            </div>
        </div>
    );
}

export default PacketPage;
