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
  name: 'task-update-store',
  stateFactory: true, // eslint-disable-line no-undef
  namespaced: true, // eslint-disable-line no-undef
})
export default class TaskUpdateStore extends VuexModule {
  item: ITask = initialTask()

  @Mutation
  setItem(item: ITask) {
    this.item = item
  }

  @MutationAction({ mutate: ['item'] })
  async update({ id, taskForm }: { id: number; taskForm: ITaskForm }) {
    const response = await TaskRepository.update({ id, taskForm })
    const responseTask = response.updateTask?.task

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
