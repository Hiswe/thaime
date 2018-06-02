import { DateTime } from 'luxon'

// monday 1st january 2018
const referenceDate = DateTime.local(2018, 1, 1, 12, 0)
const referenceDateThai = referenceDate.setLocale(`th`)

function getDay(dayShift = 0) {
  const date = referenceDate.plus({ days: dayShift })
  return {
    en: date.toLocaleString({ weekday: `long` }),
    th: date.setLocale(`th`).toLocaleString({ weekday: `long` }),
  }
}

function getMonth(monthShift = 0) {
  const date = referenceDate.plus({ months: monthShift })
  return {
    en: date.toLocaleString({ month: `long` }),
    th: date.setLocale(`th`).toLocaleString({ month: `long` }),
  }
}

export const days = [
  {
    rtgs: `wan jan`,
  },
  {
    rtgs: `wan angkhaan`,
  },
  {
    rtgs: `	wan phoot`,
  },
  {
    rtgs: `wan phareuhat`,
  },
  {
    rtgs: `wan sook`,
  },
  {
    rtgs: `wan sao`,
  },
  {
    rtgs: `	wan aathit`,
  },
].map((day, index) => ({
  ...getDay(index),
  ...day,
}))

export const months = [
  {
    rtgs: `mohkgaraakhohm`,
  },
  {
    rtgs: `goomphaaphan`,
  },
  {
    rtgs: `meenaakhohm`,
  },
  {
    rtgs: `maehsaayohn`,
  },
  {
    rtgs: `phreutsaphaakhohm`,
  },
  {
    rtgs: `mithoonaayohn`,
  },
  {
    rtgs: `garagadaakhohm`,
  },
  {
    rtgs: `singhaakhohm`,
  },
  {
    rtgs: `ganyaayohn`,
  },
  {
    rtgs: `dtoolaakhohm`,
  },
  {
    rtgs: `phreutsajigaayohn`,
  },
  {
    rtgs: `thanwaakhohm`,
  },
].map((month, index) => ({
  ...getMonth(index),
  ...month,
}))
