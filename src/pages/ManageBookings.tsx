
import { useState } from "react"
import { getBookingByPNR } from "@services/api"
import { useNavigate } from "react-router-dom"

export default function ManageBookings(){
  const [pnr, setPnr] = useState("W8X2B9")
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const fetchPNR = async () => {
    setLoading(true)
    try{
      const data = await getBookingByPNR(pnr)
      setResult(data)
    }catch{
      // mock result
      setResult({ pnr, passenger:"Nguyễn Văn An", route:"SGN → HAN", date:"2024-12-25", status:"CONFIRMED" })
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-10 lg:px-20 py-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black mb-6">Tra cứu đặt chỗ</h1>
      <div className="bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex gap-3 items-end">
          <label className="flex-1">
            <p className="text-sm font-medium mb-2">Mã đặt chỗ (PNR)</p>
            <input className="h-12 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark px-3"
                   value={pnr} onChange={e=>setPnr(e.target.value.toUpperCase())} placeholder="Nhập mã đặt chỗ"/>
          </label>
          <button onClick={fetchPNR} className="h-12 px-5 rounded-lg bg-primary text-white font-bold">Tìm kiếm</button>
        </div>
      </div>

      {loading && <p className="mt-6">Đang tải...</p>}
      {!loading && result && (
        <div className="mt-6 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">PNR: {result.pnr}</p>
              <p>Hành khách: {result.passenger}</p>
              <p>Hành trình: {result.route}</p>
              <p>Ngày bay: {result.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-10 w-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center" title="Xem vé" onClick={()=>nav(`/ticket/${result.pnr}`)}>
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button className="h-10 w-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center" title="In">
                <span className="material-symbols-outlined">print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
