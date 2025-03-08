import React from 'react';

export const OtherPage: React.FC = () => {
  return (
    <div>
      <h1>Other Page</h1>
      <p>
        This page can do its own REST calls or subscribe to other Socket events, 
        or handle different data flows as needed.
      </p>
    </div>
  );
};
