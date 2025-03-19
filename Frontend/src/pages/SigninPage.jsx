import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare } from 'lucide-react';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/authImagePattern';
import { useAuthStore } from '../store/useAuthStore';

function SigninPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { signin, isSigningIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(formData);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials and try again.');
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-[#0a192f] text-gray-300'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8 bg-[#112240] p-8 rounded-lg shadow-lg'>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-[#233554] flex items-center justify-center group-hover:bg-[#1d3c64] transition-all'>
                <MessageSquare className='size-6 text-blue-400' size={48} strokeWidth={3} />
              </div>
              <h1 className='font-bold text-3xl mt-2 text-white'>Welcome Back</h1>
              <p className='text-gray-400'>Sign in to your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label text-white'>Email</label>
              <div className='relative'>
                <Mail className='absolute left-3 top-0.5 size-5 text-gray-400' />
                <input
                  type='email'
                  className='input input-bordered w-full pl-10 bg-[#1b2b48] text-white border-none focus:ring-2 focus:ring-blue-400'
                  placeholder='xyz@gmail.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div className='form-control'>
              <label className='label text-white'>Password</label>
              <div className='relative'>
                <Lock className='absolute left-3  size-5 text-gray-400' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='input input-bordered w-full pl-10 bg-[#1b2b48] text-white border-none focus:ring-2 focus:ring-blue-400'
                  placeholder='••••••••••'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='absolute right-3  text-gray-500 hover:text-blue-400'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className='size-6' /> : <Eye className='size-6' />}
                </button>
              </div>
            </div>
            {error && <p className='text-red-500 text-sm'>{error}</p>}
            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50'
              disabled={isSigningIn}
            >
              {isSigningIn ? (
                <div className='flex items-center justify-center gap-2'>
                  <Loader className='size-6 animate-spin text-center' />
                  Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='text-gray-400'>
              Don&apos;t have an account? {" "}
              <Link to='/signup' className='text-blue-400 hover:text-blue-500 transition-all'>Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <AuthImagePattern
        title='Join Our Community'
        subtitle='Connect with friends, share moments, and stay in touch with your loved ones.'
      />
    </div>
  );
}

export default SigninPage;
