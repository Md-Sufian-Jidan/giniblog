import { connectDB } from "@/lib/ConnectDB";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectDB();
    const { id } = params;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return new NextResponse(JSON.stringify({ status: 404, message: 'Post Not Found' }));
        }
        return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message, status: 500 }));
    }
};

