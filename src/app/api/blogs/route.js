import { connectDB } from '@/lib/ConnectDB';
import Post from '@/models/Post';

export async function GET(req) {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 12;
    const search = searchParams.get('search') || '';
    const sort = searchParams.get('sort') || 'newest';
    const category = searchParams.get('category') || 'all';

    const query = {};

    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    if (category !== 'all') {
        query.category = category;
    }

    let sortOption = { createdAt: -1 };

    if (sort === 'oldest') {
        sortOption = { createdAt: 1 };
    } else if (sort === 'mostLiked') {
        sortOption = { likes: -1 };
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit);

    return Response.json({ posts, total });
}
