'use client';

import { useThemeColor } from '@/shared/hooks/use-theme-color';
import { useCognitiveSpacing, useCognitiveTextStyle } from '@/components/ui/cognitive-styles';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';
import React from 'react';

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function hexToRgb(hex: string) {
  const cleaned = hex.replace('#', '').trim();
  const full =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;
  const int = parseInt(full, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return { r, g, b };
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }) {
  const to = (n: number) =>
    Math.round(n)
      .toString(16)
      .padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}

function mixHex(a: string, b: string, t: number) {
  const tt = clamp01(t);
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return rgbToHex({
    r: A.r + (B.r - A.r) * tt,
    g: A.g + (B.g - A.g) * tt,
    b: A.b + (B.b - A.b) * tt,
  });
}

export function ToggleRow({
  label,
  value,
  onChange,
  description,
}: {
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
  description?: string;
}) {
  const foreground = useThemeColor({}, 'foreground');
  const muted = useThemeColor({}, 'muted');
  const textStyle = useCognitiveTextStyle({ weight: '600' });
  const descStyle = useCognitiveTextStyle();
  const { gap } = useCognitiveSpacing();

  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const border = useThemeColor({}, 'border');
  const background = useThemeColor({}, 'background');
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const trackOff = isDark ? secondary : border;
  const thumb = isDark ? foreground : mixHex(background, border, 0.22);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap,
      }}
    >
      <div style={{ flex: 1, paddingRight: 12 }}>
        <span style={{ ...textStyle, color: foreground } as React.CSSProperties}>
          {label}
        </span>
        {description ? (
          <span
            style={
              {
                ...descStyle,
                color: muted,
                marginTop: 4,
                display: 'block',
              } as React.CSSProperties
            }
          >
            {description}
          </span>
        ) : null}
      </div>
      <label
        style={{
          position: 'relative',
          display: 'inline-block',
          width: 51,
          height: 31,
          flexShrink: 0,
          cursor: 'pointer',
        }}
        aria-label={label}
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          style={{
            opacity: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: 'pointer',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: value ? primary : trackOff,
            borderRadius: 31,
            transition: 'background-color 0.2s',
          }}
        />
        <span
          style={{
            position: 'absolute',
            height: 27,
            width: 27,
            left: 2,
            top: 2,
            backgroundColor: thumb,
            borderRadius: '50%',
            transition: 'transform 0.2s',
            transform: value ? 'translateX(20px)' : 'translateX(0)',
          }}
        />
      </label>
    </div>
  );
}
