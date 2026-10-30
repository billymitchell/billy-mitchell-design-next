'use client';

import { ParallaxProvider } from 'react-scroll-parallax';

export default function ParallaxContextProvider({ children }) {
  return <ParallaxProvider>{children}</ParallaxProvider>;
}
