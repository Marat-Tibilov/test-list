import './tasks-page.css'
import { Icon } from '../../../shared/ui/icon'
import { TaskBoard } from '../../../widgets/task-board'

export function TasksPage() {
  const today = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' }).format(new Date())
  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="./" aria-label="По делу — главная"><span className="brand__mark"><Icon name="check" size={23} /></span>по делу<span className="brand__dot">.</span></a>
        <span className="header-label">Место для ваших планов</span>
        <span className="personal-badge"><span />Личное пространство</span>
      </header>
      <main className="main-content">
        <section className="page-intro" aria-labelledby="page-title">
          <div>
            <p className="eyebrow"><span />ПОРЯДОК В ДЕЛАХ — ЛЁГКОСТЬ В ГОЛОВЕ</p>
            <h1 id="page-title">Меньше шума.<br /><span>Больше сделанного.</span></h1>
            <p className="page-intro__description">Соберите все дела в одном месте. И двигайтесь в своём темпе.</p>
          </div>
          <div className="date-label"><Icon name="calendar" size={18} /><span>{today}</span></div>
        </section>
        <TaskBoard />
        <div className="privacy-note"><Icon name="lock" size={14} /><span>Только ваши дела. Задачи сохраняются в этом браузере.</span></div>
      </main>
      <footer className="site-footer"><span>Маленькие шаги. Большие перемены.</span><span>Сделайте сегодня чуть больше для себя <span className="footer-spark">✦</span></span></footer>
    </div>
  )
}
