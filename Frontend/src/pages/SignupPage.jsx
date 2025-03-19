import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthImagePattern from '../components/authImagePattern';

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '' });
  const { signUp, isSignUp } = useAuthStore();

  const validateForm = () => {
    if (formData.fullname.trim() === '') return toast.error('Full Name is Required');
    if (formData.email.trim() === '') return toast.error('Email is Required');
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Invalid Email');
    if (formData.password.trim() === '') return toast.error('Password is Required');
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signUp(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-[#0f172a] text-white'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* Logo */}
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:bg-blue-700 transition-colors'>
                <MessageSquare className='size-6 text-white' />
              </div>
              <h1 className='font-bold text-2xl mt-2'>Create Account</h1>
              <p className='text-gray-400'>Get Started With Your Free Account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-4'>
            {['fullname', 'email', 'password'].map((field, index) => (
              <div className='form-control' key={index}>
                <label className='label text-gray-300'>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400'>
                    {field === 'fullname' && <User className='size-5' />}
                    {field === 'email' && <Mail className='size-5' />}
                    {field === 'password' && <Lock className='size-5' />}
                  </div>
                  <input
                    type={field === 'password' && !showPassword ? 'password' : 'text'}
                    className='input w-full pl-10 bg-gray-800 border border-gray-600 rounded-md p-3 text-white'
                    placeholder={field === 'password' ? '••••••••' : ''}
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                  />
                  {field === 'password' && (
                    <button
                      type='button'
                      className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type='submit'
              className='w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-3 transition-all duration-200'
              disabled={isSignUp}
            >
              {isSignUp ? (
                <div className='flex items-center justify-center gap-2'>
                  <Loader className='size-6 animate-spin' />
                  Loading...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className='text-center'>
            <p className='text-gray-400'>Already Have An Account?{' '}
              <Link to='/signin' className='text-blue-400 hover:underline'>Sign In</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title='Join Our Community'
        subtitle='Connect with friends, share moments, and stay in touch with your loved ones.'
      />
    </div>
  );
}

export default SignupPage;