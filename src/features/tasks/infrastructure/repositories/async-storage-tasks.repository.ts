import { Task } from '@/features/tasks/domain/entities/task.entity';
import { TasksRepository } from '@/features/tasks/domain/repositories/tasks.repository.interface';

const KEY = 'mindease:tasks:v1';

export class AsyncStorageTasksRepository implements TasksRepository {
  async getAll(): Promise<Task[]> {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Task[];
    } catch {
      return [];
    }
  }

  async setAll(tasks: Task[]): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }
}
