export const state = () => {
  return {
    user: null,
    miniDrawer: false,
    drawer: false,
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
        route: '/projects',
        name: 'Projects',
        icon: 'work'
      },
      {
        route: '/notes',
        name: 'Notes',
        icon: 'notes'
      },
      {
        route: '/chat',
        name: 'Chat',
        icon: 'chat'
      }
    ]
  }
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user || null
  },
  set_miniDrawer(state) {
    state.miniDrawer = !state.miniDrawer
  },
  set_drawer(state) {
    state.drawer = !state.drawer
  }
}

export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
  loggedUser(state) {
    return state.user
  },
  get_drawer(state) {
    return state.drawer
  },
  get_miniDrawer(state) {
    return state.miniDrawer
  },
  get_links(state) {
    return state.links
  }
}
