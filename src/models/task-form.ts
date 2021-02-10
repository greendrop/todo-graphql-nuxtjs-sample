export interface ITaskForm {
  title: string
  description: string
  done: boolean
}

export function initialTaskForm(): ITaskForm {
  return {
    title: '',
    description: '',
    done: false,
  }
}
