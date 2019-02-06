import { DateTime } from 'luxon'

import { shallowClone } from '~/utils/clone'
import THAI_NUMBERS from '~/utils/thai-numbers'

/* spell-checker: disable */

const basePeriod = {
  _numbers: THAI_NUMBERS,
  name: `period`,
  start: 0,
  end: 0,
  rtgs: ``,
  thai: ``,
  thaiHourShift: 0,
  hideFirstThaiHour: false,
  hour: false,
  rtgsPadStart: false,
  rtgsPadEnd: false,
  get id() {
    return this.name.replace(` `, `-`)
  },
  get isFirstHourInPeriod() {
    const { thaiHour } = this
    if (!Number.isFinite(thaiHour)) return false
    if (this.thaiHourShift === 0) return thaiHour === this.start
    return thaiHour === 1
  },
  get thaiHour() {
    if (!Number.isFinite(this.hour)) return false
    if (!this.thaiHourShift) return this.hour
    return this.hour - this.thaiHourShift
  },
  get thaiHourString() {
    const { thaiHour, isFirstHourInPeriod } = this
    if (!Number.isFinite(thaiHour)) return ``
    if (isFirstHourInPeriod && this.hideFirstThaiHour) return ``
    return this._numbers[thaiHour].th
  },
  get thaiHourRtgs() {
    const { thaiHour, isFirstHourInPeriod } = this
    const displayHour = !Number.isFinite(thaiHour)
      ? ``
      : isFirstHourInPeriod && this.hideFirstThaiHour
      ? ``
      : `${this._numbers[thaiHour].rtgs} (${thaiHour})`
    const padStart = this.rtgsPadStart ? ` ` : ``
    const padEnd = this.rtgsPadEnd ? ` ` : ``
    return `${padStart}${displayHour}${padEnd}`.replace(`  `, ` `)
  },
  isHourInPeriod(hour) {
    return hour >= this.start && hour < this.end
  },
}

export const thaiPeriods = [
  {
    name: `midnight`,
    start: 0,
    end: 1,
    rtgs() {
      return `thiiang kheuun`
    },
    thai() {
      return `เทียงคืน`
    },
  },
  {
    name: `late night`,
    start: 1,
    end: 6,
    thaiHourShift: 0,
    rtgsPadStart: true,
    rtgs() {
      return `dtee${this.thaiHourRtgs}`
    },
    thai() {
      return `ตี${this.thaiHourString}`
    },
  },
  {
    name: `morning`,
    start: 6,
    end: 12,
    thaiHourShift: 0,
    rtgsPadEnd: true,
    rtgs() {
      return `${this.thaiHourRtgs}mohng chaao`
    },
    thai() {
      return `${this.thaiHourString}โมงเช้า`
    },
  },
  {
    name: `noon`,
    start: 12,
    end: 13,
    rtgs() {
      return `thiiang`
    },
    thai() {
      return `เทียง`
    },
    thaiHourShift: 0,
  },
  {
    name: `afternoon`,
    start: 13,
    end: 16,
    thaiHourShift: 12,
    hideFirstThaiHour: true,
    rtgsPadStart: true,
    rtgsPadEnd: true,
    rtgs() {
      return `baai${this.thaiHourRtgs}mohng`
    },
    thai() {
      return `ปาย${this.thaiHourString}โมง`
    },
  },
  {
    name: `sunset`,
    start: 16,
    end: 19,
    thaiHourShift: 12,
    rtgsPadEnd: true,
    rtgs() {
      return `${this.thaiHourRtgs}mohng yen`
    },
    thai() {
      return `${this.thaiHourString}โมงเย็น`
    },
  },
  {
    name: `night`,
    start: 19,
    end: 24,
    thaiHourShift: 18,
    rtgsPadEnd: true,
    rtgs() {
      return `${this.thaiHourRtgs}thoom`
    },
    thai() {
      return `${this.thaiHourString}ทุ่ม`
    },
  },
].map(period => {
  return Object.create(basePeriod, Object.getOwnPropertyDescriptors(period))
})

export function getThaiTime(luxonDate) {
  const isLuxonDateTime = luxonDate instanceof DateTime
  if (!isLuxonDateTime) {
    return {
      name: ``,
      rtgs: ``,
      thai: ``,
      hour: false,
    }
  }
  const { hour } = luxonDate
  const period = thaiPeriods.find(p => p.isHourInPeriod(hour))
  const updatedPeriod = shallowClone(period)
  updatedPeriod.hour = hour
  return updatedPeriod
}
