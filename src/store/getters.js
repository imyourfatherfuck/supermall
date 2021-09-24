export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartCount(state, getters) {
    return getters.cartList.length
  }
}