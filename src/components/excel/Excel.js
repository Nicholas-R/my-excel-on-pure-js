import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/Dom'

export class Excel extends ExcelComponent {
  constructor(selector, options) {
    super()
    this.$el = $(selector)
    this.components = options.components || []
  }
  getRoot() {
    const $root = $.create('div', 'excell')
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }
  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }
}
