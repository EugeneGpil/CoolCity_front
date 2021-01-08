import getRoutes from '../build/getRoutes'
import i18nSettings from '../settings/i18n'

let allLocaleCodes = []
for (let i = 0; i < i18nSettings.locales.length; i++) {
  allLocaleCodes.push(i18nSettings.locales[i].code)
}

let pathsToExclude = [
  '/application_added_successfully',
]
let allPathsToExcludeWithLocale = []
for (let i = 0; i < pathsToExclude.length; i++) {
  let currentPathToExclude = pathsToExclude[i]
  allPathsToExcludeWithLocale.push(currentPathToExclude)
  for (let j = 0; j < allLocaleCodes.length; j++) {
    allPathsToExcludeWithLocale.push(`/${allLocaleCodes[j]}${currentPathToExclude}`)
  }
}

export default {
  path: '/sitemap.xml',
  hostname: process.env.BASE_URL,
  i18n: true,
  i18n: {
    locales: allLocaleCodes,
    routeNameSeparator: '___',
  },
  routes: getRoutes,
  exclude: allPathsToExcludeWithLocale,
}
