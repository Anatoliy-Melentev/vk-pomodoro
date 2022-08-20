import React from 'react';
import styles from './rubber.sass';

export function Rubber({ children, size, isRubber = true }) {
  return (
    <div style={{
      paddingTop: isRubber && `${size}%`,
      position: isRubber ? 'relative' : 'static',
      height: isRubber ? 0 : 'auto',
      border: 'none',
    }}
    >
      <div
        style={{
          position: isRubber ? 'absolute' : 'static',
          margin: 'auto',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          height: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
}
