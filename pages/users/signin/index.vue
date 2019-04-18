<template>
  <v-container
    fluid
    fill-height
    class="signin"
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm6
        md4
      >
        <v-card elevation-12>
          <v-toolbar
            flat
            dark
            color="secondary"
          >
            <v-toolbar-title class="headline">Sign In</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-4">
            <v-form
              @submit.prevent=""
              ref="form"
              lazy-validation
            >
              <v-text-field
                name="login"
                prepend-icon="alternate_email"
                type="email"
                label="Email"
                v-model="email"
                :rules="eRules"
                class="pb-3"
                @keyup.enter="signIn"
              ></v-text-field>
              <v-text-field
                name="password"
                prepend-icon="lock"
                type="password"
                label="Password"
                v-model="password"
                :rules="pRules"
                @keyup.enter="signIn"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              flat
              color="error"
              @click="reset"
            >Reset</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="secondary"
              nuxt
              to="/users/signup"
            >Sign Up</v-btn>
            <v-btn
              :loading="loading"
              color="primary darken-1"
              @click="signIn"
            >Sign In</v-btn>
          </v-card-actions>
          <v-alert
            transition="fade-transition"
            type="error"
            :value="feedback"
          >{{ feedback }}</v-alert>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data() {
    return {
      email: null,
      password: null,
      loading: false,
      feedback: null,
      eRules: [v => !!v || 'Please enter your email'],
      pRules: [v => !!v || 'Please enter your password']
    }
  },
  methods: {
    signIn() {
      if (this.email && this.password) {
        this.loading = true
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .catch(err => {
            this.feedback = err
            this.loading = false
          })
      } else {
        this.feedback = 'Please enter both an email and password'
      }
    },
    reset() {
      this.$refs.form.reset()
      this.feedback = null
    }
  }
}
</script>

<style>
.signin .flex {
  padding: 15px 0;
}
</style>