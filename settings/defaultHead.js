export default function ($t, $i18n) {

  this.$t = $t
  this.$i18n = $i18n

  return {
    title: `Cool City - ${this.$t('online_fashion_clothing_store_in_thailand')}`,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: this.$t('default_description_meta_tag'),
      },
    ],
  }
}
