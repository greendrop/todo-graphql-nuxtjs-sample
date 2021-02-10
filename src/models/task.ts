export interface ITask {
  id: number
  title: string
  description: string | null
  done: boolean
  createdAt: Date | null
  updatedAt: Date | null
}

export function initialTask(): ITask {
  return {
    id: 0,
    title: '',
    description: '',
    done: false,
    createdAt: null,
    updatedAt: null,
  }
}
