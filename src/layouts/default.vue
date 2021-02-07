<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <navigation-list />
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import NavigationList from '~/components/organisms/NavigationList.vue'

export default Vue.extend({
  components: {
    NavigationList,
  },
  data() {
    return {
      clipped: true,
      drawer: null as boolean | null,
      fixed: false,
      miniVariant: false,
      title: 'Todo Sample',
    }
  },
})
</script>
