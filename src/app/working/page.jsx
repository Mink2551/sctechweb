"use client";

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DeleteBtn from '../Contents/NoteDeleteBtn';
import LoadingPage from '../loading/page';
import ProjectDeleteBtn from '../Contents/ProjectDeleteBtn';

function ProjectPage({ params }) {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('Available');
  const [noteData, setNoteData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ProjectTitle, setProjectTitle] = useState("");
  const [ProjectContent, setProjectContent] = useState("");
  const [ProjectDeadline, setProjectDeadline] = useState("");
  const [ProjectCamera, setProjectCamera] = useState("");
  const [ProjectAmount, setProjectAmount] = useState("");
  const [ProjectUrl, setProjectUrl] = useState("");
  const [ProjectStatus, setProjectStatus] = useState("No one taking...");
  const { id } = params;
  const router = useRouter();

  // Function open side bar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function change page in side bar
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // Function get note data from api
  const getNote = async () => {
    try {
      const res = await fetch("/api/note", {
        method: "GET",
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch note");
      }

      const data = await res.json();
      setNoteData(data.note);

    } catch (error) {
      console.log("Error loading note: ", error);
    }
  }

  // Function get project data from api
  const getProject = async () => {
    try {
      const res = await fetch("/api/project", {
        method: "GET",
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch project");
      }

      const data = await res.json();
      setProjectData(data.project);

    } catch (error) {
      console.log("Error loading project: ", error);
    }
  };

  // Function get project id from api
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

  //  Call use function data
  useEffect(() => {
    getNote();
    getProject();
    getProjectById(id);
  }, []);

  // Reload page and check status
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/working");
    }
  }, [status]);

  if (status === "loading") {
    return <LoadingPage />
  }

  // Funtion sumbit button for note create
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Please complete all inputs!");
      return;
    }

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ title, content })
      });

      if (!res.ok) {
        throw new Error("Failed to create a note");
      }

      await getNote();

      setTitle("");
      setContent("");

      router.push("/working");
    } catch (error) {
      console.error(error);
    }
  };

  // Funtion sumbit button for project create
  const ProjecthandleSubmit = async (e) => {
    e.preventDefault();

    if (!ProjectTitle || !ProjectContent || !ProjectUrl || !ProjectAmount || !ProjectCamera || !ProjectDeadline) {
      alert("Please complete all inputs!");
      return;
    }

    try {
      const res = await fetch("/api/project", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ProjectTitle, ProjectContent, ProjectDeadline, ProjectCamera, ProjectAmount, ProjectUrl, ProjectStatus })
      });

      if (!res.ok) {
        throw new Error("Failed to create a project");
      }

      await getProject();

      setProjectTitle("");
      setProjectContent("");
      setProjectDeadline("");
      setProjectCamera("");
      setProjectAmount("");
      setProjectUrl("");
      setProjectStatus("No one taking...");

      router.push("/working");
    } catch (error) {
      console.error(error);
    }
  };

  // Function check lenght in input box
  const titleCharCount = title.length;
  const contentCharCount = content.length;

  return (
    <div className="grid">
      <Navbar session={session}/>

      {/* Main */}
      <div className="grid">

        {/* Side bar */}
        <div className={`fixed h-[99vh] top-1 bottom-1 left-1 border border-red-500 bg-red-400 shadow-2xl w-64 rounded-3xl duration-500 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <button
            className="absolute top-1/2 right-[-20px] border-red-500 border transform -translate-y-1/2 px-3 py-2 text-white bg-red-400 h-fit w-fit rounded-full focus:outline-none"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
          <div className="space-y-5 text-white">
            <h4 className="text-4xl mt-5 w-fit mx-auto flex font-bold">Sidebar!</h4>
            <hr className="w-[90%] mx-auto"/>
            <div className="grid space-y-2">
               <button 
                 className="px-4 w-[90%] mx-auto py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                 onClick={() => handleViewChange('Create')}
               >
                 Create
               </button>
               <button 
                 className="px-4 w-[90%] mx-auto py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                 onClick={() => handleViewChange('Available')}
               >
                 Available
               </button>
               {/* <button 
                 className="px-4 w-[90%] mx-auto py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600"
                 onClick={() => handleViewChange('Done')}
               >
                 Done
               </button> */}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="grid p-4 min-h-screen lg:w-[80%] w-[90%] mx-auto">

          {/* Create Button in side bar */}
          {activeView === 'Create' && <div>
               <h1 className="mx-auto w-fit text-4xl font-bold text-gray-700">Create Content</h1>
               <hr className="my-5 w-[90%] mx-auto"/>
               <div className="grid lg:grid-cols-2 gap-y-10">
                  <div>

                    {/* Create Note */}
                    <h2 className="mx-auto w-fit text-4xl font-bold text-blue-500">Create Note</h2>
                    <form onSubmit={handleSubmit} action="" className="grid lg:w-3/5 mx-auto p-10 mt-10 border-2 border-blue-600 rounded-2xl shadow-2xl hover:bg-blue-300 hover:bg-opacity-20 transition-all">
                        <p className="font-bold text-xl mx-auto text-blue-600 my-3">Note Title</p>
                        <input onChange={(e) => setTitle(e.target.value.slice(0, 15))} type="text" maxLength={15} placeholder="Title" className=' bg-blue-200 font-bold py-1 px-5 rounded-xl'/>
                        <p className="text-sm ml-3">{titleCharCount}/15</p>
                        <p className="font-bold text-xl mx-auto text-blue-600 my-3">Note Content</p>
                        <textarea onChange={(e) => setContent(e.target.value.slice(0, 160))} maxLength={160} type="text" placeholder="Content" className="className=' bg-blue-200 font-bold py-1 px-4 rounded-xl"/>
                        <p className="text-sm ml-3">{contentCharCount}/160</p>
                        <button type="submit" className="mt-8 hover:bg-blue-600 bg-blue-500 w-fit px-3 py-1 font-bold text-white rounded-xl">Submit</button>
                    </form>
                  </div>


                  <div>

                    {/* Create Project */}
                    <h2 className="mx-auto w-fit text-4xl font-bold text-green-500">Create Project</h2>
                    <form onSubmit={ProjecthandleSubmit} action="" className="grid lg:w-3/5 p-10 mx-auto mt-10 border-2 border-green-600 rounded-2xl shadow-2xl hover:bg-green-300 hover:bg-opacity-20 transition-all">
                           <p className="font-bold text-xl mx-auto text-green-600 my-3">Project Title</p>
                           <input onChange={(e) => setProjectTitle(e.target.value.slice(0, 15))} type="text" placeholder="Title" className='bg-green-200 font-bold py-1 px-5 rounded-xl'/>
                           <p className="font-bold text-xl mx-auto text-green-600 my-3">Project Content</p>
                           <textarea onChange={(e) => setProjectContent(e.target.value.slice(0, 140))} type="text" placeholder="Content" className="className=' bg-green-200 font-bold py-1 px-4 rounded-xl"/>
                           <div className="grid grid-cols-3 mt-5 w-fit gap-2 mx-auto">
                            <div>
                               <p className="font-bold text-lg mx-auto text-green-600 my-3">Deadline</p>
                               <input onChange={(e) => setProjectDeadline(e.target.value.slice(0, 10))} type="date" className=' bg-green-200 text-gray-400 font-bold py-1 w-[100%] rounded-xl'/>
                            </div>
                            <div>
                               <p className="font-bold text-lg mx-auto text-green-600 my-3">Camera</p>
                               <input onChange={(e) => setProjectCamera(e.target.value.slice(0, 15))} type="text" placeholder="Camera" className=' bg-green-200 font-bold py-1 w-[100%] rounded-xl'/>
                            </div>
                            <div>
                               <p className="font-bold text-lg mx-auto text-green-600 my-3">Amount</p>
                               <input onChange={(e) => setProjectAmount(e.target.value.slice(0, 10))} type="text" placeholder="Amount" className=' bg-green-200 font-bold py-1 w-[100%] rounded-xl'/>
                            </div>
                           </div>
                           <p className="font-bold text-xl mx-auto text-green-600 my-2">File Url</p>
                           <input onChange={(e) => setProjectUrl(e.target.value)} type="text" placeholder="Url" className=' bg-green-200 font-bold py-1 px-5 rounded-xl'/>
                           <button type="submit" className="mt-8 hover:bg-green-600 bg-green-500 w-fit px-3 py-1 font-bold text-white rounded-xl">Submit</button>
                       </form>
                  </div>
               </div>
               <hr className="my-7 w-[90%] mx-auto"/>
            </div>}
            
          {/* Available Button in side bar */}
          {activeView === 'Available' && 
          <div>
               
               {/* Note show */}
               <h1 className="mx-auto w-fit text-4xl font-bold text-gray-700">Note</h1>
               <hr className="my-5 w-[90%] mx-auto"/>
               <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
               {noteData && noteData.length > 0 ? (
                        noteData.map(val => (
                          <div key={val._id} className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                              <h4 className="m-3 text-2xl text-gray-800 font-bold">{val.title}</h4>
                              <p className="m-3 text-md h-[150px] text-gray-700" style={{ wordWrap: 'break-word' }}>{val.content}</p>
                              <div className="mt-5 m-3 flex">
                                  <Link className="bg-gray-500 text-white border py-1 px-2 rounded-md text-md w-fit" href={`/note_edit/${val._id}`}>Edit</Link>
                                  <DeleteBtn id={val._id} />
                              </div>
                          </div>
                        ))
                    ) : (
                        <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto"><p className="m-3">You do not have any posts yet.</p></div>
                    )}

               </div>
               <div>

                {/* Project show */}
               <h1 className="mx-auto w-fit text-4xl mt-5 font-bold text-gray-700">Project</h1>
               <hr className="my-5 w-[90%] mx-auto"/>
               <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
               {projectData && projectData.length > 0 ? (
                    projectData.map(val => (
                        <div key={val._id} className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-fit my-5 mx-auto">
                            <h4 className="m-3 text-2xl font-bold text-gray-800">{val.ProjectTitle}</h4>
                            <p className="m-3 text-md min-h-[100px] text-gray-700" style={{ wordWrap: 'break-word' }}>{val.ProjectContent}</p>
                            <p className="m-3 text-md text-gray-700 font-bold" style={{ wordWrap: 'break-word' }}>Deadline: {val.ProjectDeadline}</p>
                            <p className="m-3 text-md text-gray-700 font-bold" style={{ wordWrap: 'break-word' }}>Camera: {val.ProjectCamera}</p>
                            <p className="m-3 text-md text-gray-700 font-bold" style={{ wordWrap: 'break-word' }}>Amount: {val.ProjectAmount}</p>
                            <p className="m-3 text-md text-gray-700 font-bold flex" style={{ wordWrap: 'break-word' }}>Status: <div className="ml-2 animate-bounce text-yellow-500">{val.ProjectStatus}</div> </p>
                            <button className="mx-4 mt-3 text-blue-700 hover:text-blue-800 hover:underline transition-all hover:scale-110">
                                <a target="blank" href={val.ProjectUrl}>Link url</a>
                            </button>
                            <div className="mt-5 m-3 flex">                               
                                {val.ProjectStatus === "No one taking..." ? (
                                    <Link href={`/takeproject/${val._id}`} className="bg-yellow-500 text-white border py-1 px-2 rounded-lg">Take</Link>
                                ) : val.ProjectStatus === "Done" ? (
                                    // Hide the "Done" button if the status is "Done"
                                    null
                                ) : (
                                    <Link href={`/done/${val._id}`} className="bg-lime-500 text-white border py-1 px-2 rounded-lg">Done</Link>
                                )}
                                <ProjectDeleteBtn id={val._id} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-gray-200 rounded-xl w-11/12 shadow-2xl h-80 my-5 mx-auto">
                        <p className="m-3">You do not have any posts yet.</p>
                    </div>
                )}
               </div>
            </div> 
            </div>}

          
          {/* {activeView === 'Done' && <div>content Done</div>} */}
        </div>
      </div>
    </div>
  );
}

export default ProjectPage;
