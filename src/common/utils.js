/**
 * 频繁刷新防抖函數
 * @param func
 * @param delay
 * @returns {function(...[*]=): void}
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }

}