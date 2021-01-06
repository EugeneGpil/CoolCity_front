export default function({ route, from, store, redirect }) {

  if (from && process.env.NODE_ENV === 'production') {
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

}
