import { useState, useEffect } from 'react';

interface Screen {
  size: number;
  validation: Boolean;
}

const useScreenSize = ({
  validation
}: {
  validation: (w: Number, h: Number) => Boolean;
}): Screen => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    size: screenSize,
    validation: validation(window.innerWidth, window.innerHeight),
  };
};

export default useScreenSize;
