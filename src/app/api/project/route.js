// app/api/posts/[id]/route.js

import { connectMongoDB } from "../../../../lib/mongodb";
import Project from "../../../../models/project";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { ProjectTitle, ProjectContent, ProjectDeadline, ProjectCamera, ProjectAmount, ProjectUrl, ProjectStatus } = await req.json();
        console.log( ProjectTitle, ProjectContent, ProjectDeadline, ProjectCamera, ProjectAmount, ProjectUrl, ProjectStatus);
        
        await connectMongoDB();
        await Project.create({ ProjectTitle, ProjectContent, ProjectDeadline, ProjectCamera, ProjectAmount, ProjectUrl, ProjectStatus});

        return NextResponse.json({ message: "Project created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating Project:", error);
        return NextResponse.error(new Error("Failed to create a Project"), { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const project = await Project.find({});
        return NextResponse.json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.error(new Error("Failed to fetch project"), { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted"}, { status: 200 })
}
