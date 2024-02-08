import { useState, CSSProperties } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';

import React from 'react';

function ReactSpinner({ color = '#ffffff' }) {
  return (
    <ScaleLoader
      color={color}
      loading={true}
      cssOverride={{
        display: 'block',
        margin: '0 auto',
        borderColor: 'red'
      }}
      size={150}
      aria-label='Loading Spinner'
      data-testid='loader'
      height={15}
      width={3}
    />
  );
}

export default ReactSpinner;
