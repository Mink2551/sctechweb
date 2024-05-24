import { connectMongoDB } from "../../../../../lib/mongodb";
import Project from "../../../../../models/project";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  await connectMongoDB();
  try {
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const {
    newProjectTitle: ProjectTitle,
    newProjectContent: ProjectContent,
    newProjectDeadline: ProjectDeadline,
    newProjectCamera: ProjectCamera,
    newProjectAmount: ProjectAmount,
    newProjectUrl: ProjectUrl,
    newProjectStatus: ProjectStatus,
  } = await req.json();

  await connectMongoDB();

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ProjectTitle, ProjectContent, ProjectDeadline, ProjectCamera, ProjectAmount, ProjectUrl, ProjectStatus },
      { new: true } // Option to return the updated document
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project Updated", project: updatedProject }, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
