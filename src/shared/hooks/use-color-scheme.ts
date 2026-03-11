'use client';

import { useSyncExternalStore } from 'react';
import { useSettingsStore } from '@/shared/stores/settings-store';

function getSystemScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function subscribeToSystemScheme(callback: () => void) {
  const m = window.matchMedia('(prefers-color-scheme: dark)');
  m.addEventListener('change', callback);
  return () => m.removeEventListener('change', callback);
}

export function useColorScheme(): 'light' | 'dark' {
  const preference = useSettingsStore((s) => s.themePreference);
  const systemScheme = useSyncExternalStore(
    subscribeToSystemScheme,
    getSystemScheme,
    () => 'light'
  );

  if (preference === 'light' || preference === 'dark') return preference;
  return systemScheme as 'light' | 'dark';
}
