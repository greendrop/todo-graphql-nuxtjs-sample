import {
  VuexModule,
  Module,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import { ITask, initialTask } from '~/models/task'
import TaskRepository from '~/repositories/task-repository'

@Module({
  name: 'task-detail-store',
  stateFactory: true, // eslint-disable-line no-undef
  namespaced: true, // eslint-disable-line no-undef
})
export default class TaskDetailStore extends VuexModule {
  item: ITask = initialTask()

  @Mutation
  setItem(item: ITask) {
    this.item = item
  }

  @MutationAction({ mutate: ['item'] })
  async fetch({ id }: { id: number }) {
    const response = await TaskRepository.fetch({ id: id.toString() })
    const task: ITask = {
      id: Number(response.task.id),
      title: response.task.title || '',
      description: response.task.description || '',
      done: response.task.done || false,
      createdAt: response.task.createdAt
        ? new Date(response.task.createdAt)
        : null,
      updatedAt: response.task.updatedAt
        ? new Date(response.task.updatedAt)
        : null,
    }
    return { item: task }
  }
}
