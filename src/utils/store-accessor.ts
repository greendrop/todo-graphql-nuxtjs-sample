import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TaskListStore from '~/store/task-list-store'
import TaskDetailStore from '~/store/task-detail-store'

/* eslint-disable import/no-mutable-exports */
let taskListStore: TaskListStore
let taskDetailStore: TaskDetailStore
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  taskListStore = getModule(TaskListStore, store)
  taskDetailStore = getModule(TaskDetailStore, store)
}

export { initialiseStores, taskListStore, taskDetailStore }
