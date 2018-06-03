import { DateTime } from 'luxon'
import round from 'lodash.round'

import { thaiPeriods } from './thai-hours'

function getCoordinates(percent) {
  const x = Math.cos(2 * Math.PI * percent)
  const y = Math.sin(2 * Math.PI * percent)
  return [round(x, 8), round(y, 8)]
}

export const arcs = thaiPeriods.map(function periodToPercent(period) {
  const start = period.start / 24
  const end = period.end / 24
  const [startX, startY] = getCoordinates(start)
  const [endX, endY] = getCoordinates(end)
  const largeArcFlag = end - start > 0.5 ? 1 : 0
  const pathData = `
    M ${startX} ${startY}
    A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
  `
  return { pathData, name: period.name }
})

const MARKER_SIZE = 0.9
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
          name: period.name,
        }
      }
    )
  })
  .reduce(function flattenMarkers(accumulator, periodMarkers) {
    return accumulator.concat(periodMarkers)
  }, [])

// console.log(hourMarkers)
