<template>
  <v-list>
    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
      <v-list-item-action>
        <v-icon small>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
    <client-only>
      <v-list-item v-if="!signedIn" @click="signIn()">
        <v-list-item-action>
          <v-icon small> fas fa-sign-in-alt </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t('labels.signIn')" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-if="signedIn" @click="signOut()">
        <v-list-item-action>
          <v-icon small> fas fa-sign-out-alt </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t('labels.signOut')" />
        </v-list-item-content>
      </v-list-item>
    </client-only>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      items: [
        {
          icon: 'fas fa-home',
          title: this.$i18n.t('labels.home').toString(),
          to: '/',
        },
      ],
    }
  },
  computed: {
    signedIn() {
      return this.$auth.loggedIn
    },
    signedUser() {
      return this.$auth.user
    },
  },
  methods: {
    async signIn() {
      await this.$auth.loginWith('oauth2')
    },
    async signOut() {
      await this.$auth.logout().then(() => {
        this.$toast.success(this.$i18n.t('messages.signedOut').toString())
      })
    },
  },
})
</script>
