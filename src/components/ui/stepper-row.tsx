'use client';

import React from 'react';
import { useThemeColor } from '@/shared/hooks/use-theme-color';
import { Button } from '@/components/ui/button';
import { useCognitiveSpacing, useCognitiveTextStyle } from '@/components/ui/cognitive-styles';

export function StepperRow({
  label,
  valueLabel,
  onDec,
  onInc,
  helper,
}: {
  label: string;
  valueLabel: string;
  onDec: () => void;
  onInc: () => void;
  helper?: string;
}) {
  const foreground = useThemeColor({}, 'foreground');
  const muted = useThemeColor({}, 'muted');
  const { gap, compactGap } = useCognitiveSpacing();
  const labelStyle = useCognitiveTextStyle({ weight: '600' });
  const valueStyle = useCognitiveTextStyle({ weight: '700' });
  const helperStyle = useCognitiveTextStyle();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
          <span
            style={{ ...labelStyle, color: foreground } as React.CSSProperties}
          >
            {label}
          </span>
          {helper ? (
            <span
              style={
                {
                  ...helperStyle,
                  color: muted,
                  marginTop: 4,
                  display: 'block',
                } as React.CSSProperties
              }
            >
              {helper}
            </span>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: compactGap,
          }}
        >
          <Button
            title="-"
            variant="secondary"
            onClick={onDec}
            style={{
              width: 44,
              height: 44,
              padding: 0,
              borderRadius: 10,
            }}
          />
          <span
            style={
              {
                ...valueStyle,
                color: foreground,
                minWidth: 64,
                textAlign: 'center',
              } as React.CSSProperties
            }
          >
            {valueLabel}
          </span>
          <Button
            title="+"
            variant="secondary"
            onClick={onInc}
            style={{
              width: 44,
              height: 44,
              padding: 0,
              borderRadius: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}
