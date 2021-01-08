import productSharedMethods from '~/sharedMethods/product'

export default {

  default: function() {

    let title = `Cool City - ${this.$t('online_fashion_clothing_store_in_thailand')}`

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'descriptoin' + this.$t('default_description_meta_tag'),
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },

  buy: function() {

    let selectedPosition = this.$store.state.products.selectedPosition
    let productTitle = productSharedMethods.getPositionAttribute(selectedPosition, 'title', this.$i18n.locale)
    let title = `Cool City - ${this.$t('buy')} ${productTitle}`

    let description = `${this.$t('here_you_can_buy')} ${productTitle}. ${this.$t('delivery_throughout_thailand')}`
    if (this.$i18n.locale === 'th') {
      description = `${this.$t('here_you_can_buy')}${productTitle} ${this.$t('delivery_throughout_thailand')}`
    }

    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  }
}
