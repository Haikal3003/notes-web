import React from 'react';

export default function Container({ children }) {
  return (
    <div id="container" className="relative w-full flex max-md:flex-wrap items-center ">
      {children}
    </div>
  );
}
