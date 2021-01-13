import metaService from '~/services/metaService'

export const state = () => ({
  image: '',
})

export const mutations = {

  setImage(context, image) {
    context.image = image
  },

}

export const actions = {

  async getImage(context) {

    if (context.state.image !== '') {
      return
    }

    let metaImage = (await(metaService.getDefaultImage())).data.payload
    context.commit('setImage', process.env.baseUrl + metaImage)
  },
}

export const getters = {

}
