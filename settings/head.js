import productSharedMethods from '~/sharedMethods/product'

let getDefaultMeta = function() {
  return [
    {
      hid: 'og:url',
      property: 'og:url',
      content: `${process.env.baseUrl}${this.$router.currentRoute.path}`,
    },
  ]
}

export default {

  default: function(data) {

    let dataAreRobotsAllowed = data ? data.are_robots_allowed : undefined
    let dataMetaImage = data ? data.meta_image : undefined

    let title = `Cool City - ${this.$t('online_fashion_clothing_store_in_thailand')}`

    let meta = getDefaultMeta.bind(this)()
    meta.push(
      {
        hid: 'description',
        name: 'description',
        content: this.$t('default_description_meta_tag'),
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: this.$t('default_description_meta_tag'),
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: title,
      }
    )

    let areRobotsAllowed = true
    if (dataAreRobotsAllowed !== undefined) {
      areRobotsAllowed = !!data.areRobotsAllowed
    }
    if (areRobotsAllowed === false) {
      meta.push({
        hid: 'robots',
        name: 'robots',
        content: 'NoIndex',
      })
    }

    let metaImage = null
    if (dataMetaImage) {
      metaImage = data.meta_image
    }
    if (metaImage !== null) {
      meta.push({
        hid: 'og:image',
        property: 'og:image',
        content: metaImage,
      })
    }

    return {
      title,
      meta,
    }
  },

  buy: function() {

    let selectedPosition = this.$store.state.products.selectedPosition
    let productTitle = productSharedMethods.getPositionAttribute(selectedPosition, 'title', this.$i18n.locale)
    let title = `Cool City - ${this.$t('buy')} ${productTitle}`

    let meta = getDefaultMeta.bind(this)()
    meta.push({
      hid: 'og:title',
      property: 'og:title',
      content: title,
    })

    let image = `${process.env.baseUrl}${productSharedMethods.getPositionFirstPictureUrl(selectedPosition)}`
    meta.push({
      hid: 'og:image',
      property: 'og:image',
      content: image,
    })

    let description = `${this.$t('here_you_can_buy')} ${productTitle}. ${this.$t('delivery_throughout_thailand')}`
    if (this.$i18n.locale === 'th') {
      description = `${this.$t('here_you_can_buy')}${productTitle} ${this.$t('delivery_throughout_thailand')}`
    }
    meta.push(
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: description,
      }
    )

    return {
      title,
      meta,
    }
  }
}
