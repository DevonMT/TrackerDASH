<template>
  <v-container
    fill-height
    class="dashboard"
  >
    <v-layout
      column
      py-3
      wrap
    >

      <v-flex
        xs12
        md6
      >
        <div class="grey--text subheading text-xs-center">Profile Info</div>
      </v-flex>

      <v-flex
        xs12
        md6
      >
        <div class="grey--text subheading text-xs-center">Open Tasks</div>
      </v-flex>

      <v-flex
        xs12
        md6
      >
        <div class="grey--text subheading text-xs-center">
          Your Notes
        </div>
      </v-flex>

      <v-flex
        xs12
        md6
      >
        <div class="grey--text subheading text-xs-center">
          Ongoing Projects
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  middleware: 'auth'
}
</script>

<style>
</style>

