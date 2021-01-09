import buildService from '../services/buildService'
import i18nPreparedSettings from '../settings/i18nPrepared'

let dinamicRoutesDraft = [
  {
    path: '/product/:id?',
    name: 'product-id',
  },
  {
    path: '/position/:id?/buy',
    name: 'position-id-buy',
  },
]

let allLocaleCodes = i18nPreparedSettings.allLocaleCodes

let dinamicRoutesDraftWithLanguages = []
for (let i = 0; i < dinamicRoutesDraft.length; i++) {
  let currentDraftDinamicRoute = dinamicRoutesDraft[i]
  for (let j = 0; j < allLocaleCodes.length; j++) {
    let currentLocalCode = allLocaleCodes[j]
    dinamicRoutesDraftWithLanguages.push({
      path: `/${currentLocalCode}${currentDraftDinamicRoute.path}`,
      name: currentDraftDinamicRoute.name,
    })
  }
}

let addDinamicRoutes = async (data) => {
  let nuxtRoutes = data.nuxt_routes
  let dinamicRoutes = [... data.dinamic_routes]
  let getIdsMethod = data.get_ids_method
  let routeNameToFind = data.route_name_to_find

  const allIds = (await getIdsMethod()).data.payload

  for (let i = 0; i < nuxtRoutes.length; i++) {
    let currentNuxtRoute = nuxtRoutes[i]
    if (currentNuxtRoute.name === routeNameToFind) {
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

  let dinamicRoutes = await addDinamicRoutes({
    nuxt_routes: dinamicRoutesDraftWithLanguages,
    dinamic_routes: [],
    get_ids_method: buildService.getProductsIds,
    route_name_to_find: 'product-id',
  })

  dinamicRoutes = await addDinamicRoutes({
    nuxt_routes: dinamicRoutesDraftWithLanguages,
    dinamic_routes: dinamicRoutes,
    get_ids_method: buildService.getPositionsIds,
    route_name_to_find: 'position-id-buy',
  })

  return dinamicRoutes
}
