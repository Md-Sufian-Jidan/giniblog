import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const search = searchParams.get('search') || '';
    const email = searchParams.get('author_email');
    const limit = 10;
    const skip = (page - 1) * limit;
    const query = {};

    if (email) {
        query.author_email = email;
    }
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

    return NextResponse.json({ posts, total });
};
