import React from 'react';

const MyContainer = ({ children, className = "" }) => {
  return (
    <div className={`max-w-screen-2xl mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};

export default MyContainer;