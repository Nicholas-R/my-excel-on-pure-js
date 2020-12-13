import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '../table/table.template'
import { $ } from '@core/Dom'

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
      const $resizer = $(event.target)
      const $parent = $resizer.closest(`[data-type="resizable"]`)
      const coords = $parent.getCoords()

      // columns
      const colName = $parent.$el.dataset.char
      const allResizeCols = document.querySelectorAll(`[data-char="${colName}"]`)
      // rows
      const rowName = $parent.$el.dataset.row
      const resizeRow = document.querySelectorAll(`[data-row="${rowName}"]`)

      document.onmousemove = e => {
        // columns
        const colDelta = e.pageX - coords.right
        const colValue = coords.width + colDelta

        allResizeCols.forEach(el => {
          el.style.width = `${colValue}px`
          el.style.borderRightColor = '#3c74ff'
        })
        // rows
        const rowDelta = e.pageY - coords.bottom
        const rowValue = coords.height + rowDelta

        resizeRow.forEach(el => {
          el.style.height = `${rowValue}px`
          el.style.borderBottom = '1px solid #3c74ff'
        })
      }
      document.onmouseup = () => {
        document.onmousemove = null
        // columns
        allResizeCols.forEach(el => {
          el.style.borderRightColor = '#e2e3e3'
        })
        // rows
        resizeRow.forEach(el => {
          el.style.borderBottom = '0px solid #e2e3e3'
        })
      }
    }
  }

  toHTML() {
    return createTable()
  }
}
