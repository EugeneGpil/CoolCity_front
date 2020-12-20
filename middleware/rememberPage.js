import routerSharedMethods from '~/sharedMethods/router'

export default function({ route, from, store, redirect }) {
  store.dispatch(
    'router/setCurrentPage',
    routerSharedMethods.getPageInfoWithoutLanguage(route)
  )

  if (from) {
    store.dispatch(
      'router/setPreviousPage',
      routerSharedMethods.getPageInfoWithoutLanguage(from),
    )
  }
}
