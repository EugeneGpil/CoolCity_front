import routerSharedMethods from '~/sharedMethods/router'

export default function({ route, from, store, redirect }) {

  if (from) {
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    gtag('js', new Date())
    gtag(
      'config',
      process.env.googleAnalyticsId,
    )
    gtag(
      'event',
      window.location.pathname + window.location.search + window.location.hash
    )
  }

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
