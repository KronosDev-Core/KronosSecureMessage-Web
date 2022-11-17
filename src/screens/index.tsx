import { FC, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useScreenSize from '../hooks/screen';

const Screens: FC = (): JSX.Element => {
  const { validation } = useScreenSize({ validation: (w, h) => w < 350 });

  return (
    <>
      {validation ? (
        <div className='absolute inset-0 grid grid-cols-1 grid-rows-1 w-full h-full'>
        <p className='text-red-500 text-2xl text-center m-auto'>❗Your screen size is currently too small 😥❗</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 grid-rows-1 absolute inset-0 bg-[#FBF5F3] text-[#000022] text-center lg:text-left  overflow-hidden">
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Screens;
