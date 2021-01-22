import Point, { CoordinatePoint, ElementPoint } from './models/points.js'

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

  draw(points: Point[]) {
    let ctx = this.canvas.getContext('2d')
    if (!ctx) return

    let coordinates = points.map(this.convertPointToCoordinates).filter((xy) => !!xy) as CoordinatePoint[]
    coordinates = coordinates.map(({ x, y }) => ({ x: x - this.canvas.offsetLeft, y: y - this.canvas.offsetTop }))
    ctx.beginPath()
    ctx.moveTo(coordinates[0].x, coordinates[0].y)

    var t = 1.5
    for (var i = 0; i < coordinates.length - 1; i++) {
      var p0 = i > 0 ? coordinates[i - 1] : coordinates[0]
      var p1 = coordinates[i]
      var p2 = coordinates[i + 1]
      var p3 = i != coordinates.length - 2 ? coordinates[i + 2] : p2

      var cp1x = p1.x + ((p2.x - p0.x) / 6) * t
      var cp1y = p1.y + ((p2.y - p0.y) / 6) * t

      var cp2x = p2.x - ((p3.x - p1.x) / 6) * t
      var cp2y = p2.y - ((p3.y - p1.y) / 6) * t

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
    }

    ctx.stroke()
  }

  /**
   * Returns a CoordinatePoint from a Point type which can either already be
   * a CoordinatePoint or can contain data about an element to return a point
   * @param point The point to be converted
   * @return {CoordinatePoint} Has an x and y coordinate for placement
   */
  convertPointToCoordinates = (point: Point): CoordinatePoint | null => {
    // If there's an x coordinate then it's already a CoordinatePoint
    if ('x' in point) return point

    // Otherwise it's an ElementPoint
    point = point as ElementPoint
    const { id, xPosition = 'center', yPosition = 'center', xOffset = 0, yOffset = 0 } = point

    // Get the element
    const element = document.getElementById(id)
    const dimensions = element?.getBoundingClientRect()
    if (!dimensions) return null

    // Get the x coordinate
    let x: number
    if (xPosition === 'left') x = dimensions.left
    else if (xPosition === 'right') x = dimensions.right
    else if (xPosition === 'center') x = dimensions.left + dimensions.width / 2
    else return null
    x += xOffset

    // Get the y coordinate
    let y: number
    if (yPosition === 'top') y = dimensions.top
    else if (yPosition === 'bottom') y = dimensions.bottom
    else if (yPosition === 'center') y = dimensions.top + dimensions.height / 2
    else return null
    y += yOffset

    return { x, y }
  }
}

export default BeeSpline
