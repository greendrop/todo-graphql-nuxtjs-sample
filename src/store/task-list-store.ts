import {
  VuexModule,
  Module,
  Mutation,
  MutationAction,
} from 'vuex-module-decorators'
import { ITask } from '~/models/task'
import { IPageInfo, initialPageInfo } from '~/models/page-info'
import TaskRepository from '~/repositories/task-repository'

@Module({
  name: 'task-list-store',
  stateFactory: true, // eslint-disable-line no-undef
  namespaced: true, // eslint-disable-line no-undef
})
export default class TaskListStore extends VuexModule {
  items: ITask[] = []
  totalCount: number = 0
  pageInfo: IPageInfo = initialPageInfo

  @Mutation
  setItems(items: ITask[]) {
    this.items = items
  }

  @Mutation
  setTotalCount(totalCount: number) {
    this.totalCount = totalCount
  }

  @Mutation
  setPageInfo(pageInfo: IPageInfo) {
    this.pageInfo = pageInfo
  }

  @MutationAction({ mutate: ['items', 'totalCount', 'pageInfo'] })
  async fetch({
    after,
    before,
    first,
    last,
  }: {
    after?: string | null
    before?: string | null
    first?: number | null
    last?: number | null
  }) {
    const response = await TaskRepository.fetchList({
      after,
      before,
      first,
      last,
    })
    const items: ITask[] = []
    response.tasks.edges?.forEach((data) => {
      const task: ITask = {
        id: Number(data?.node?.id),
        title: data?.node?.title || '',
        description: data?.node?.description || '',
        done: data?.node?.done || false,
        createdAt: data?.node?.createdAt
          ? new Date(data?.node?.createdAt)
          : null,
        updatedAt: data?.node?.updatedAt
          ? new Date(data?.node?.updatedAt)
          : null,
      }
      items.push(task)
    })
    const pageInfo = {
      startCursor: response.tasks.pageInfo.startCursor,
      endCursor: response.tasks.pageInfo.endCursor,
      hasNextPage: response.tasks.pageInfo.hasNextPage,
      hasPreviousPage: response.tasks.pageInfo.hasPreviousPage,
    }
    const totalCount = response.tasks.totalCount
    return {
      items,
      totalCount,
      pageInfo,
    }
  }
}
