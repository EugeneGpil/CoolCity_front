export default {

  getPositionFirstPictureUrl(position) {
    if (position === null || position === undefined || position.pictures === undefined) {
      return ''
    }
    return position.pictures[0].url
  },

  getPositionAttribute(position, attributeName, language = null) {
    if (position === null || position === undefined) {
      return ''
    }
    if (
      attributeName === 'title'
      && language !== null
      && language !== 'en' 
      && position.title_translations !== undefined
    ) {
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
