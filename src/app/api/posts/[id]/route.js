import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newContent: content, newUrl: url } = await req.json();
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, content, url });
    return NextResponse.json({ message: "Post Updated"}, { status: 200 });
}