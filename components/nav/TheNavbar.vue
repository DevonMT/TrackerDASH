<template>
	<v-toolbar app color='secondary' dark dense flat>
		<v-toolbar-items>
			<v-toolbar-side-icon @click='set_drawer'></v-toolbar-side-icon>
			<v-btn @click='set_miniDrawer' icon v-if='drawer'>
				<v-icon>{{ `chevron_${miniDrawer ? 'right' : 'left'}` }}</v-icon>
			</v-btn>
		</v-toolbar-items>
		<!-- The d-inline-flex removes the space between the two span tags below -->
		<v-toolbar-title class='text-uppercase primary--text headline d-inline-flex'>
			<span class='font-weight-light'>tracker</span>
			<span class='font-weight-bold'>dash</span>
		</v-toolbar-title>
		<v-spacer/>
		<v-toolbar-items v-if='!auth'>
			<v-btn flat nuxt to='/users/signin'>Sign In</v-btn>
			<v-btn flat nuxt to='/users/signup'>Sign Up</v-btn>
		</v-toolbar-items>
		<v-toolbar-items v-else>
			<v-btn @click='signOut' flat>Sign Out</v-btn>
		</v-toolbar-items>
	</v-toolbar>
</template>

<script>
	import firebase from 'firebase'
	import db from '@/utils/fb'

	export default {
		name: 'Navbar',
		data() {
			return {}
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
			},
			miniDrawer() {
				return this.$store.getters.get_miniDrawer
			},
			drawer() {
				return this.$store.getters.get_drawer
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
			},
			set_miniDrawer() {
				this.$store.commit('set_miniDrawer')
			},
			set_drawer() {
				this.$store.commit('set_drawer')
			}
		}
	}
</script>

<style>
</style>
