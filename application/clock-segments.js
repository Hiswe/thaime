import { DateTime } from 'luxon'
import round from 'lodash.round'

import { thaiPeriods } from './thai-hours'

export const SVG_SIZE = 100

function getCoordinates(percent) {
  // -0.25 is for not rotate the whole svg by 90˚
  const x = Math.cos(2 * Math.PI * (percent - 0.25)) * SVG_SIZE
  const y = Math.sin(2 * Math.PI * (percent - 0.25)) * SVG_SIZE
  return [round(x, 8), round(y, 8)]
}

const DAY_LENGTH = 24 * 60
const CURRENT_TIME_SHIFT = 0.8775
export function currentTimeToCoordinates(currentTime) {
  const minutesSinceMidnight = currentTime.hour * 60 + currentTime.minute
  const [x, y] = getCoordinates(minutesSinceMidnight / DAY_LENGTH)
  return { x: x * CURRENT_TIME_SHIFT, y: y * CURRENT_TIME_SHIFT }
}

export const arcs = thaiPeriods.map(function periodToPercent(period) {
  const start = period.start / 24
  const end = period.end / 24
  const [startX, startY] = getCoordinates(start)
  const [endX, endY] = getCoordinates(end)
  const largeArcFlag = end - start > 0.5 ? 1 : 0
  const pathData = `
    M ${startX} ${startY}
    A ${SVG_SIZE} ${SVG_SIZE} 0 ${largeArcFlag} 1 ${endX} ${endY}
  `
  return {
    pathData,
    id: `arc-${period.name.replace(` `, `-`)}`,
    name: period.name.replace(` `, `-`),
  }
})

const MARKER_SIZE = 0.75
const TEXT_SHIFT = 1.1
export const hourMarkers = thaiPeriods
  .map(function periodToMarkers(period) {
    return Array.from({ length: period.end - period.start }).map(
      (value, index) => {
        const isFirstPeriodMarker = index === 0
        const hour = index + period.start
        const thaiHour = hour - period.thaiHourShift
        const [startX, startY] = getCoordinates(hour / 24)
        const pathData = `
          M ${startX} ${startY}
          L ${startX * MARKER_SIZE} ${startY * MARKER_SIZE}
        `
        return {
          isFirstPeriodMarker,
          thaiHour,
          pathData,
          id: `${period.name}-${hour}`,
          name: period.name.replace(` `, `-`),
          x: startX,
          y: startY,
          textX: startX * TEXT_SHIFT,
          textY: startY * TEXT_SHIFT,
        }
      }
    )
  })
  .reduce(function flattenMarkers(accumulator, periodMarkers) {
    return accumulator.concat(periodMarkers)
  }, [])
