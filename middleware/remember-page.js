export default function({ route, from, store, redirect }) {
  store.dispatch('router/setCurrentPage', {
    name: route.name.substring(0, route.name.length - 5),
    params: route.params,
  })

  if (from) {
    store.dispatch('router/setPreviousPage', {
      name: from.name.substring(0, from.name.length - 5),
      params: from.params,
    })
  }
}
