export default async function({ route, from, store, redirect }) {

  if (from) {
    return
  }

  await store.dispatch('meta/getImage')
}
