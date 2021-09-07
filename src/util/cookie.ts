export function getCookie(key: string): string {
  const cookie = document.cookie.split("; ")
  try {
    for (let i = 0; i < cookie.length; i++) {
      const currentCookie = cookie[i].split("=")
      if (currentCookie[0] === key) {
        return currentCookie[1]
      }
    }
    return ""
  } catch (e) {
    console.log("have error in get cookie of " + key)
    return ""
  }
}
export function setCookie(key: string, value: string, exdays: number): boolean {
  try {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    const expires = "expires=" + d.toUTCString()
    document.cookie = key + "=" + value + "; " + expires
    return true
  } catch (e) {
    console.log("there have a error in setCookie of " + key)
    return false
  }
}
export function deleteCookie(key: string): boolean {
  try {
    setCookie(key, "", -1)
    return true
  } catch (e) {
    console.log("there have a error in deleteCookie of " + key)
    return false
  }
}
