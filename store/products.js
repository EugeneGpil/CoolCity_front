import productsService from '~/services/productsService'

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
    if (context.products) {
      context.products = context.products.concat([product])
    } else {
      context.products = [product]
    }
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

  addCurrentProduct(context) {
    return productsService.getOneProduct(
      this.app.router.history.current.params.id
    ).then(response => {
      context.commit('addOneProduct', response.data.payload[0])
    })
  }

}

export const getters = {

}
