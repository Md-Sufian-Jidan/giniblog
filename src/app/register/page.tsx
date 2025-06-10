'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
// import { setUserRegistered } from '@/redux/features/authSlice';

interface FormValues {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    const reader = new FileReader();
    reader.readAsDataURL(data.image[0]);

    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
            image: base64Image,
          })
        });

        const result = await res.json();

        if (!res.ok) throw new Error(result.message);

        toast.success('Registered successfully!');
        // dispatch(setUserRegistered(true));
        router.push('/login');
        reset();
      } catch (err: any) {
        toast.error(err.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    };
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-lg dark:bg-slate-900">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Name</label>
          <input type="text" {...register('name', { required: true })} className="input" />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register('email', { required: true })} className="input" />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>

        <div>
          <label>Password</label>
          <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" />
          {errors.password && <span className="text-red-500 text-sm">Password is required (min 6 characters)</span>}
        </div>

        <div>
          <label>Profile Image</label>
          <input type="file" accept="image/*" {...register('image', { required: true })} className="input" />
          {errors.image && <span className="text-red-500 text-sm">Image is required</span>}
        </div>

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
