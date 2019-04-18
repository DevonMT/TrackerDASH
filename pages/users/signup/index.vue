<template>
  <v-container
    fluid
    fill-height
    class="signup"
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
            <v-toolbar-title class="headline">Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-4">
            <v-form
              @submit.prevent=""
              ref="form"
              lazy-validation
            >
              <v-layout
                row
                wrap
              >
                <v-flex
                  xs12
                  md6
                  class="pb-2"
                >
                  <v-text-field
                    prepend-icon="label"
                    label="First Name"
                    v-model="fName"
                    @keyup.enter="signUp"
                    :rules="[v => !!v || 'Please enter your first name']"
                  ></v-text-field>
                </v-flex>
                <v-flex
                  xs12
                  md6
                >
                  <v-text-field
                    prepend-icon="label"
                    label="Last Name"
                    v-model="lName"
                    @keyup.enter="signUp"
                    :rules="[v => !!v || 'Please enter your last name']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field
                name="username"
                prepend-icon="visibility"
                label="Username (optional)"
                v-model="username"
                class="pb-2"
                @keyup.enter="signUp"
              ></v-text-field>
              <v-text-field
                name="email"
                prepend-icon="alternate_email"
                type="email"
                label="Email"
                v-model="email"
                :rules="[v => !!v || 'Please enter an email']"
                class="pb-2"
                @keyup.enter="signUp"
              ></v-text-field>
              <v-text-field
                name="password"
                prepend-icon="lock"
                type="password"
                label="Password"
                v-model="password"
                :rules="[v => !!v || 'Please enter a password']"
                class="pb-2"
                @keyup.enter="signUp"
              ></v-text-field>
              <v-text-field
                name="rPassword"
                prepend-icon="lock"
                type="password"
                label="Repeat password"
                v-model="rPassword"
                :rules="[v => !!v || 'Please repeat the password']"
                @keyup.enter="signUp"
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
              router
              :to="{ name: 'Signin' }"
            >Sign In</v-btn>
            <v-btn
              :loading="loading"
              color="primary darken-1"
              @click="signUp"
            >Sign Up</v-btn>
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
import db from '@/utils/fb'

export default {
  name: 'Signup',
  data() {
    return {
      fName: null,
      lName: null,
      email: null,
      password: null,
      rPassword: null,
      username: null,
      feedback: null,
      loading: false
    }
  },
  methods: {
    signUp() {
      if (
        this.fName &&
        this.lName &&
        this.email &&
        this.password &&
        this.rPassword
      ) {
        if (this.password === this.rPassword) {
          this.loading = true
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(() => {
              let user = firebase.auth().currentUser
              db.collection('users')
                .doc(user.uid)
                .set({
                  fName: this.fName,
                  lName: this.lName,
                  email: this.email,
                  username: this.username || null
                })
                .then(() => {
                  this.loading = false
                  this.$router.push({ path: '/' })
                })
            })
            .catch(err => {
              this.loading = false
              this.feedback = err
            })
        } else {
          this.feedback = 'Passwords do not match'
        }
      } else {
        this.feedback = 'Please enter information into all fields'
      }
    },
    reset() {
      this.$refs.form.reset()
      this.feedback = null
    }
  }
}
</script>