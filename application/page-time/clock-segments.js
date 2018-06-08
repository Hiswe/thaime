import round from 'lodash.round'

import { thaiPeriods } from '../thai-hours'

export const SVG_SIZE = 100

function flattenArray(accumulator, array) {
  return accumulator.concat(array)
}

function getCoordinates(percent) {
  // -0.25 is for not rotate the whole svg by 90˚
  const x = Math.cos(2 * Math.PI * (percent - 0.25)) * SVG_SIZE
  const y = Math.sin(2 * Math.PI * (percent - 0.25)) * SVG_SIZE
  return [round(x, 8), round(y, 8)]
}

function createPeriodArcPath(period, shift = 1, reverse = false) {
  const start = period.start / 24
  const end = period.end / 24
  const [startX, startY] = getCoordinates(start)
  const [endX, endY] = getCoordinates(end)
  const largeArcFlag = end - start > 0.5 ? 1 : 0
  const startCoords = `${startX * shift} ${startY * shift}`
  const endCoords = `${endX * shift} ${endY * shift}`
  const arcCenter = `${SVG_SIZE * shift} ${SVG_SIZE * shift}`
  const pathData = `
    M ${reverse ? endCoords : startCoords}
    A ${arcCenter} 0 ${largeArcFlag} ${reverse ? 0 : 1} ${
    reverse ? startCoords : endCoords
  }
  `
  return pathData
}

const DAY_LENGTH = 24 * 60
const CURRENT_TIME_SHIFT = 1
export function currentTimeToCoordinates(currentTime) {
  const minutesSinceMidnight = currentTime.hour * 60 + currentTime.minute
  const [x, y] = getCoordinates(minutesSinceMidnight / DAY_LENGTH)
  return { x: x * CURRENT_TIME_SHIFT, y: y * CURRENT_TIME_SHIFT }
}

export const arcs = thaiPeriods.map(function periodToPercent(period) {
  return {
    pathData: createPeriodArcPath(period),
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
  .reduce(flattenArray, [])

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

const PERIOD_NAME_SHIFT = 1.25
const PERIOD_NAME_HEIGHT = 10
const midnightPosition = SVG_SIZE * PERIOD_NAME_SHIFT + PERIOD_NAME_HEIGHT
const midnightPath = `
  M ${midnightPosition * -1} ${midnightPosition * -1}
  L ${midnightPosition} ${midnightPosition * -1}
`
const noonPosition = SVG_SIZE * PERIOD_NAME_SHIFT + PERIOD_NAME_HEIGHT
const noonPath = `
  M ${noonPosition * -1} ${noonPosition}
  L ${noonPosition} ${noonPosition}
`
export const periodNames = thaiPeriods.map((period, index) => {
  const text =
    period.rtgsPadStart && period.rtgsPadEnd
      ? period.rtgs().replace(` `, ` * `)
      : !period.rtgsPadStart && period.rtgsPadEnd
        ? `* ${period.rtgs()}`
        : period.rtgsPadStart && !period.rtgsPadEnd
          ? `${period.rtgs()} *`
          : period.rtgs()
  const isMidnight = index === 0
  const isNoon = index === 3
  const isReversedText = index === 2 || index === 4
  const shift = isReversedText
    ? PERIOD_NAME_SHIFT + PERIOD_NAME_HEIGHT / 100
    : PERIOD_NAME_SHIFT
  const pathData = isMidnight
    ? midnightPath
    : isNoon
      ? noonPath
      : createPeriodArcPath(period, shift, isReversedText)
  return {
    text: isMidnight ? text.split(` `) : [text.replace(`  `, ` `)],
    id: period.id,
    pathId: `period-path-${period.id}`,
    textId: `period-name-${period.id}`,
    pathData,
  }
})

export const nightSky = (() => {
  const SHIFT = 0.75
  const [startX, startY] = getCoordinates(19 / 24).map(v => v * SHIFT)
  const [endX, endY] = getCoordinates(6 / 24).map(v => v * SHIFT)
  return `
    M ${startX} ${startY}
    A ${SVG_SIZE * 2} ${SVG_SIZE * 2} 0 0 0 ${endX} ${endY}
    A ${SVG_SIZE * SHIFT} ${SVG_SIZE * SHIFT} 0 0 0 ${startX} ${startY}
  `
})()

const I18N_HOUR_SHIFT = 0.9
export const internationalHoursArcs = thaiPeriods
  .map(function periodToMarkers(period) {
    return Array.from({ length: period.end - period.start }).map(
      (value, index) => {
        const hour = index + period.start
        return {
          hour,
          pathData: createPeriodArcPath(
            {
              start: hour,
              end: hour + 1,
            },
            I18N_HOUR_SHIFT
          ),
          id: `international-hour-arc-${hour}`,
          name: period.id,
        }
      }
    )
  })
  .reduce(flattenArray, [])
