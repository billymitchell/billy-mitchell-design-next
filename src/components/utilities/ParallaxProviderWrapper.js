"use client";
import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const ParallaxWrapper = ({ children, y, x, ...props }) => {
    return (
        <Parallax {...props}>
            {children}
        </Parallax>
    );
};

export default ParallaxWrapper;
