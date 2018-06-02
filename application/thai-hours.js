import { DateTime } from 'luxon'
import clone from './clone'

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

function hourToThaiStringNumber(hour) {
  if (!Number.isFinite(hour)) return ``
  return THAI_NUMBERS[hour].th
}

function hourToRtgsNumber(hour, { padStart = false, padEnd = false }) {
  const thaiHour = Number.isFinite(hour)
    ? `${THAI_NUMBERS[hour].rtgs} (${hour})`
    : ``
  padStart = padStart ? ` ` : ``
  padStart = padEnd ? ` ` : ``
  return `${padStart}${thaiHour}${padStart}`
}

function isHourInPeriod(hour) {
  return hour >= this.start && hour < this.end
}

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
    get thaiHourCount() {
      if (!Number.isFinite(this.hour)) return false
      return this.hour
    },
    get rtgs() {
      const rtgsHour = hourToRtgsNumber(this.thaiHourCount, { padStart: true })
      return `ti${rtgsHour}`
    },
    get thai() {
      const thaiHour = hourToThaiStringNumber(this.thaiHourCount)
      return `ตี${hourToThaiStringNumber(this.hour)}`
    },
  },
  {
    name: `morning`,
    start: 6,
    end: 12,
    get thaiHourCount() {
      if (!Number.isFinite(this.hour)) return false
      return this.hour
    },
    get rtgs() {
      const rtgsHour = hourToRtgsNumber(this.thaiHourCount, { padEnd: true })
      return `${rtgsHour}mong chao`
    },
    get thai() {
      const thaiHour = hourToThaiStringNumber(this.thaiHourCount)
      return `${thaiHour}โมงเช้า`
    },
  },
  {
    name: `noon`,
    start: 12,
    end: 13,
    rtgs: `tiang`,
    thai: `เทียง`,
  },
  {
    name: `afternoon`,
    start: 13,
    end: 17,
    get thaiHourCount() {
      if (!Number.isFinite(this.hour)) return false
      return this.hour - 12
    },
    get isFirstHour() {
      return Number.isFinite(this.thaiHourCount) && this.thaiHourCount === 1
    },
    get rtgs() {
      const rtgsHour = hourToRtgsNumber(
        this.isFirstHour ? false : this.thaiHourCount,
        {
          padStart: true,
          padEnd: true,
        }
      )
      return `bai${rtgsHour}mong`
    },
    get thai() {
      const thaiHour = hourToThaiStringNumber(this.thaiHourCount)
      return `ปาย${thaiHour}โมง`
    },
  },
  {
    name: `sunset`,
    start: 17,
    end: 19,
    get thaiHourCount() {
      if (!Number.isFinite(this.hour)) return false
      return this.hour - 12
    },
    get rtgs() {
      const rtgsHour = hourToRtgsNumber(this.thaiHourCount, {
        padEnd: true,
      })
      return `${rtgsHour}mong yen`
    },
    get thai() {
      const thaiHour = hourToThaiStringNumber(this.thaiHourCount)
      return `${thaiHour}โมงเย็น`
    },
  },
  {
    name: `night`,
    start: 19,
    end: 24,
    get thaiHourCount() {
      console.log(this.hour)
      if (!Number.isFinite(this.hour)) return false
      return this.hour - 18
    },
    get rtgs() {
      const rtgsHour = hourToRtgsNumber(this.thaiHourCount, {
        padEnd: true,
      })
      return `${rtgsHour}toom`
    },
    get thai() {
      const thaiHour = hourToThaiStringNumber(this.thaiHourCount)
      return `${thaiHour}ทุ่ม`
    },
  },
].map(period => {
  period.isHourInPeriod = isHourInPeriod.bind(period)
  return period
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
  return clone(period, { hour })
}

// export function toThaiTime(luxonDate) {
//   const isLuxonDateTime = luxonDate instanceof DateTime
//   if (!isLuxonDateTime) {
//     return {
//       period: ``,
//       rtgs: ``,
//       thai: ``,
//       hour: false,
//     }
//   }
//   const { hour } = luxonDate
//   if (hour < 1) {
//     return {
//       period: `midnight`,
//       rtgs: `tiang kheun`,
//       thai: `เทียงคืน`,
//       hour: false,
//     }
//   }
//   if (hour < 6) {
//     const thaiHour = hour
//     const thaiNumber = THAI_NUMBERS[thaiHour]
//     return {
//       period: `late night`,
//       rtgs: `ti ${thaiNumber.rtgs}`,
//       thai: `ตี${thaiNumber.th}`,
//       hour: hour,
//     }
//   }

//   if (hour < 12) {
//     const thaiHour = hour
//     const thaiNumber = THAI_NUMBERS[thaiHour]
//     return {
//       period: `morning`,
//       rtgs: `${thaiNumber.rtgs} mong chao`,
//       thai: `${thaiNumber.th}โมงเช้า`,
//       hour: hour,
//     }
//   }
//   if (hour < 13) {
//     return {
//       period: `noon`,
//       rtgs: `tiang`,
//       thai: `เทียง`,
//       hour: false,
//     }
//   }
//   if (hour < 17) {
//     const thaiHour = hour === 13 ? false : hour - 12
//     const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
//     return {
//       period: `afternoon`,
//       rtgs: `bai${thaiHour ? ` ${thaiNumber.rtgs} (${thaiHour}) ` : ``}mong`,
//       thai: `ปาย${thaiHour ? thaiNumber.th : ``}โมง`,
//       hour: thaiHour,
//     }
//   }
//   if (hour < 19) {
//     const thaiHour = hour - 12
//     const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
//     return {
//       period: `sunset`,
//       rtgs: `${thaiNumber.rtgs} (${thaiHour}) mong yen`,
//       thai: `${thaiNumber.th}โมงเย็น`,
//       hour: thaiHour,
//     }
//   }
//   if (hour < 24) {
//     const thaiHour = hour - 18
//     const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
//     return {
//       period: `night`,
//       rtgs: `${thaiNumber.rtgs}  (${thaiHour}) toom`,
//       thai: `${thaiNumber.th}ทุ่ม`,
//       hour: thaiHour,
//     }
//   }
// }
