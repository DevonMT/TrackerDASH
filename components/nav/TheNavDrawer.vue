<template>
	<v-navigation-drawer
		:mini-variant="miniDrawer"
		app
		class="secondary"
		dark
		v-model="drawer"
		width="200"
	>
		<v-layout column fill-height>
			<v-list class="pt-0">
				<v-list-group v-model="navList">
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-content>
								<v-list-tile-title :class="{'primary--text': navList}">Navigation</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</template>
					<v-list-tile :key="index" :to="link.route" nuxt v-for="(link, index) in links">
						<v-list-tile-action>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-tile-action>

						<v-list-tile-content>
							<v-list-tile-title>{{ link.name }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list-group>
			</v-list>

			<v-container>
				<v-layout align-content-end class="text-xs-center" fill-height justify-space-around wrap>
					<v-flex :key="index" v-for="(contact, index) in contacts">
						<v-tooltip color="primary tertiary--text" top>
							<template v-slot:activator="{ on }">
								<v-btn class="px-0 mx-0" icon v-on="on">
									<v-icon>{{ contact.icon }}</v-icon>
								</v-btn>
							</template>
							<span class="text-capitalize">{{ contact.tip }}</span>
						</v-tooltip>
					</v-flex>
				</v-layout>
			</v-container>
		</v-layout>
	</v-navigation-drawer>
</template>

<script>
	export default {
		data() {
			return {
				links: this.$store.getters.get_links,
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
				navList: true
			}
		},
		computed: {
			miniDrawer() {
				return this.$store.getters.get_miniDrawer
			},
			drawer() {
				return this.$store.getters.get_drawer
			}
		},
		methods: {
			set_miniDrawer() {
				this.$store.commit('set_miniDrawer')
			}
		}
	}
</script>

<style>
</style>
