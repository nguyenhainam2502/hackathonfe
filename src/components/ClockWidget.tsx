import { useEffect, useState } from "react"

function formatDateTime(d: Date) {
  // theo thời gian máy (local), 24h, tiếng Việt
  const date = d.toLocaleDateString("vi-VN", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" })
  const time = d.toLocaleTimeString("vi-VN", { hour12: false }) // 24h
  return { date, time }
}

export default function ClockWidget({ showSeconds = true }: { showSeconds?: boolean }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    const id = setInterval(tick, showSeconds ? 1000 : 60000) // 1s hoặc 1p
    return () => clearInterval(id)
  }, [showSeconds])

  const { date, time } = formatDateTime(now)

  return (
    <div
      className="fixed bottom-4 right-4 z-50 select-none
                 rounded-xl border border-white/10 bg-black/40 backdrop-blur
                 px-4 py-3 shadow-lg text-white"
      aria-label="Đồng hồ hệ thống"
    >
      <div className="text-xs text-white/70">{date}</div>
      <div className="text-2xl font-bold tracking-wider">{time}</div>
    </div>
  )
}
