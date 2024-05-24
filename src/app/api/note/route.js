// app/api/posts/[id]/route.js

import { connectMongoDB } from "../../../../lib/mongodb";
import Note from "../../../../models/note";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, content } = await req.json();
        console.log(title, content);
        
        await connectMongoDB();
        await Note.create({ title, content });

        return NextResponse.json({ message: "Note created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.error(new Error("Failed to create a note"), { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const note = await Note.find({});
        return NextResponse.json({ note });
    } catch (error) {
        console.error("Error fetching note:", error);
        return NextResponse.error(new Error("Failed to fetch note"), { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: "Note deleted"}, { status: 200 })
}
