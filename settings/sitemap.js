import getRoutes from '../build/getRoutes'
import i18nPreparedSettings from '../settings/i18nPrepared'

let pathsToExclude = [
  '/application_added_successfully',
  '/language_select',
]

let allLocaleCodes = i18nPreparedSettings.allLocaleCodes

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
