import React from 'react';
import Sidebar from './Sidebar';
import Theaters from './Theaters-component';

const Theater = () => {
  return (
    <div className="flex flex-row h-full w-screen">
      <Sidebar className='w-1/4 h-full' />
      {/* Adjusted padding to prevent overlap */}
      <div className='flex-1 overflow-y-auto py-16'>
        <Theaters />
      </div>
    </div>
  );
};

export default Theater;
