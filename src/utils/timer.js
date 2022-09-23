import { useEffect, useState } from "react"

import { useIndexDb } from "../data/Indexed/IndexedContext"

export default function Timer(ms: number) {
  const [time, setTime] = useState(ms)
  const { logout } = useIndexDb()
  useEffect(() => {
    let interval

    const countDownUntilZero = () => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          window.location = `/`
          logout()
          clearInterval(interval)
        }
        return prevTime - 1000
      })
    }

    interval = setInterval(countDownUntilZero, 1000)
    return () => clearInterval(interval)
  }, [])
  function secondsToHms(d) {
    // https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
    const h = Math.floor(d / 3600)
    const m = Math.floor((d % 3600) / 60)
    const s = Math.floor((d % 3600) % 60)

    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : ""
    const mDisplay = m > 0 ? `${m}` : ""
    const sDisplay = s > 0 ? `${s}` : ""
    return `${mDisplay}${m !== 0 ? `:` : ``}${sDisplay}`
  }

  return <>{secondsToHms(time / 1000)}</>
}

// If you have googling skill is best you are the best developer
// https://medium.com/@bsalwiczek/building-timer-in-react-its-not-as-simple-as-you-may-think-80e5f2648f9b
