import React from "react"
import LineGraphControl from "./LineGraphControl"

export default function ModulationGraph({
  width,
  height,
  scrollLeft,
  events,
  transform,
  dispatch
}) {
  return <LineGraphControl
    className="ModulationGraph"
    width={width}
    height={height}
    scrollLeft={scrollLeft}
    transform={transform}
    maxValue={127}
    lineWidth={2}
    events={events.filter(e => e.controllerType === 0x01)}
    axis={[0, 0x20, 0x40, 0x60, 0x80 - 1]}
    createEvent={obj => dispatch("CREATE_MODULATION", obj)}
    onClickAxis={e => dispatch("CREATE_MODULATION", { value: e.value })}
  />
}
