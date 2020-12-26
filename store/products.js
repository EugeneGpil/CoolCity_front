import productsService from '~/services/productsService'

export const state = () => ({
  products: [],
  gotProductsAt: null,
  selectedPositionId: null,
  selectedPosition: {},
})

export const mutations = {

  setProducts(context, products) {
    context.products = products
    context.gotProductsAt = Date.now()
  },

  setSelectedPositionId(context, selectedPositionId) {
    context.selectedPositionId = selectedPositionId
  },

  setSelectedPosition(context, selectedPosition) {
    context.selectedPosition = selectedPosition
  },

}

export const actions = {

  getProducts(context) {
    if (!context.gotProductsAt || Date.now() - context.gotProductsAt >= 5 * 60 * 1000) {
      return productsService.getProducts().then(response => {
        context.commit('setProducts', response.data.payload)
      })
    }
  },

  setSelectedPositionId(context, selectedPositionId) {
    context.commit('setSelectedPositionId', selectedPositionId)
  },

  setSelectedPosition(context, selectedPosition) {
    context.commit('setSelectedPosition', selectedPosition)
  },

}

export const getters = {

}
