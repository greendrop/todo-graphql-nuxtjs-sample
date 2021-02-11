<template>
  <div>
    <v-row v-if="isFetching && isUpdating">
      <v-col class="text-center">
        <progress-icon />
      </v-col>
    </v-row>
    <v-row v-if="!(isFetching && isUpdating)">
      <v-col>
        <validation-observer ref="observer" v-slot="{ handleSubmit, invalid }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-card>
              <v-card-text>
                <task-from-fields
                  :title.sync="taskForm.title"
                  :description.sync="taskForm.description"
                  :done.sync="taskForm.done"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn type="submit" :disabled="invalid">
                  <v-icon class="mr-1" small> fas fa-pencil-alt </v-icon>
                  {{ $t('labels.update') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator'
import { ITaskForm, initialTaskForm } from '~/models/task-form'
import TaskFromFields from '~/components/molecules/TaskFormFields.vue'
import { taskUpdateStore } from '~/store'
import { ITask } from '~/models/task'

@Component({
  components: { TaskFromFields }, // eslint-disable-line no-undef
})
export default class TaskEdit extends Vue {
  @Prop({ type: Object, required: true })
  task!: ITask

  @Prop({ type: Boolean, required: true })
  isFetching!: boolean

  taskForm: ITaskForm = initialTaskForm()
  isUpdating: boolean = false

  mounted() {
    this.taskForm = {
      title: this.task.title,
      description: this.task.description || '',
      done: this.task.done,
    }
  }

  @Watch('task')
  onTaskChanged(val: ITask, _oldVal: ITask) {
    this.taskForm = {
      title: val.title,
      description: val.description || '',
      done: val.done,
    }
  }

  async submit() {
    this.isUpdating = true
    try {
      await taskUpdateStore.update({
        id: this.task.id,
        taskForm: this.taskForm,
      })
      const message = this.$t('messages.updateModel', {
        model: this.$t('models.task'),
      }).toString()
      this.$toast.success(message)
      const task = taskUpdateStore.item
      this.$router.push(`/tasks/${task.id}`)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
    this.isUpdating = false
  }
}
</script>
