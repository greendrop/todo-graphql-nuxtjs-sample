import {
  VuexModule,
  Module,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import { ITaskForm } from '~/models/task-form'
import { ITask, initialTask } from '~/models/task'
import TaskRepository from '~/repositories/task-repository'

@Module({
  name: 'task-create-store',
  stateFactory: true, // eslint-disable-line no-undef
  namespaced: true, // eslint-disable-line no-undef
})
export default class TaskCreateStore extends VuexModule {
  item: ITask = initialTask()

  @Mutation
  setItem(item: ITask) {
    this.item = item
  }

  @MutationAction({ mutate: ['item'] })
  async create({ taskForm }: { taskForm: ITaskForm }) {
    const response = await TaskRepository.create({ taskForm })
    const responseTask = response.createTask?.task

    const task: ITask = {
      id: Number(responseTask?.id),
      title: responseTask?.title || '',
      description: responseTask?.description || '',
      done: responseTask?.done || false,
      createdAt: responseTask?.createdAt
        ? new Date(responseTask.createdAt)
        : null,
      updatedAt: responseTask?.updatedAt
        ? new Date(responseTask?.updatedAt)
        : null,
    }
    return { item: task }
  }
}
