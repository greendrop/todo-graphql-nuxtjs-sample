<template>
  <div>
    <v-row v-if="isFetching">
      <v-col class="text-center">
        <progress-icon />
      </v-col>
    </v-row>
    <v-row v-if="!isFetching">
      <v-col>
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.id') }}
              </v-col>
              <v-col cols="8">
                {{ task.id }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.title') }}
              </v-col>
              <v-col cols="8">
                {{ task.title }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.description') }}
              </v-col>
              <v-col cols="8">
                {{ task.description }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.done') }}
              </v-col>
              <v-col cols="8">
                {{ task.done }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.createdAt') }}
              </v-col>
              <v-col cols="8">
                {{ datetimeFormat(task.createdAt) }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                {{ $t('models.attributes.task.updatedAt') }}
              </v-col>
              <v-col cols="8">
                {{ datetimeFormat(task.updatedAt) }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="editTask()">
              <v-icon class="mr-1" small> fas fa-pencil-alt </v-icon>
              {{ $t('labels.edit') }}
            </v-btn>
            <v-btn color="error" @click="deleteTask()">
              <v-icon class="mr-1" small> fas fa-trash-alt </v-icon>
              {{ $t('labels.destroy') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { ITask } from '~/models/task'
import { datetimeFormat } from '~/lib/filter'
import { taskDeleteStore } from '~/store'

@Component
export default class TaskDetail extends Vue {
  @Prop({ type: Object, required: true })
  task!: ITask

  @Prop({ type: Boolean, required: true })
  isFetching!: boolean

  editTask() {
    this.$router.push(`/tasks/${this.task.id}/edit`)
  }

  datetimeFormat(value: any, format: string) {
    return datetimeFormat(value, format)
  }

  async deleteTask() {
    if (confirm(this.$t('messages.destroyConfirm').toString())) {
      try {
        await taskDeleteStore.delete({ id: this.task.id })
        const message = this.$t('messages.destroyModel', {
          model: this.$t('models.task'),
        }).toString()
        this.$toast.success(message)
        this.$router.push('/tasks')
      } catch (error) {
        console.log(error) // eslint-disable-line no-console
      }
    }
  }
}
</script>
