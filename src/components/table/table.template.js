const CODES = {
  A: 65,
  Z: 90,
}

function toCell() {
  return `
    <div class="cell" contenteditable>
    </div>
  `
}
function toCol(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `
}
function createRow(content, num = '') {
  return `
    <div class="row">
      <div class="row-info">${num}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20) {
  const colCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colCount).fill('').map(toChar).map(toCol).join('')
  const cell = new Array(colCount).fill('').map(toCell).join('')

  rows.push(createRow(cols))

  for (let i = 1; i <= rowsCount; i++) {
    rows.push(createRow(cell, i))
  }

  return rows.join('')
}

{
  /* <div class="row">

<div class="row-info"></div>

<div class="row-data">
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>
  <div class="column">
    A
  </div>
  <div class="column">
    B
  </div>
  <div class="column">
    C
  </div>

</div>

</div>

<div class="row">
<div class="row-info">
  1
</div>

<div class="row-data">
  <div class="cell selected" contenteditable="">A1</div>
  <div class="cell" contenteditable="">B2</div>
  <div class="cell" contenteditable="">C3</div>
</div>
</div>

<div class="row">
<div class="row-info">
  2
</div>

<div class="row-data">
  <div class="cell">A1</div>
  <div class="cell">B2</div>
  <div class="cell">C3</div>
</div>
</div> */
}