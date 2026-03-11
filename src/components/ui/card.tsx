'use client';

import { useThemeColor } from '@/shared/hooks/use-theme-color';
import { useCognitiveBorders } from '@/components/ui/cognitive-styles';
import React from 'react';

export function Card({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const card = useThemeColor({}, 'card');
  const border = useThemeColor({}, 'border');
  const { borderWidth } = useCognitiveBorders();

  return (
    <div
      className={className}
      style={{
        backgroundColor: card,
        borderColor: border,
        borderWidth,
        borderStyle: 'solid',
        borderRadius: 14,
        padding: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
