'use client';

import { useSettingsStore } from '@/shared/stores/settings-store';
import { clamp } from '@/shared/utils/clamp';
import { useMemo } from 'react';

export type CognitiveTextStyle = React.CSSProperties & {
  fontSize?: number;
  lineHeight?: number;
  fontWeight?: string | number;
};

export function useCognitiveSpacing() {
  const { spacingIntensity } = useSettingsStore();
  return useMemo(() => {
    const scale = clamp(spacingIntensity, 0, 3);
    const gap = 8 + scale * 4;
    const pad = 12 + scale * 4;
    const buttonGap = Math.max(6, gap - 4);
    const compactGap = Math.max(4, gap - 6);
    return { gap, pad, buttonGap, compactGap };
  }, [spacingIntensity]);
}

export function useCognitiveTextStyle({
  weight,
}: { weight?: React.CSSProperties['fontWeight'] } = {}): CognitiveTextStyle {
  const { fontScale } = useSettingsStore();
  return useMemo(
    () => ({
      fontSize: 16 * clamp(fontScale, 0.9, 1.4),
      
      fontWeight: weight,
    }),
    [fontScale, weight]
  );
}

export function useCognitiveScreenTitleStyle(): CognitiveTextStyle {
  const { fontScale } = useSettingsStore();
  return useMemo(
    () => ({
      fontSize: 28 * clamp(fontScale, 0.9, 1.4),
      
      fontWeight: '800',
    }),
    [fontScale]
  );
}

export function useCognitiveBorders() {
  const contrastIntensity = useSettingsStore((s) => s.contrastIntensity);
  return useMemo(() => {
    const intensity = clamp(contrastIntensity, 0, 3);
    const borderWidth = intensity <= 1 ? 1 : intensity;
    return { intensity, borderWidth };
  }, [contrastIntensity]);
}

export function useCognitiveContainerStyle(): React.CSSProperties {
  const { pad } = useCognitiveSpacing();
  return useMemo(
    () => ({
      paddingTop: pad,
      paddingBottom: pad,
      paddingLeft: Math.max(10, pad - 2),
      paddingRight: Math.max(10, pad - 2),
    }),
    [pad]
  );
}
