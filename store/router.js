import LocalStorageSharedMethods from '~/shared_methods/local_storage'

const generateRouteNameWithLocale = (routeName, locale) => {
  return `${routeName}___${locale ?? 'th'}`
}

const getRouteNameWithLocale = (routeName) => {
  return generateRouteNameWithLocale(
    routeName,
    LocalStorageSharedMethods.getLanguage()
  )
}

export const state = () => ({
  currentPageName: null
})

export const mutations = {

  setCurrentPageName(context, currentPageName) {
    context.currentPageName = currentPageName
  }

}

export const actions = {

  goTo(context, pageName) {
    context.commit('setCurrentPageName', pageName)
    this.app.router.push(
      {name: getRouteNameWithLocale(pageName)}
    )
  },

}

export const getters = {

  currentPageName(state) {
    return state.currentPageName
      ?? $nuxt._router.history.current.name.substring(0, $nuxt._router.history.current.name.length - 5)
  },

}
