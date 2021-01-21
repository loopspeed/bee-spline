class BeeSpline {
  root: HTMLElement
  canvas: HTMLCanvasElement

  constructor(root: HTMLElement) {
    this.root = root
    this.canvas = document.createElement('canvas')
    this.createCanvas()
  }

  createCanvas() {
    const dimensions = this.root.getBoundingClientRect()
    this.canvas.width = dimensions.width
    this.canvas.height = dimensions.height
    this.canvas.style.position = 'absolute'
    this.root.appendChild(this.canvas)
  }

  draw(points: { x: number; y: number }[]) {
    let ctx = this.canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#FF0000'

    points.forEach(({ x, y }) => ctx?.fillRect(x, y, 150, 75))

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    var t = 1
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = i > 0 ? points[i - 1] : points[0]
      var p1 = points[i]
      var p2 = points[i + 1]
      var p3 = i != points.length - 2 ? points[i + 2] : p2

      var cp1x = p1.x + ((p2.x - p0.x) / 6) * t
      var cp1y = p1.y + ((p2.y - p0.y) / 6) * t

      var cp2x = p2.x - ((p3.x - p1.x) / 6) * t
      var cp2y = p2.y - ((p3.y - p1.y) / 6) * t

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
    }

    ctx.stroke()
  }
}

export default BeeSpline
