import { isNumber } from "lodash"
import React, { CanvasHTMLAttributes, Component } from "react"

export interface DrawCanvasProps
  extends CanvasHTMLAttributes<HTMLCanvasElement> {
  draw: (ctx: CanvasRenderingContext2D) => void
}

export default class DrawCanvas extends Component<DrawCanvasProps> {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  componentDidMount() {
    const ctx = this.canvas.getContext("2d")
    if (ctx === null) {
      throw new Error("failed to getContext 2d")
    }
    this.ctx = ctx
    this.drawCanvas()
  }

  componentDidUpdate() {
    this.drawCanvas()
  }

  drawCanvas() {
    if (this.props.draw) {
      this.ctx.save()
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      this.props.draw(this.ctx)
      this.ctx.restore()
    }
  }

  render() {
    const { width, height, draw, style, ...props } = this.props
    return (
      <canvas
        ref={(c) => c && (this.canvas = c)}
        {...props}
        width={isNumber(width) ? width * window.devicePixelRatio : undefined}
        height={isNumber(height) ? height * window.devicePixelRatio : undefined}
        style={{ ...style, width, height }}
      />
    )
  }
}
