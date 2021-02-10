import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TaskListStore from '~/store/task-list-store'
import TaskDetailStore from '~/store/task-detail-store'
import TaskCreateStore from '~/store/task-create-store'

/* eslint-disable import/no-mutable-exports */
let taskListStore: TaskListStore
let taskDetailStore: TaskDetailStore
let taskCreateStore: TaskCreateStore
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  taskListStore = getModule(TaskListStore, store)
  taskDetailStore = getModule(TaskDetailStore, store)
  taskCreateStore = getModule(TaskCreateStore, store)
}

export { initialiseStores, taskListStore, taskDetailStore, taskCreateStore }
