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
    context.commit('setCurrentPage', currentPage)
  },

  setPreviousPage(context, previousPage) {
    context.commit('setPreviousPage', previousPage)
  },

}

export const getters = {

  currentPage(state) {
    return state.currentPage
      ?? {
        name: $nuxt._router.history.current.name.substring(0, $nuxt._router.history.current.name.length - 5),
        params: $nuxt._router.history.current.params
      }
  },

}
