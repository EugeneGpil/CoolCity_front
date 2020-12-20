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

  addOneProduct(context, product) {
    
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

  addOneProduct(context) {
    return ProductsService.getOneProduct(id).then(response => {
      context.commit('addOneProduct', response.data.payload)
    })
  }

}

export const getters = {

  currentProduct(context) {
    let productId = $nuxt._router.history.current.params.id

    for (let i = 0; i < context.store.products.length; i++) {
      if (context.store.products[i].id === productId) {
        return context.store.products[i]
      }
    }

    return null
  }

}
