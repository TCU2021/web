export function getTime(): string | number {
  const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
  const date = new Date()
  return (
    "当前时间： " +
    date.getFullYear() +
    "年" +
    (date.getMonth() + 1) +
    "月" +
    date.getDate() +
    "日 " +
    week[date.getDay()] +
    " " +
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":" +
    (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
  )
}
