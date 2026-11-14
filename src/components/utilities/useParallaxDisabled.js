'use client';
import { useEffect, useState } from 'react';

// Parallax is turned off on small viewports and back on when there is room.
export default function useParallaxDisabled() {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const handleResize = () =>
      setDisabled(window.innerWidth <= 800 || window.innerHeight <= 600);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return disabled;
}
