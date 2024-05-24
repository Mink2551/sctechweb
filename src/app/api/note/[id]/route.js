import { connectMongoDB } from "../../../../../lib/mongodb";
import Note from "../../../../../models/note";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const note = await Note.findOne({ _id: id });
    return NextResponse.json({ note }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newContent: content} = await req.json();
    await connectMongoDB();
    await Note.findByIdAndUpdate(id, { title, content });
    return NextResponse.json({ message: "Note Updated"}, { status: 200 });
}