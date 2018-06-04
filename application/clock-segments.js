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
const CURRENT_TIME_SHIFT = 1
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
    id: `arc-${period.id}`,
    name: period.id,
  }
})

const MARKER_SIZE = 0.75
const THAI_HOUR_SHIFT = 1.1
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
          id: `${period.id}-${hour}`,
          name: period.id,
          x: startX,
          y: startY,
          textX: startX * THAI_HOUR_SHIFT,
          textY: startY * THAI_HOUR_SHIFT,
        }
      }
    )
  })
  .reduce(function flattenMarkers(accumulator, periodMarkers) {
    return accumulator.concat(periodMarkers)
  }, [])

const INTERNATIONAL_HOUR_SHIFT = 0.75
const INTERNATIONAL_HOUR_BG_SIZE = 8.5
export const internationalHours = thaiPeriods.map(period => {
  const [startX, startY] = getCoordinates(period.start / 24)
  return {
    hour: period.start ? period.start : 24,
    id: `24-${period.id}`,
    x: startX * INTERNATIONAL_HOUR_SHIFT,
    y: startY * INTERNATIONAL_HOUR_SHIFT,
    cx: startX * INTERNATIONAL_HOUR_SHIFT,
    cy: startY * INTERNATIONAL_HOUR_SHIFT,
    bgSize: INTERNATIONAL_HOUR_BG_SIZE,
  }
})
