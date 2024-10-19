'use client';

import Masonry from "react-masonry-css";

const ClientMasonry = ({ breakpointCols, className, columnClassName, children }) => {
  return(
    <Masonry
    breakpointCols={breakpointCols}
    className={className}
    columnClassName={columnClassName}>
      {children}
    </Masonry>
  )
};

export default ClientMasonry;