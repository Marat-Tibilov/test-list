import assert from 'node:assert/strict'
import { test } from 'node:test'
import { createTask, filterTasks, getTaskStats, removeTask, toggleTask } from '../src/entities/task/model/task.ts'
import { loadTasks, saveTasks, TASKS_STORAGE_KEY } from '../src/entities/task/model/storage.ts'
import { MAX_TASK_LENGTH, type Task } from '../src/entities/task/model/types.ts'
import { pluralize } from '../src/shared/lib/pluralize.ts'

const tasks: Task[] = [
  { id: 'one', title: 'Активная задача', completed: false },
  { id: 'two', title: 'Выполненная задача', completed: true },
]

test('пустые строки и пробельные символы не становятся задачами', () => {
  for (const title of ['', '   ', '\t\n', '\u00a0']) assert.equal(createTask(title), null)
  assert.equal(createTask('x'.repeat(MAX_TASK_LENGTH + 1)), null)
})

test('новая задача получает чистый текст, уникальный id и активный статус', () => {
  const first = createTask('  Купить продукты  ')
  assert.equal(first?.title, 'Купить продукты')
  assert.equal(first?.completed, false)
  assert.notEqual(first?.id, createTask('Купить продукты')?.id)
})

test('статус переключается в обе стороны, исходный массив не меняется', () => {
  const updated = toggleTask(tasks, 'one')
  assert.equal(updated[0].completed, true)
  assert.equal(tasks[0].completed, false)
  assert.deepEqual(toggleTask(updated, 'one'), tasks)
})

test('удаляется только выбранная задача', () => {
  assert.deepEqual(removeTask(tasks, 'one'), [tasks[1]])
  assert.deepEqual(removeTask(tasks, 'missing'), tasks)
})

test('все три фильтра и счётчики согласованы', () => {
  assert.deepEqual(filterTasks(tasks, 'all'), tasks)
  assert.deepEqual(filterTasks(tasks, 'active'), [tasks[0]])
  assert.deepEqual(filterTasks(tasks, 'completed'), [tasks[1]])
  assert.deepEqual(getTaskStats(tasks), { all: 2, active: 1, completed: 1 })
  assert.deepEqual(getTaskStats([]), { all: 0, active: 0, completed: 0 })
})

test('задачи и статусы восстанавливаются из хранилища', () => {
  const data = new Map<string, string>()
  const storage = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => { data.set(key, value) },
  }
  assert.equal(saveTasks(tasks, storage), null)
  assert.deepEqual(loadTasks(storage), { tasks, storageError: null })
  assert.equal(saveTasks([], storage), null)
  assert.deepEqual(loadTasks(storage).tasks, [])
  assert.ok(data.has(TASKS_STORAGE_KEY))
})

test('отсутствие сохранённых данных означает пустой список', () => {
  assert.deepEqual(loadTasks({ getItem: () => null }), { tasks: [], storageError: null })
})

test('повреждённые или некорректные данные не ломают приложение', () => {
  for (const raw of ['{broken', 'null', '{}', '[1]', JSON.stringify([{ ...tasks[0], completed: 'yes' }]), JSON.stringify([{ ...tasks[0], title: '  ' }]), JSON.stringify([tasks[0], tasks[0]])]) {
    const result = loadTasks({ getItem: () => raw })
    assert.deepEqual(result.tasks, [])
    assert.equal(typeof result.storageError, 'string')
  }
})

test('ошибки доступа и переполнения хранилища возвращаются для отображения в UI', () => {
  assert.ok(loadTasks({ getItem: () => { throw new Error('Denied') } }).storageError)
  assert.equal(typeof saveTasks(tasks, { setItem: () => { throw new Error('Quota exceeded') } }), 'string')
})

test('количество задач склоняется по-русски', () => {
  const forms: [string, string, string] = ['задача', 'задачи', 'задач']
  for (const value of [1, 21, 101]) assert.equal(pluralize(value, forms), 'задача')
  for (const value of [2, 4, 22]) assert.equal(pluralize(value, forms), 'задачи')
  for (const value of [0, 5, 11, 12, 14, 111]) assert.equal(pluralize(value, forms), 'задач')
})
