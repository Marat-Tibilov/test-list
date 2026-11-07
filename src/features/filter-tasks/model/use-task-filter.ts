import { useState } from 'react'
import type { TaskFilter } from '../../../entities/task'

export function useTaskFilter() {
  const [filter, setFilter] = useState<TaskFilter>('all')
  return { filter, setFilter }
}
