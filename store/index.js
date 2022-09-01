export const state = () => ({
  sideMenuShown: false
})

export const mutations = {
  toggleSideMenu: state => { state.sideMenuShown = !state.sideMenuShown }
}

export const actions = {
  toggleSideMenu: ({ commit }) => { commit('toggleSideMenu') }
}
