import './task-item.css'
import { Icon } from '../../../shared/ui/icon'
import type { Task } from '../model/types'

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <li className={`task-item${task.completed ? ' task-item--completed' : ''}`}>
      <label className="task-item__label">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="task-item__title">{task.title}</span>
      </label>
      <button
        className="icon-button task-item__delete"
        type="button"
        onClick={() => onRemove(task.id)}
        aria-label={`Удалить задачу «${task.title}»`}
        title="Удалить задачу"
      >
        <Icon name="trash" size={18} />
      </button>
    </li>
  )
}
