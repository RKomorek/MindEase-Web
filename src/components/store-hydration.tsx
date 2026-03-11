'use client';

import { useEffect } from 'react';
import { useSettingsStore } from '@/shared/stores/settings-store';
import { useTasksStore } from '@/shared/stores/tasks-store';

export function StoreHydration({ children }: { children: React.ReactNode }) {
  const hydrateSettings = useSettingsStore((s) => s.hydrate);
  const hydrateTasks = useTasksStore((s) => s.hydrate);

  useEffect(() => {
    void hydrateSettings();
    void hydrateTasks();
  }, [hydrateSettings, hydrateTasks]);

  return <>{children}</>;
}
