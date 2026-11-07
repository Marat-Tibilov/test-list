import { useState } from 'react'
import { createTask, removeTask, toggleTask } from './task'
import { loadTasks, saveTasks } from './storage'
import type { Task } from './types'

export function useTasks() {
  const [snapshot, setSnapshot] = useState(loadTasks)

  function commit(tasks: Task[]) {
    setSnapshot({ tasks, storageError: saveTasks(tasks) })
  }

  function addTask(title: string) {
    const task = createTask(title)
    if (!task) return false
    commit([task, ...snapshot.tasks])
    return true
  }

  return {
    ...snapshot,
    addTask,
    toggleTask: (id: string) => commit(toggleTask(snapshot.tasks, id)),
    removeTask: (id: string) => commit(removeTask(snapshot.tasks, id)),
  }
}
