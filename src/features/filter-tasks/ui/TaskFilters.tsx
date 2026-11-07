import './task-filters.css'
import type { TaskFilter } from '../../../entities/task'

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

interface TaskFiltersProps {
  value: TaskFilter
  onChange: (filter: TaskFilter) => void
  counts: Record<TaskFilter, number>
}

export function TaskFilters({ value, onChange, counts }: TaskFiltersProps) {
  return (
    <div className="task-filters" role="group" aria-label="Фильтр задач">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          className={`task-filter${value === filter.value ? ' task-filter--selected' : ''}`}
          aria-pressed={value === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}<span className="task-filter__count">{counts[filter.value]}</span>
        </button>
      ))}
    </div>
  )
}
