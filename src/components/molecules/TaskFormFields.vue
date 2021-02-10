<template>
  <div>
    <v-row>
      <v-col>
        <validation-provider
          v-slot="{ errors }"
          name="title"
          rules="required|max:255"
        >
          <v-text-field
            :value="title"
            :counter="255"
            :label="$t('models.attributes.task.title')"
            :error-messages="errors"
            required
            @input="$emit('update:title', $event)"
          />
        </validation-provider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <validation-provider v-slot="{ errors }" name="description" rules="">
          <v-textarea
            :value="description"
            :label="$t('models.attributes.task.description')"
            :error-messages="errors"
            @input="$emit('update:description', $event)"
          />
        </validation-provider>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-switch
          :value="done"
          :label="$t('models.attributes.task.done')"
          @change="$emit('update:done', $event || false)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class TaskFormFields extends Vue {
  @Prop({ type: String, required: true })
  title!: string

  @Prop({ type: String, required: true })
  description!: string

  @Prop({ type: Boolean, required: true })
  done!: boolean
}
</script>
