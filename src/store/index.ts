import { createStore } from 'vuex'
import productService from '../services/products'

export default createStore({
  state: {
    products: [],
    productData: [],
  },
  getters: {
    allProducts: state => state.products,
    allProductData: state => state.productData,
  },
  mutations: {
    ALL_PRODUCTS(state, products) {
      if (products) {
        state.products = products;
      }

    },
    ALL_PRODUCT_DATA(state, productData) {
      if (productData.length > 0) {
        state.productData = state.productData.concat(productData);
      }
    }
  },
  actions: {
    allProducts({ commit },id) {
      return productService.getProducts(id).then(
        products => {
          commit('ALL_PRODUCTS', products);
          commit('ALL_PRODUCT_DATA', products.data);
          return Promise.resolve(products);
        }
      );
    },
  },
  modules: {
  }
})
