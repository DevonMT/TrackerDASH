<template>
	<v-container class='signin' fill-height fluid>
		<v-layout align-center justify-center>
			<v-flex md4 sm6 xs12>
				<v-card elevation-12>
					<v-toolbar color='secondary' dark flat>
						<v-toolbar-title class='headline'>Sign In</v-toolbar-title>
					</v-toolbar>
					<v-card-text class='py-4'>
						<v-form @submit.prevent lazy-validation ref='form'>
							<v-text-field
								:rules='eRules'
								@keyup.enter='signIn'
								class='pb-3'
								label='Email'
								name='login'
								prepend-icon='alternate_email'
								type='email'
								v-model='email'
							></v-text-field>
							<v-text-field
								:rules='pRules'
								@keyup.enter='signIn'
								label='Password'
								name='password'
								prepend-icon='lock'
								type='password'
								v-model='password'
							></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions>
						<v-btn @click='reset' color='error' flat>Reset</v-btn>
						<v-spacer></v-spacer>
						<v-btn color='secondary' flat nuxt to='/users/signup'>Sign Up</v-btn>
						<v-btn :loading='loading' @click='signIn' color='primary darken-1'>Sign In</v-btn>
					</v-card-actions>
					<v-alert :value='feedback' transition='fade-transition' type='error'>{{ feedback }}</v-alert>
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
