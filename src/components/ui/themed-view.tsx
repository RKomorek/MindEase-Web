'use client';

import { useThemeColor } from '@/shared/hooks/use-theme-color';

export type ThemedViewProps = React.HTMLAttributes<HTMLDivElement> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );
  return (
    <div
      style={{ backgroundColor, ...style }}
      {...otherProps}
    />
  );
}
