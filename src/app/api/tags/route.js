import { NextResponse } from 'next/server';
import Post from '@/models/Post';
import { connectDB } from '@/lib/ConnectDB';

export async function GET() {
    try {
        await connectDB();
        const tagsAggregation = await Post.aggregate([
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 50 },
        ]);

        const tags = tagsAggregation.map(({ _id, count }) => ({
            name: _id,
            count,
        }));

        return NextResponse.json(tags);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
