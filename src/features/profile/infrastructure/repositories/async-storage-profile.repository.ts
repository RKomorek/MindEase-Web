import { UserPreferences } from '@/features/profile/domain/entities/user-preferences.entity';
import { UserProfile } from '@/features/profile/domain/entities/user-profile.entity';
import { ProfileRepository } from '@/features/profile/domain/repositories/profile.repository.interface';

const KEYS = {
  preferences: 'mindease:preferences:v1',
  profile: 'mindease:profile:v1',
} as const;

export class AsyncStorageProfileRepository implements ProfileRepository {
  async getPreferences(): Promise<UserPreferences | null> {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEYS.preferences);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserPreferences;
    } catch {
      return null;
    }
  }

  async setPreferences(preferences: UserPreferences): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.preferences, JSON.stringify(preferences));
  }

  async getProfile(): Promise<UserProfile | null> {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(KEYS.profile);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  }

  async setProfile(profile: UserProfile): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEYS.profile, JSON.stringify(profile));
  }
}
