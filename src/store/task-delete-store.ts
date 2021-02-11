import {
  VuexModule,
  Module,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import { ITask, initialTask } from '~/models/task'
import TaskRepository from '~/repositories/task-repository'

@Module({
  name: 'task-delete-store',
  stateFactory: true, // eslint-disable-line no-undef
  namespaced: true, // eslint-disable-line no-undef
})
export default class TaskDeleteStore extends VuexModule {
  item: ITask = initialTask()

  @Mutation
  setItem(item: ITask) {
    this.item = item
  }

  @MutationAction({ mutate: ['item'] })
  async delete({ id }: { id: number }) {
    const response = await TaskRepository.delete({ id })
    const responseTask = response.deleteTask?.task

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
