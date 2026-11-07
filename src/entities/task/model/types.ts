export interface Task {
  id: string
  title: string
  completed: boolean
}

export type TaskFilter = 'all' | 'active' | 'completed'

export const MAX_TASK_LENGTH = 280
