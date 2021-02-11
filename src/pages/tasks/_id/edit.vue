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
          {{ $t('labels.showModel', { model: $t('models.task') }) }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <task-edit :task="task" :is-fetching="isFetching" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TaskEdit from '~/components/organisms/TaskEdit.vue'
import { ITask, initialTask } from '~/models/task'
import { taskDetailStore } from '~/store'

@Component({
  components: { TaskEdit }, // eslint-disable-line no-undef
})
export default class Page extends Vue {
  id = this.$route.params.id
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
      disabled: false,
    },
    {
      text: this.$i18n.t('labels.showModel', {
        model: this.$i18n.t('models.task'),
      }),
      to: `/tasks/${this.id}`,
      exact: true,
      disabled: false,
    },
    {
      text: this.$i18n.t('labels.editModel', {
        model: this.$i18n.t('models.task'),
      }),
      to: `/tasks/${this.id}/edit`,
      exact: true,
      disabled: true,
    },
  ]

  task: ITask = initialTask()
  isFetching = false

  mounted() {
    this.getTask()
  }

  async getTask() {
    this.isFetching = true
    try {
      await taskDetailStore.fetch({ id: Number(this.id) })
    } catch (error) {
      console.error(error) // eslint-disable-line no-console
    }
    this.task = taskDetailStore.item
    this.isFetching = false
  }
}
</script>
