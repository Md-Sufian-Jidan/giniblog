import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    userEmail: String,
    content: String,
}, { timestamps: true });

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Post title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Post content/description is required'],
        },
        image: {
            type: String,
            required: [true, 'Post image URL is required'],
        },
        tags: {
            type: [String],
            default: [],
        },
        category: {
            type: String,
            enum: ['Technology', 'Design', 'Education', 'Business', 'Lifestyle'],
            required: [true, 'Category is required'],
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
        },
        author_email: {
            type: String,
            required: [true, 'Author email is required'],
        },
        author_img: {
            type: String,
            required: [true, 'Author image URL is required'],
        },
        date: {
            type: Date,
            default: Date.now,
        },
        upvotes: {
            type: Number,
            default: 0
        },
        downvotes: {
            type: Number,
            default: 0
        },
        comments: [commentSchema],
    },
    { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
