import React from 'react';
import Sidebar from './Sidebar';
import PostForm from '../Movie/PostForm';

const Layout = () => {
  return (
    <div className='flex flex-row h-screen w-screen bg-gradient-to-b from-[#3B1578] to-[#0B0C10]'>
      <Sidebar className='w-1/4 h-full' />
      <div className='flex-1 overflow-y-auto p-6 py-16'>
        <PostForm />
      </div>
    </div>
  );
};

export default Layout;
