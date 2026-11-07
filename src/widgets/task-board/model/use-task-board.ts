import { filterTasks, getTaskStats, useTasks } from '../../../entities/task'
import { useTaskFilter } from '../../../features/filter-tasks'

export function useTaskBoard() {
  const taskModel = useTasks()
  const filterModel = useTaskFilter()
  const stats = getTaskStats(taskModel.tasks)
  return {
    ...taskModel,
    ...filterModel,
    stats,
    visibleTasks: filterTasks(taskModel.tasks, filterModel.filter),
    progress: stats.all === 0 ? 0 : Math.round(stats.completed / stats.all * 100),
  }
}
