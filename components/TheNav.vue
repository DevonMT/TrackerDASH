<template>
	<nav class='TheNav'>
		<TheNavDrawer/>
		<TheNavbar/>
	</nav>
</template>

<script>
	import TheNavbar from '@/components/nav/TheNavbar'
	import TheNavDrawer from '@/components/nav/TheNavDrawer'

	export default {
		components: {
			TheNavbar,
			TheNavDrawer
		}
	}
</script>

<style>
</style>
