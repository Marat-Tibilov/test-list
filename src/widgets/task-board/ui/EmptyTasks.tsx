import type { TaskFilter } from '../../../entities/task'
import { Icon } from '../../../shared/ui/icon'

const content = {
  all: { title: 'Большие дела начинаются с маленьких', description: 'Добавьте первую задачу — и освободите место для новых идей.' },
  active: { title: 'Всё сделано. Можно выдохнуть.', description: 'Активных задач пока нет. Самое время немного отдохнуть.' },
  completed: { title: 'Ваши победы будут здесь', description: 'Выполните первую задачу, и она появится в этом списке.' },
} satisfies Record<TaskFilter, { title: string; description: string }>

export function EmptyTasks({ filter }: { filter: TaskFilter }) {
  return (
    <div className="empty-state">
      <div className="empty-state__illustration" aria-hidden="true">
        <div className="empty-state__paper"><span><i /><b /></span><span><i /><b /></span><span><i /><b /></span></div>
        <span className="empty-state__check"><Icon name="check" size={21} /></span>
        <span className="empty-state__spark">✦</span>
      </div>
      <h3>{content[filter].title}</h3>
      <p>{content[filter].description}</p>
    </div>
  )
}
