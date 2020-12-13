import LocalStorageSharedMethods from '~/shared_methods/local_storage'
// import {createRouter} from '~/.nuxt/router'
// import Vue from '~/.nuxt/App'

const generateRouteNameWithLocale = (routeName, locale) => {
  return `${routeName}___${locale ?? 'th'}`
}

export default {
  // goTo: (routeName) => {
  //   // console.log(Vue)
  //   const Router = createRouter()
  //   console.log(Router)
  //   // Router.push({name: getRouteNameWithLocale(routeName)})
  // }

  getRouteNameWithLocale(routeName) {
    return generateRouteNameWithLocale(
      routeName,
      LocalStorageSharedMethods.getLanguage()
    )
  }
}
