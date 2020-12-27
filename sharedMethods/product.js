export default {

  getSelectedPositionFirstPictureUrl(selectedPosition) {
    if (selectedPosition === null || selectedPosition === undefined) {
      return ''
    }
    return selectedPosition.pictures[0].url
  },

  getSelectedPositionAttribute(selectedPosition, attributeName) {
    if (selectedPosition === null) {
      return ''
    }
    if (selectedPosition[attributeName] === null && attributeName === 'second_color') {
      return selectedPosition['first_color']
    }
    return selectedPosition[attributeName]
  },

}