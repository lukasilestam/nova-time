Nova.booting((Vue, router, store) => {
  Vue.component('index-time', require('./components/IndexField'))
  Vue.component('detail-time', require('./components/DetailField'))
  Vue.component('form-time', require('./components/FormField'))
})
