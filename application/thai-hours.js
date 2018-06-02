import { DateTime } from 'luxon'

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

export function toThaiTime(luxonDate) {
  const isLuxonDateTime = luxonDate instanceof DateTime
  if (!isLuxonDateTime) {
    return {
      period: ``,
      rtgs: ``,
      thai: ``,
      hour: false,
    }
  }
  const { hour } = luxonDate
  if (hour < 1) {
    return {
      period: `midnight`,
      rtgs: `tiang kheun`,
      thai: `เทียงคืน`,
      hour: false,
    }
  }
  if (hour < 6) {
    const thaiHour = hour
    const thaiNumber = THAI_NUMBERS[thaiHour]
    return {
      period: `late night`,
      rtgs: `ti ${thaiNumber.rtgs}`,
      thai: `ตี${thaiNumber.th}`,
      hour: hour,
    }
  }

  if (hour < 12) {
    const thaiHour = hour
    const thaiNumber = THAI_NUMBERS[thaiHour]
    return {
      period: `morning`,
      rtgs: `${thaiNumber.rtgs} mong chao`,
      thai: `${thaiNumber.th}โมงเช้า`,
      hour: hour,
    }
  }
  if (hour < 13) {
    return {
      period: `noon`,
      rtgs: `tiang`,
      thai: `เทียง`,
      hour: false,
    }
  }
  if (hour < 17) {
    const thaiHour = hour === 13 ? false : hour - 12
    const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
    return {
      period: `afternoon`,
      rtgs: `bai${thaiHour ? ` ${thaiNumber.rtgs} (${thaiHour}) ` : ``}mong`,
      thai: `ปาย${thaiHour ? thaiNumber.th : ``}โมง`,
      hour: thaiHour,
    }
  }
  if (hour < 19) {
    const thaiHour = hour - 12
    const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
    return {
      period: `sunset`,
      rtgs: `${thaiNumber.rtgs} (${thaiHour}) mong yen`,
      thai: `${thaiNumber.th}โมงเย็น`,
      hour: thaiHour,
    }
  }
  if (hour < 24) {
    const thaiHour = hour - 18
    const thaiNumber = thaiHour ? THAI_NUMBERS[thaiHour] : false
    return {
      period: `night`,
      rtgs: `${thaiNumber.rtgs}  (${thaiHour}) toom`,
      thai: `${thaiNumber.th}ทุ่ม`,
      hour: thaiHour,
    }
  }
}