<template>
  <div>
    <v-row>
      <v-col>
        <v-breadcrumbs :items="breadcrumbItems" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div class="headline">
          {{ $t('labels.listModel', { model: $t('models.task') }) }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn class="float-right" to="/tasks/new">
          <v-icon class="mr-1" small> fas fa-plus </v-icon>
          {{ $t('labels.new') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <task-list
          :tasks="tasks"
          :page-info="pageInfo"
          :total-count="totalCount"
          :is-fetching="isFetching"
          @getNextTasks="getNextTasks"
          @getPreviousTasks="getPreviousTasks"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TaskList from '~/components/organisms/TaskList.vue'
import { IPageInfo, initialPageInfo } from '~/models/page-info'
import { ITask } from '~/models/task'
import { taskListStore } from '~/store'

@Component({
  components: { TaskList }, // eslint-disable-line no-undef
  middleware: ['auth'], // eslint-disable-line no-undef
})
export default class Page extends Vue {
  taskListStore = taskListStore
  breadcrumbItems = [
    {
      text: this.$i18n.t('labels.home'),
      to: '/',
      exact: true,
      disabled: false,
    },
    {
      text: this.$i18n.t('labels.listModel', {
        model: this.$i18n.t('models.task'),
      }),
      to: '/tasks',
      exact: true,
      disabled: true,
    },
  ]

  tasks: ITask[] = []
  pageInfo: IPageInfo = initialPageInfo()
  totalCount = 0
  isFetching = false

  mounted() {
    this.getTasks({})
  }

  async getTasks({
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
    this.isFetching = true
    this.tasks = []
    try {
      await this.taskListStore.fetch({ after, before, first, last })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
    this.tasks = taskListStore.items
    this.totalCount = taskListStore.totalCount
    this.pageInfo = taskListStore.pageInfo
    this.isFetching = false
  }

  async getNextTasks() {
    const after = taskListStore.pageInfo.endCursor
    await this.getTasks({ after })
  }

  async getPreviousTasks() {
    const before = taskListStore.pageInfo.startCursor
    await this.getTasks({ before })
  }
}
</script>
