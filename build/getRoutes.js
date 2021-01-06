import buildService from '../services/buildService'
import { routerOptions } from '../.nuxt/router'
import routerSharedMethods from '../sharedMethods/router'

let addDinamicRoutes = async (data) => {
  let nuxtRoutes = data.nuxt_routes
  let dinamicRoutes = [... data.dinamic_routes]
  let getIdsMethod = data.get_ids_method
  let getPageNameWithoutLanguageMethod = data.get_page_name_without_language_method
  let routeNameToFind = data.route_name_to_find

  const allIds = (await getIdsMethod()).data.payload

  for (let i = 0; i < nuxtRoutes.length; i++) {
    let currentNuxtRoute = nuxtRoutes[i]
    if (getPageNameWithoutLanguageMethod(currentNuxtRoute) === routeNameToFind) {
      let currentNuxtRoutePath = currentNuxtRoute.path
      for (let j = 0; j < allIds.length; j++) {
        let pathWithExistingId = currentNuxtRoutePath.replace(':id?', allIds[j])
        dinamicRoutes.push(pathWithExistingId)
      }
    }
  }

  return dinamicRoutes
}

export default async () => {

  let nuxtRoutes = routerOptions.routes

  let dinamicRoutes = await addDinamicRoutes({
    nuxt_routes: nuxtRoutes,
    dinamic_routes: [],
    get_ids_method: buildService.getProductsIds,
    get_page_name_without_language_method: routerSharedMethods.getPageNameWithoutLanguage,
    route_name_to_find: 'product-id',
  })

  dinamicRoutes = await addDinamicRoutes({
    nuxt_routes: nuxtRoutes,
    dinamic_routes: dinamicRoutes,
    get_ids_method: buildService.getPositionsIds,
    get_page_name_without_language_method: routerSharedMethods.getPageNameWithoutLanguage,
    route_name_to_find: 'position-id-buy',
  })

  return dinamicRoutes
}
