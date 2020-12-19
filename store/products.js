import ProductsService from '~/services/ProductsService'

export const state = () => ({
  products: [],
  gotProductsAt: null
})

export const mutations = {

  setProducts(context, products) {
    context.products = products
    context.gotProductsAt = Date.now()
  },

}

export const actions = {

  getProducts(context) {
    if (!context.gotProductsAt || Date.now() - context.gotProductsAt >= 5 * 60 * 1000) {
      return ProductsService.getProducts().then(response => {
        context.commit('setProducts', response.data.payload)
      })
    }
  },

}