<template>
  <div>
    <v-container>
      <v-layout
        justify-center
        fill-height
      >
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'

export default {
  data() {
    return {}
  },
  props: ['error']
}
</script>

<style>
</style>