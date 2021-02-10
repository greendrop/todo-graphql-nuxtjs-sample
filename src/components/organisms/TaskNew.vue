<template>
  <div>
    <v-row v-if="isCreating">
      <v-col class="text-center">
        <progress-icon />
      </v-col>
    </v-row>
    <v-row v-if="!isCreating">
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
                  <v-icon class="mr-1" small> fas fa-plus </v-icon>
                  {{ $t('labels.create') }}
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
import { Component, Vue } from 'nuxt-property-decorator'
import { ITaskForm, initialTaskForm } from '~/models/task-form'
import TaskFromFields from '~/components/molecules/TaskFormFields.vue'
import { taskCreateStore } from '~/store'

@Component({
  components: { TaskFromFields }, // eslint-disable-line no-undef
})
export default class TaskNew extends Vue {
  taskForm: ITaskForm = initialTaskForm()
  isCreating: boolean = false

  async submit() {
    this.isCreating = true
    try {
      await taskCreateStore.create({ taskForm: this.taskForm })
      const message = this.$t('messages.createModel', {
        model: this.$t('models.task'),
      }).toString()
      this.$toast.success(message)
      const task = taskCreateStore.item
      this.$router.push(`/tasks/${task.id}`)
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
    this.isCreating = false
  }
}
</script>
