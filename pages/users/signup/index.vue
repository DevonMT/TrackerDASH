<template>
	<v-container class="signup" fill-height fluid>
		<v-layout align-center justify-center>
			<v-flex md4 sm6 xs12>
				<v-card elevation-12>
					<v-toolbar color="secondary" dark flat>
						<v-toolbar-title class="headline">Sign Up</v-toolbar-title>
					</v-toolbar>
					<v-card-text class="py-4">
						<v-form @submit.prevent lazy-validation ref="form">
							<v-layout row wrap>
								<v-flex class="pb-2" md6 xs12>
									<v-text-field
										:rules="[v => !!v || 'Please enter your first name']"
										@keyup.enter="signUp"
										label="First Name"
										prepend-icon="label"
										v-model="fName"
									></v-text-field>
								</v-flex>
								<v-flex md6 xs12>
									<v-text-field
										:rules="[v => !!v || 'Please enter your last name']"
										@keyup.enter="signUp"
										label="Last Name"
										prepend-icon="label"
										v-model="lName"
									></v-text-field>
								</v-flex>
							</v-layout>
							<v-text-field
								@keyup.enter="signUp"
								class="pb-2"
								label="Username (optional)"
								name="username"
								prepend-icon="visibility"
								v-model="username"
							></v-text-field>
							<v-text-field
								:rules="[v => !!v || 'Please enter an email']"
								@keyup.enter="signUp"
								class="pb-2"
								label="Email"
								name="email"
								prepend-icon="alternate_email"
								type="email"
								v-model="email"
							></v-text-field>
							<v-text-field
								:rules="[v => !!v || 'Please enter a password']"
								@keyup.enter="signUp"
								class="pb-2"
								label="Password"
								name="password"
								prepend-icon="lock"
								type="password"
								v-model="password"
							></v-text-field>
							<v-text-field
								:rules="[v => !!v || 'Please repeat the password']"
								@keyup.enter="signUp"
								label="Repeat password"
								name="rPassword"
								prepend-icon="lock"
								type="password"
								v-model="rPassword"
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn @click="reset" color="error" flat>Reset</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="secondary" flat router to="/users/signin">Sign In</v-btn>
						<v-btn :loading="loading" @click="signUp" color="primary tertiary--text" light>Sign Up</v-btn>
					</v-card-actions>
					<v-alert :value="feedback" transition="fade-transition" type="error">{{ feedback }}</v-alert>
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
