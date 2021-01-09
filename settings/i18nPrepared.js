import i18nSettings from '../settings/i18n'

let allLocaleCodes = []
for (let i = 0; i < i18nSettings.locales.length; i++) {
  allLocaleCodes.push(i18nSettings.locales[i].code)
}

export default {

  allLocaleCodes,

}
