import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import TaskListStore from '~/store/task-list-store'
import TaskDetailStore from '~/store/task-detail-store'
import TaskCreateStore from '~/store/task-create-store'
import TaskUpdateStore from '~/store/task-update-store'
import TaskDeleteStore from '~/store/task-delete-store'

/* eslint-disable import/no-mutable-exports */
let taskListStore: TaskListStore
let taskDetailStore: TaskDetailStore
let taskCreateStore: TaskCreateStore
let taskUpdateStore: TaskUpdateStore
let taskDeleteStore: TaskDeleteStore
/* eslint-enable import/no-mutable-exports */

function initialiseStores(store: Store<any>): void {
  taskListStore = getModule(TaskListStore, store)
  taskDetailStore = getModule(TaskDetailStore, store)
  taskCreateStore = getModule(TaskCreateStore, store)
  taskUpdateStore = getModule(TaskUpdateStore, store)
  taskDeleteStore = getModule(TaskDeleteStore, store)
}

export {
  initialiseStores,
  taskListStore,
  taskDetailStore,
  taskCreateStore,
  taskUpdateStore,
  taskDeleteStore,
}
