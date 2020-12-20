import { $ } from '@core/Dom'

export function resizeHandler($root, event) {
  let colDelta = null
  let rowDelta = null
  const $resizer = $(event.target)
  const $parent = $resizer.closest(`[data-type="resizable"]`)
  const coords = $parent.getCoords()
  const separator = $root.findAll(`[data-select="separator"]`)[0]
  const separatorBlock = $root.findAll(`[data-select="separator-block"]`)[0]
  const separatorBlockWidth = $($root.findAll('[data-select="row-info"]')[0]).getCoords()
    .width
  // columns
  const colName = $parent.data.char
  const allResizeCols = $root.findAll(`[data-char="${colName}"]`)
  // rows
  const rowName = $parent.data.row
  const resizeRow = $root.findAll(`[data-row="${rowName}"]`)

  document.onmousemove = e => {
    colDelta = e.pageX - coords.right
    rowDelta = e.pageY - coords.bottom
    const leftCount = e.pageX - 1
    const topCount = e.pageY - $root.$el.offsetTop - 1
    // columns
    if (allResizeCols.length) {
      $(separator).css({
        left: `${leftCount}px`,
        width: '1px',
        height: '100%',
        background: '#3c74ff',
      })
      $(separatorBlock).css({
        left: `${leftCount - 2}px`,
        width: '5px',
        height: `${coords.height}px`,
        background: '#3c74ff',
      })
      $(separatorBlock).addClass('col-hover')
    }
    if (resizeRow.length) {
      $(separator).css({
        top: `${topCount}px`,
        width: '100%',
        height: '1px',
        background: '#3c74ff',
      })
      $(separatorBlock).css({
        top: `${topCount - 2}px`,
        width: `${separatorBlockWidth}px`,
        height: '5px',
        background: '#3c74ff',
      })
      $(separatorBlock).addClass('row-hover')
    }
  }
  document.onmouseup = () => {
    // columns
    const colValue = coords.width + colDelta
    console.log(allResizeCols)
    allResizeCols.forEach(el => {
      $(el).css({ width: `${colValue}px` })
    })
    // rows
    const rowValue = coords.height + rowDelta
    resizeRow.forEach(el => {
      $(el).css({ height: `${rowValue}px` })
    })
    $(separator).css({
      left: '0px',
      top: '0px',
      width: '0px',
      height: '0px',
      background: 'transparent',
    })
    $(separatorBlock).css({
      left: '0px',
      top: '0',
      width: '0px',
      height: '0px',
      background: 'transparent',
    })
    $(separatorBlock).removeClass('row-hover')
    $(separatorBlock).removeClass('col-hover')
    document.onmousemove = null
  }
}
