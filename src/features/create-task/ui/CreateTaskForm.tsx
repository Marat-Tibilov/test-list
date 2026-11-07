import './create-task-form.css'
import { MAX_TASK_LENGTH } from '../../../entities/task'
import { Icon } from '../../../shared/ui/icon'
import { useTaskForm } from '../model/use-task-form'

export function CreateTaskForm({ onAdd }: { onAdd: (title: string) => boolean }) {
  const { title, setTitle, inputRef, canSubmit, handleSubmit } = useTaskForm(onAdd)

  return (
    <form className="create-task" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="task-title">Новая задача</label>
      <Icon name="plus" size={22} className="create-task__icon" />
      <input
        ref={inputRef}
        id="task-title"
        autoComplete="off"
        placeholder="Что нужно сделать?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={MAX_TASK_LENGTH}
        aria-describedby="task-input-hint"
      />
      <button className="button button--primary" type="submit" disabled={!canSubmit}>
        Добавить <Icon name="arrow" size={17} />
      </button>
    </form>
  )
}
