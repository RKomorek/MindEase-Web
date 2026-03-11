'use client';

import { useThemeColor } from '@/shared/hooks/use-theme-color';

export function MindEaseLogo({
  size = 120,
  transparentBackground = false,
  showCircleBorder = false,
  accentColor,
  foregroundColor,
  borderColor,
  backgroundColor,
}: {
  size?: number;
  transparentBackground?: boolean;
  showCircleBorder?: boolean;
  accentColor?: string;
  foregroundColor?: string;
  borderColor?: string;
  backgroundColor?: string;
}) {
  const themeBackground = useThemeColor({}, 'background');
  const themeBorder = useThemeColor({}, 'border');
  const themeForeground = useThemeColor({}, 'foreground');
  const themePrimary = useThemeColor({}, 'primary');

  const background = backgroundColor ?? themeBackground;
  const border = borderColor ?? themeBorder;
  const foreground = foregroundColor ?? themeForeground;
  const primary = accentColor ?? themePrimary;

  const circleFill = transparentBackground ? 'transparent' : background;
  const circleStroke = showCircleBorder ? border : 'none';
  const circleStrokeWidth = showCircleBorder ? 2 : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      style={{ display: 'block' }}
    >
      <circle
        cx={80}
        cy={80}
        r={72}
        fill={circleFill}
        stroke={circleStroke}
        strokeWidth={circleStrokeWidth}
      />
      <path
        d="M45 55 Q65 48 80 55 T115 55"
        stroke={primary}
        strokeOpacity={0.25}
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M45 65 Q65 58 80 65 T115 65"
        stroke={primary}
        strokeOpacity={0.55}
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M45 75 Q65 68 80 75 T115 75"
        stroke={primary}
        strokeWidth={3.5}
        strokeLinecap="round"
        fill="none"
      />
      <text
        x={80}
        y={105}
        textAnchor="middle"
        fontSize={20}
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        <tspan fill={foreground}>Mind</tspan>
        <tspan fill={primary}>Ease</tspan>
      </text>
    </svg>
  );
}

export default MindEaseLogo;
