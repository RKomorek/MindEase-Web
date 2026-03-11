'use client';

import React from 'react';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  backgroundColor?: string;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export default function SafeAreaWrapper({
  children,
  style,
  backgroundColor,
  edges = ['top', 'bottom', 'left', 'right'],
}: SafeAreaWrapperProps) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: '100%',
        backgroundColor,
        paddingTop: edges.includes('top') ? 'env(safe-area-inset-top, 0)' : 0,
        paddingBottom: edges.includes('bottom') ? 'env(safe-area-inset-bottom, 0)' : 0,
        paddingLeft: edges.includes('left') ? 'env(safe-area-inset-left, 0)' : 0,
        paddingRight: edges.includes('right') ? 'env(safe-area-inset-right, 0)' : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
