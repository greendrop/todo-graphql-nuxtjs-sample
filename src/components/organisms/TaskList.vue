<template>
  <div>
    <v-row v-if="isFetching">
      <v-col class="text-center">
        <progress-icon />
      </v-col>
    </v-row>
    <v-row v-if="!isFetching">
      <v-col>
        <v-simple-table>
          <template #default>
            <thead>
              <tr>
                <th>
                  {{ $t('models.attributes.task.id') }}
                </th>
                <th>
                  {{ $t('models.attributes.task.title') }}
                </th>
                <th>
                  {{ $t('models.attributes.task.description') }}
                </th>
                <th>
                  {{ $t('models.attributes.task.done') }}
                </th>
                <th>
                  {{ $t('models.attributes.task.createdAt') }}
                </th>
                <th>
                  {{ $t('models.attributes.task.updatedAt') }}
                </th>
                <th />
              </tr>
            </thead>
            <tbody v-if="tasks">
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.id }}</td>
                <td>{{ truncate(task.title) }}</td>
                <td>{{ truncate(task.description) }}</td>
                <td>{{ task.done }}</td>
                <td>{{ datetimeFormat(task.createdAt) }}</td>
                <td>{{ datetimeFormat(task.updatedAt) }}</td>
                <td>
                  <v-icon class="mr-1" small @click="showTask(task)">
                    fas fa-chevron-down
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row v-if="!isFetching">
      <v-col>
        <v-btn
          :disabled="!pageInfo.hasPreviousPage"
          @click="getPreviousTasks()"
        >
          Previous
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          class="float-right"
          :disabled="!pageInfo.hasNextPage"
          @click="getNextTasks()"
        >
          Next
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IPageInfo } from '~/models/page-info'
import { ITask } from '~/models/task'
import ProgressIcon from '~/components/atoms/ProgressIcon.vue'
import { datetimeFormat, truncate } from '~/lib/filter'

export default Vue.extend({
  components: {
    ProgressIcon,
  },
  props: {
    tasks: {
      type: Array as PropType<ITask[]>,
      required: true,
    },
    totalCount: {
      type: Number,
      required: true,
    },
    pageInfo: {
      type: Object as PropType<IPageInfo>,
      required: true,
    },
    isFetching: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getPreviousTasks() {
      this.$emit('getPreviousTasks')
    },
    getNextTasks() {
      this.$emit('getNextTasks')
    },
    showTask(task: ITask) {
      this.$router.push(`/tasks/${task.id}`)
    },
    datetimeFormat(value: any, format: string) {
      return datetimeFormat(value, format)
    },
    truncate(value: any, length: any, omission: string) {
      return truncate(value, length, omission)
    },
  },
})
</script>
