import Encryption from "@/utilies/encryption"
import moment from "moment"

export const numberWithCommas = (value: any) => {
  value = value.toString()
  var pattern = /(-?\d+)(\d{3})/
  while (pattern.test(value)) value = value.replace(pattern, "$1,$2")
  return value
}

export const formatDate = (date: any) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("-")
}

export const diffDays = (startDate: any, endDate?: any) => {
  const dt1 = new Date(startDate)
  const dt2 = new Date(endDate || formatDate(new Date()) + "T00:00:00Z")
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  )
}

export const getLocalCacheData = ({ key, async = true }: { key: string; async?: boolean }) => {
  const data = localStorage.getItem(key)
  if (!data) return data
  const json = JSON.parse(Encryption.decrypt(key, data))
  if(async) return Promise.all(JSON.parse(json));
  return JSON.parse(json);
}
