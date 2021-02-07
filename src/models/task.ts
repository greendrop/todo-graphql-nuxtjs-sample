export interface ITask {
  id: number
  title: string
  description: string | null
  done: boolean
  createdAt: Date | null
  updatedAt: Date | null
}

export const initialTask: ITask = {
  id: 0,
  title: '',
  description: '',
  done: false,
  createdAt: null,
  updatedAt: null,
}
