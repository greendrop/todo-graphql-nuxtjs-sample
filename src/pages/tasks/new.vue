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
          {{ $t('labels.newModel', { model: $t('models.task') }) }}
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <task-new />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TaskNew from '~/components/organisms/TaskNew.vue'

@Component({
  components: { TaskNew }, // eslint-disable-line no-undef
})
export default class Page extends Vue {
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
      text: this.$i18n.t('labels.newModel', {
        model: this.$i18n.t('models.task'),
      }),
      to: '/tasks/new',
      exact: true,
      disabled: true,
    },
  ]
}
</script>
