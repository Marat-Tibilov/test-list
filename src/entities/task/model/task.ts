import { MAX_TASK_LENGTH, type Task, type TaskFilter } from './types.ts'

export function createTask(title: string): Task | null {
  const normalizedTitle = title.trim()
  if (!normalizedTitle || normalizedTitle.length > MAX_TASK_LENGTH) return null
  return { id: crypto.randomUUID(), title: normalizedTitle, completed: false }
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  )
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id)
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  return tasks.filter((task) =>
    filter === 'all' || (filter === 'completed' ? task.completed : !task.completed),
  )
}

export function getTaskStats(tasks: Task[]) {
  const completed = tasks.filter((task) => task.completed).length
  return { all: tasks.length, completed, active: tasks.length - completed }
}
