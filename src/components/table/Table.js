import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '../table/table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'mousemove', 'mouseup'],
    })
  }

  changeWidth(colArr, rowArr, { x, y }) {
    if (colArr.length) {
      colArr.forEach(e => {
        return (e.style.width = `${x - e.offsetLeft}px`)
      })
    }
    if (rowArr.length) {
      rowArr.forEach(e => {
        return (e.style.height = `${y - e.getBoundingClientRect().y}px`)
      })
    }
  }

  mouseDown = 0
  allResizeCols = []
  resizeRow = []
  colName = null
  rowName = null

  onMousedown(event) {
    if (event.target.dataset.resize) {
      this.mouseDown++
      if (event.target.dataset.resize === 'col') {
        this.colName = event.target.parentNode.dataset.char
        this.allResizeCols = document.querySelectorAll(`[data-char="${this.colName}"]`)
      }
      if (event.target.dataset.resize === 'row') {
        this.rowName = event.target.parentNode.parentNode.dataset.row
        this.resizeRow = document.querySelectorAll(`[data-row="${this.rowName}"]`)
      }
    }
  }
  onMousemove(event) {
    const position = {}
    if (this.mouseDown) {
      position.x = event.x
      position.y = event.y
      this.changeWidth(this.allResizeCols, this.resizeRow, position)
    }
    return null
  }
  onMouseup(event) {
    this.mouseDown--
    this.allResizeCols = []
    this.resizeRow = []
    this.colName = null
    this.rowName = null
  }

  toHTML() {
    return createTable()
  }
}
