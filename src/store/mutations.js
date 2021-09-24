export default {
  addCounter(state, payload) {
    payload.count++
  },
  addtoCart(state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  }
}