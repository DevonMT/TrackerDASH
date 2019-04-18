<template>
	<div>
		<v-container>
			<v-layout fill-height justify-center>
				<h1 v-if='error.statusCode === 404'>Page not found</h1>
				<h1 v-else>An error occurred</h1>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: ['error']
	}
</script>

<style>
</style>
