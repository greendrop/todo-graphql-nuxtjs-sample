export interface ITask {
  id: number
  title: string
  description: string | null
  done: boolean
  createdAt: Date | null
  updatedAt: Date | null
}
