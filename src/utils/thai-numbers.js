/* spell-checker: disable */

const DECADE_SINGLE_UNIT = {
  th: `เอ็ด`,
  rtgs: `et`,
}

const THAI_NUMBERS = {
  0: {
    th: `ศูนย์`,
    rtgs: `	suun`,
  },
  1: {
    th: `หนึ่ง`,
    rtgs: `neung`,
  },
  2: {
    th: `สอง`,
    rtgs: `saawng`,
  },
  3: {
    th: `สาม`,
    rtgs: `saam`,
  },
  4: {
    th: `สี่`,
    rtgs: `see`,
  },
  5: {
    th: `ห้า`,
    rtgs: `haa`,
  },
  6: {
    th: `หก`,
    rtgs: `hohk`,
  },
  7: {
    th: `เจ็ด`,
    rtgs: `jet`,
  },
  8: {
    th: `แปด`,
    rtgs: `bpaaet`,
  },
  9: {
    th: `เก้า`,
    rtgs: `gaao`,
  },
  10: {
    th: `สิบ`,
    rtgs: `sip`,
  },
}

const THAI_DECADES = {
  1: {
    ...THAI_NUMBERS[10],
  },
  2: {
    th: `ยี่${THAI_NUMBERS[10].th}`,
    rtgs: `yee ${THAI_NUMBERS[10].rtgs}`,
  },
  3: {
    th: `${THAI_NUMBERS[3].th}${THAI_NUMBERS[10].th}`,
    rtgs: `${THAI_NUMBERS[3].rtgs}${THAI_NUMBERS[10].rtgs}`,
  },
}

Array.from({ length: 22 }).forEach((v, index) => {
  const number = index + 11
  const decade = THAI_DECADES[Math.floor(number / 10)]
  const unitValue = number % 10
  const unit =
    unitValue === 0
      ? { th: ``, rtgs: `` }
      : unitValue === 1
        ? DECADE_SINGLE_UNIT
        : THAI_NUMBERS[unitValue]
  THAI_NUMBERS[number] = {
    th: `${decade.th}${unit.th}`,
    rtgs: `${decade.rtgs} ${unit.rtgs}`,
  }
})

export default THAI_NUMBERS
