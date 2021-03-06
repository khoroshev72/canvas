const WIDTH = 600
const HEIGT = 200
const PADDING = 40
const DPI_WIDTH = WIDTH * 2
const DPI_HEIGTH = HEIGT * 2
const VIEW_HEIGHT = DPI_HEIGTH - PADDING * 2
const ROWS_COUNT = 5

function chart(canvas, data) {
  const ctx = canvas.getContext('2d')
  canvas.style.width = WIDTH + 'px'
  canvas.style.height = HEIGT + 'px'
  canvas.width = DPI_WIDTH
  canvas.height = DPI_HEIGTH

  const [yMin, yMax] = computeBounderies(data)

  const yRatio = VIEW_HEIGHT / (yMax - yMin)
 
  // Горизонтальные линии
  const step = VIEW_HEIGHT / ROWS_COUNT
  const textStep = (yMax - yMin) / ROWS_COUNT

  ctx.beginPath()
  ctx.font = 'normal 20px Helvetica,sans-serif'
  ctx.fillStyle = '#96a2aa'
  ctx.strokeStyle = '#bbb'
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = step * i
    const text = yMax - textStep * i
    ctx.fillText(text.toString(), 5, y + PADDING - 10)
    ctx.moveTo(0, y + PADDING)
    ctx.lineTo(DPI_WIDTH, y + PADDING)
  }
  ctx.stroke()
  ctx.closePath()

  // График
  ctx.beginPath()
  ctx.lineWidth = 4
  ctx.strokeStyle = '#ff0000'
  for (const [x, y] of data) {
    ctx.lineTo(x, DPI_HEIGTH - PADDING - y * yRatio)
  }
  ctx.stroke()
  ctx.closePath()
}

chart(document.getElementById('chart'), [
  [0, 0],
  [200, 100],
  [400, 100],
  [600, 300],
  [800, 50]
])

function computeBounderies(data) {
  let min
  let max

  for ([, y] of data) {
    if (typeof min !== 'number') min = y
    if (typeof max !== 'number') max = y

    if (min > y) min = y
    if (max < y) max = y
  }

  return [min, max]
}