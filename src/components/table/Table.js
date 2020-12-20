import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '../table/table.template'
import { tableResizer } from '../table/tableResizer'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    })
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      tableResizer(this.$root)
    }
  }

  toHTML() {
    return createTable()
  }
}
