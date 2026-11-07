import type { CSSProperties } from 'react'
import { Icon } from '../../../shared/ui/icon'

interface TaskProgressProps {
  total: number
  completed: number
  progress: number
}

export function TaskProgress({ total, completed, progress }: TaskProgressProps) {
  return (
    <aside className="progress-card" aria-labelledby="progress-title">
      <div className="progress-card__eyebrow"><Icon name="spark" size={17} /> ШАГ ЗА ШАГОМ</div>
      <h2 id="progress-title">Ваш прогресс</h2>
      <div
        className="progress-ring"
        style={{ '--progress': `${progress}%` } as CSSProperties}
        role="progressbar"
        aria-label="Выполненные задачи"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-ring__inner">
          <strong>{progress}<span>%</span></strong>
          <span>выполнено</span>
        </div>
      </div>
      <p className="progress-card__count"><strong>{completed}</strong> из {total} задач</p>
      <div className="progress-card__divider" />
      <p className="progress-card__message">{total > 0 && completed === total ? 'Отличная работа!' : 'По одному делу за раз.'}</p>
      <p className="progress-card__hint">{total > 0 && completed === total ? 'Все задачи выполнены. Насладитесь результатом.' : 'Даже маленький шаг — это движение вперёд.'}</p>
    </aside>
  )
}
