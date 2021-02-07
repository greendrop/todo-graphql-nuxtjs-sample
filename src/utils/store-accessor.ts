import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TaskListStore from '~/store/task-list-store'

/* eslint-disable import/no-mutable-exports */
let taskListStore: TaskListStore
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  taskListStore = getModule(TaskListStore, store)
}

export { initialiseStores, taskListStore }
