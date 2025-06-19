import { connectDB } from "@/lib/ConnectDB";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  await connectDB();

  const { id } = params;
  const { content, userEmail, userName, userImage } = await req.json();

  if (!content) {
    return NextResponse.json({ error: 'Comment Content Is Required' }, { status: 400 });
  }

  const post = await Post.findById(id);
  if (!post) {
    return NextResponse.json({ error: 'Post Not Found' }, { status: 404 });
  }

  post.comments.push({ content, userEmail, userName, userImage });
  await post.save();

  return NextResponse.json({ message: 'Comment Added', post, status: 201 });
}