import localStorageSharedMethods from '~/sharedMethods/localStorage'
import routerSharedMethods from '~/sharedMethods/router'

const generateRouteNameWithLocale = (routeName, locale) => {
  return `${routeName}___${locale ?? 'th'}`
}

const getRouteNameWithLocale = (routeName) => {
  return generateRouteNameWithLocale(
    routeName,
    localStorageSharedMethods.getLanguage()
  )
}

export const state = () => ({
  currentPage: null,
  previousPage: null,
})

export const mutations = {

  setCurrentPage(context, currentPage) {
    context.currentPage = currentPage
  },

  setPreviousPage(context, previousPage) {
    context.previousPage = previousPage
  },

}

export const actions = {

  goTo(context, toGoObjectOrString) {
    if (toGoObjectOrString === null) {
      return
    }
    let toGoObject = toGoObjectOrString
    if (typeof toGoObjectOrString === 'string') {
      toGoObject = {
        name: toGoObjectOrString,
      }
    }
    this.app.router.push(
      {
        name: getRouteNameWithLocale(toGoObject.name),
        params: toGoObject.params
      }
    )
  },

  setCurrentPage(context, currentPage) {
    if (currentPage === null) {
      return
    }
    context.commit('setCurrentPage', currentPage)
  },

  setPreviousPage(context, previousPage) {
    context.commit('setPreviousPage', previousPage)
  },

}

export const getters = {

  currentPage(state) {
    return state.currentPage
      ?? routerSharedMethods.getPageInfoWithoutLanguage(
        $nuxt._router.history.current
      )
  },

}
