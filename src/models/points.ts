export type CoordinatePoint = { x: number; y: number }
export type ElementPoint = {
  id: string
  xPosition?: 'left' | 'center' | 'right'
  yPosition?: 'top' | 'center' | 'bottom'
  xOffset?: number
  yOffset?: number
}

type Point = CoordinatePoint | ElementPoint
export default Point
