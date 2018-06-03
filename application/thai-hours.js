import { DateTime } from 'luxon'
import clone from './clone'
import { shallowClone } from './clone'

/* spell-checker: disable */

const THAI_NUMBERS = {
  0: {
    th: `ศูนย์`,
    rtgs: `soon`,
  },
  1: {
    th: `หนึ่ง`,
    rtgs: `nung`,
  },
  2: {
    th: `สอง`,
    rtgs: `song`,
  },
  3: {
    th: `สาม`,
    rtgs: `sam`,
  },
  4: {
    th: `สี่`,
    rtgs: `si`,
  },
  5: {
    th: `ห้า`,
    rtgs: `ha`,
  },
  6: {
    th: `หก`,
    rtgs: `hock`,
  },
  7: {
    th: `เจ็ด`,
    rtgs: `jet`,
  },
  8: {
    th: `แปด`,
    rtgs: `pet`,
  },
  9: {
    th: `เก้า`,
    rtgs: `kao`,
  },
  10: {
    th: `สิบ`,
    rtgs: `sip`,
  },
  11: {
    th: `สิบเอ็ด`,
    rtgs: `sip et`,
  },
}

const basePeriod = {
  _numbers: THAI_NUMBERS,
  name: `period`,
  start: 0,
  end: 0,
  rtgs: ``,
  thai: ``,
  thaiPeriodHourResetAt: 0,
  hideFirstThaiHour: false,
  hour: false,
  rtgsPadStart: false,
  rtgsPadEnd: false,
  isFirstHourInPeriod() {
    const thaiHour = this.getThaiHourCount()
    if (!Number.isFinite(thaiHour)) return false
    if (this.thaiPeriodHourResetAt === 0) return thaiHour === this.start
    return thaiHour === 0
  },
  isHourInPeriod(hour) {
    return hour >= this.start && hour < this.end
  },
  getThaiHourCount() {
    if (!Number.isFinite(this.hour)) return false
    if (!this.thaiPeriodHourResetAt) return this.hour
    return this.hour - this.thaiPeriodHourResetAt
  },
  hourToThaiStringNumber() {
    const thaiHour = this.getThaiHourCount()
    if (!Number.isFinite(thaiHour)) return ``
    const isFirstHourInPeriod = this.isFirstHourInPeriod()
    if (isFirstHourInPeriod && this.hideFirstThaiHour) return ``
    return this._numbers[thaiHour].th
  },
  hourToRtgsNumber() {
    const thaiHour = this.getThaiHourCount()
    const isFirstHourInPeriod = this.isFirstHourInPeriod()
    const displayHour = !Number.isFinite(thaiHour)
      ? ``
      : isFirstHourInPeriod && this.hideFirstThaiHour
        ? ``
        : `${this._numbers[thaiHour].rtgs} (${thaiHour})`
    const padStart = this.rtgsPadStart ? ` ` : ``
    const padEnd = this.rtgsPadEnd ? ` ` : ``
    return `${padStart}${displayHour}${padEnd}`
  },
}

// function isHourInPeriod(hour) {
//   return hour >= this.start && hour < this.end
// }

export const thaiPeriods = [
  {
    name: `midnight`,
    start: 0,
    end: 1,
    rtgs: `tiang kheun`,
    thai: `เทียงคืน`,
  },
  {
    name: `late night`,
    start: 1,
    end: 6,
    thaiPeriodHourResetAt: 0,
    rtgsPadStart: true,
    get rtgs() {
      const rtgsHour = this.hourToRtgsNumber()
      return `ti${rtgsHour}`
    },
    get thai() {
      const thaiHour = this.hourToThaiStringNumber()
      return `ตี${thaiHour}`
    },
  },
  {
    name: `morning`,
    start: 6,
    end: 12,
    thaiPeriodHourReset: 0,
    rtgsPadEnd: true,
    get rtgs() {
      const rtgsHour = this.hourToRtgsNumber()
      return `${rtgsHour}mong chao`
    },
    get thai() {
      const thaiHour = this.hourToThaiStringNumber()
      return `${thaiHour}โมงเช้า`
    },
  },
  {
    name: `noon`,
    start: 12,
    end: 13,
    rtgs: `tiang`,
    thai: `เทียง`,
    thaiPeriodHourReset: 0,
  },
  {
    name: `afternoon`,
    start: 13,
    end: 17,
    thaiPeriodHourReset: 12,
    hideFirstThaiHour: true,
    rtgsPadStart: true,
    rtgsPadEnd: true,
    get rtgs() {
      const rtgsHour = this.hourToRtgsNumber()
      return `bai${rtgsHour}mong`
    },
    get thai() {
      const thaiHour = this.hourToThaiStringNumber()
      return `ปาย${thaiHour}โมง`
    },
  },
  {
    name: `sunset`,
    start: 17,
    end: 19,
    thaiPeriodHourReset: 12,
    rtgsPadEnd: true,
    get rtgs() {
      const rtgsHour = this.hourToRtgsNumber()
      return `${rtgsHour}mong yen`
    },
    get thai() {
      const thaiHour = this.hourToThaiStringNumber()
      return `${thaiHour}โมงเย็น`
    },
  },
  {
    name: `night`,
    start: 19,
    end: 24,
    thaiPeriodHourReset: 18,
    rtgsPadEnd: true,
    get rtgs() {
      const rtgsHour = this.hourToRtgsNumber()
      return `${rtgsHour}toom`
    },
    get thai() {
      const thaiHour = this.hourToThaiStringNumber()
      return `${thaiHour}ทุ่ม`
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
  // console.log(hour)
  // console.log(period)
  const updatedPeriod = shallowClone(period)
  updatedPeriod.hour = hour
  // console.log(hour)
  // console.log(updatedPeriod)
  return updatedPeriod
}
