import { MAX_TASK_LENGTH, type Task } from './types.ts'

export const TASKS_STORAGE_KEY = 'po-delu:tasks:v1'

interface TasksSnapshot {
  tasks: Task[]
  storageError: string | null
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const task = value as Record<string, unknown>
  return (
    typeof task.id === 'string' && task.id.length > 0 &&
    typeof task.title === 'string' && task.title.trim().length > 0 &&
    task.title.length <= MAX_TASK_LENGTH && typeof task.completed === 'boolean'
  )
}

export function loadTasks(storage?: Pick<Storage, 'getItem'>): TasksSnapshot {
  try {
    const raw = (storage ?? window.localStorage).getItem(TASKS_STORAGE_KEY)
    if (raw === null) return { tasks: [], storageError: null }
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed) || !parsed.every(isTask)) throw new Error('Invalid tasks')
    if (new Set(parsed.map((task) => task.id)).size !== parsed.length) {
      throw new Error('Duplicate task identifiers')
    }
    return { tasks: parsed, storageError: null }
  } catch {
    return {
      tasks: [],
      storageError: 'Не удалось прочитать сохранённые задачи. Новые задачи можно добавлять как обычно.',
    }
  }
}

export function saveTasks(tasks: Task[], storage?: Pick<Storage, 'setItem'>): string | null {
  try {
    (storage ?? window.localStorage).setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    return null
  } catch {
    return 'Не удалось сохранить изменения. Задачи доступны до обновления страницы.'
  }
}
