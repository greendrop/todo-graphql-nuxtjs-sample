<template>
  <div />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    if (this.$auth.loggedIn) {
      this.$auth.redirect('home')
    } else {
      this.$auth.loginWith('oauth2')
    }
  },
})
</script>
