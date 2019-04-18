<template>
	<v-container class='dashboard' fill-height>
		<v-layout justify-center mt-5 wrap>
			<v-flex md6 pt-4 xs12>
				<div class='grey--text subheading text-xs-center'>Profile Info</div>
			</v-flex>

			<v-flex md6 pt-4 xs12>
				<div class='grey--text subheading text-xs-center'>Open Tasks</div>
			</v-flex>

			<v-flex md6 pt-4 xs12>
				<div class='grey--text subheading text-xs-center'>Your Notes</div>
			</v-flex>

			<v-flex md6 pt-4 xs12>
				<div class='grey--text subheading text-xs-center'>Ongoing Projects</div>
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

