// app/api/posts/[id]/route.js

import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, content, url } = await req.json();
        console.log(title, content, url);
        
        await connectMongoDB();
        await Post.create({ title, content, url });

        return NextResponse.json({ message: "Post created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.error(new Error("Failed to create a post"), { status: 500 });
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const posts = await Post.find({});
        return NextResponse.json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.error(new Error("Failed to fetch posts"), { status: 500 });
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted"}, { status: 200 })
}