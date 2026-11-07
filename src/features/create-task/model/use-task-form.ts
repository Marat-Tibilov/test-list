import { useRef, useState, type FormEvent } from 'react'

export function useTaskForm(onAdd: (title: string) => boolean) {
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const canSubmit = title.trim().length > 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!canSubmit || !onAdd(title)) return
    setTitle('')
    inputRef.current?.focus()
  }

  return { title, setTitle, inputRef, canSubmit, handleSubmit }
}
