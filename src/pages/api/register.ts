import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { name, email, password, image } = req.body;

        if (!name || !email || !password || !image) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            image,
        });

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Register API error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

