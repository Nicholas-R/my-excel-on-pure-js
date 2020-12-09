import { toCapitalize } from '../core/utils'
export class DomListener {
  constructor($root, listeners = []) {
    // if (!$root) {
    //   throw new Error(`No $root provided for DomListener`)
    // }
    this.$root = $root
    this.listeners = listeners
  }
  initDomListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} dos't implemented in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    console.log('unsubscribe')
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(`Method ${method} dos't implemented in ${name} Component`)
      }
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return `on${toCapitalize(eventName)}`
}
