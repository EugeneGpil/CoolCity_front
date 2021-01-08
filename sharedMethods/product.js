export default {

  getPositionFirstPictureUrl(position) {
    if (position === null || position === undefined) {
      return ''
    }
    return position.pictures[0].url
  },

  getPositionAttribute(position, attributeName, language = null) {
    if (position === null) {
      return ''
    }
    if (attributeName === 'title' && language !== null & language !== 'en') {
      for (let i = 0; i < position.title_translations.length; i++) {
        let currentTitleTranslation = position.title_translations[i]
        if (currentTitleTranslation.language === language) {
          return currentTitleTranslation.title
        }
      }
    }
    if (position[attributeName] === null && attributeName === 'second_color') {
      return position['first_color']
    }
    return position[attributeName]
  },

}
