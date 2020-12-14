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

export const actions = {

  goTo(context, pageName) {
    this.app.router.push(
      {name: getRouteNameWithLocale(pageName)}
    )
  },

}
