import './task-board.css'
import { TaskItem } from '../../../entities/task'
import { CreateTaskForm } from '../../../features/create-task'
import { TaskFilters } from '../../../features/filter-tasks'
import { pluralize } from '../../../shared/lib/pluralize'
import { Icon } from '../../../shared/ui/icon'
import { useTaskBoard } from '../model/use-task-board'
import { EmptyTasks } from './EmptyTasks'
import { TaskProgress } from './TaskProgress'

export function TaskBoard() {
  const {
    tasks, visibleTasks, storageError, addTask, toggleTask,
    removeTask, filter, setFilter, stats, progress,
  } = useTaskBoard()
  return (
    <div className="board-layout">
      <section className="task-board" aria-labelledby="tasks-title">
        <div className="section-heading">
          <div>
            <Icon name="list" size={21} />
            <h2 id="tasks-title">Мои задачи</h2>
            <span className="total-badge">{stats.all}</span>
          </div>
          <span className="section-heading__note">Всё начинается с плана</span>
        </div>
        <CreateTaskForm onAdd={addTask} />
        <p className="input-hint" id="task-input-hint">
          Нажмите Enter, чтобы добавить задачу <span>↵</span>
        </p>
        {storageError && <p className="storage-error" role="alert">{storageError}</p>}
        <div className="task-panel">
          <TaskFilters value={filter} onChange={setFilter} counts={stats} />
          {visibleTasks.length > 0 ? (
            <ul className="task-list" aria-label="Задачи">
              {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />
              ))}
            </ul>
          ) : <EmptyTasks filter={filter} />}
          <div className="task-panel__footer" aria-live="polite" aria-atomic="true">
            <span>
              <span className="status-dot" />
              {stats.active} {pluralize(stats.active, ['задача осталась', 'задачи осталось', 'задач осталось'])}
            </span>
            <span>{tasks.length > 0 ? `${stats.completed} выполнено` : 'У вас всё впереди'}</span>
          </div>
        </div>
      </section>
      <TaskProgress total={stats.all} completed={stats.completed} progress={progress} />
    </div>
  )
}
