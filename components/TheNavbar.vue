<template>
  <nav class="nav">
    <v-navigation-drawer
      dark
      app
      v-if="auth"
      v-model="drawer"
      :mini-variant="miniVariant"
      class="secondary darken-3"
    >
      <v-layout
        column
        fill-height
      >
        <v-list>
          <v-list-tile
            v-for="(link, index) in links"
            :key="index"
            router
            :to="link.route"
          >
            <v-list-tile-action>
              <v-icon left>{{ link.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ link.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-spacer />
        <v-list v-if="miniVariant">
          <v-list-tile
            v-for="(contact, index) in contacts"
            :key="index"
          >
            <v-list-tile-action>
              <v-tooltip
                right
                color="primary darken-1"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    flat
                    class="px-0 mx-0"
                    v-on="on"
                  >
                    <v-icon>{{ contact.icon }}</v-icon>
                  </v-btn>
                </template>
                <span class="text-capitalize">{{ contact.tip }}</span>
              </v-tooltip>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-layout
          wrap
          class="text-xs-center"
          align-end
          v-else
        >
          <v-flex
            xs4
            v-for="(contact, index) in contacts"
            :key="index"
          >
            <v-tooltip
              top
              color="primary darken-1"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  flat
                  class="px-0 mx-0"
                  v-on="on"
                >
                  <v-icon>{{ contact.icon }}</v-icon>
                </v-btn>
              </template>
              <span class="text-capitalize">{{ contact.tip }}</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-navigation-drawer>

    <v-toolbar
      app
      dense
      flat
      dark
      clipped-left
      color="secondary"
    >

      <v-toolbar-side-icon
        :disabled="!auth"
        flat
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-btn
        icon
        flat
        @click="miniVariant = !miniVariant"
      >
        <v-icon>{{ `chevron_${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-items>
        <v-btn
          flat
          nuxt
          to="/"
        >
          <v-toolbar-title class="text-uppercase primary--text text--lighten-2">
            <span class="font-weight-light">tracker</span><span class="font-weight-bold">dash</span>
          </v-toolbar-title>
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items v-if="!auth">
        <v-btn
          flat
          nuxt
          to="/users/signin"
        >Sign In</v-btn>
        <v-btn
          flat
          nuxt
          to="/users/signup"
        >Sign Up</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <v-btn
          flat
          @click="signOut"
        >Sign Out</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
import firebase from 'firebase'
import db from '@/utils/fb'

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          route: '/',
          name: 'Dashboard',
          icon: 'dashboard'
        },
        {
          route: '/todo',
          name: 'Todo',
          icon: 'assignment'
        },
        {
          route: '/chat',
          name: 'Chat',
          icon: 'chat'
        },
        {
          route: '/projects',
          name: 'Projects',
          icon: 'work'
        },
        {
          route: '/notes',
          name: 'Notes',
          icon: 'notes'
        }
      ],
      contacts: [
        {
          tip: 'email me',
          icon: 'alternate_email'
        },
        {
          tip: 'my portfolio',
          icon: 'code'
        },
        {
          tip: 'social media links',
          icon: 'people'
        }
      ],
      drawer: false,
      miniVariant: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              let data = doc.data()
              data.id = doc.id
              this.$store.commit('SET_USER', { user: data })
            }
            this.loading = false
            this.$router.push({ path: '/' })
          })
      } else {
        this.$store.commit('SET_USER')
      }
    })
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser
    },
    auth() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit('SET_USER')
          this.$router.push({ path: '/users/signin' })
        })
    }
  }
}
</script>

<style>
</style>