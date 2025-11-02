
import { useState } from "react"
import { searchFlights } from "@services/api"
import { useNavigate } from "react-router-dom"
import ClockWidget from "@components/ClockWidget"

export default function SearchFlights(){
  const [tripType, setTripType] = useState<"round"|"oneway"|"multi">("round")
  const [from, setFrom] = useState("Hà Nội (HAN)")
  const [to, setTo] = useState("TP. Hồ Chí Minh (SGN)")
  const [departDate, setDepartDate] = useState("2024-12-25")
  const [returnDate, setReturnDate] = useState("2025-01-05")
  const [adults, setAdults] = useState(1)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSearch = async () => {
    setLoading(true)
    try{
      const data = await searchFlights({ from, to, departDate, returnDate, adults, tripType })
      setResults(data.flights || [])
    }catch{
      // fallback mock result to allow FE testing without BE
      setResults([
        { id: "VJ123", carrier:"Vietjet Air", depart:"SGN", arrive:"HAN", departTime:"20:30", arriveTime:"22:35", duration:"2h05m", price: 1299000 }
      ])
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[600px] flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center"
           style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(16,25,34,1)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBk9hovFuVGWIVOuM21DpWYmkvbbWZZbDHG55T_l7KdyXfiuXJA8Zf0L7jyMo_mP8VGNBbB7b1CfdOP6osD8eBoayvljB_I-rcKxpShcWnuZGwhbvTrDhA8BbFoDg2nrskxKvDW5oJN4Ic7DT9Z5ELcOSUI_CUJ-6xYs8dtK-hyqN1zOtr_PnFkZTaoaDZLO4uXU3DHy-oOW8kRb9zpYfyZfq2QVNmMvflTIa3yjjm0f1QNL_gu2LPpuGeeFlaLwlkcwxFWvKmmlZU5')" }}/>
      <div className="w-full max-w-5xl text-white">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-2">Chắp cánh cho hành trình của bạn</h1>
        <p className="text-white/80 text-center mb-6">Tìm kiếm và đặt vé máy bay giá tốt nhất.</p>
        <div className="w-full rounded-xl bg-white/10 p-4 backdrop-blur">
          <div className="flex w-full max-w-md mx-auto items-center rounded-lg bg-black/30 p-1 mb-3">
            {(["round","oneway","multi"] as const).map(t => (
              <label key={t} className={`flex-1 text-center h-10 flex items-center justify-center rounded-md cursor-pointer ${tripType===t ? "bg-primary" : "text-white/70"}`}>
                <input className="hidden" type="radio" name="trip" value={t} checked={tripType===t} onChange={()=>setTripType(t)} />
                <span className="capitalize">{t==="round"?"Khứ hồi":t==="oneway"?"Một chiều":"Nhiều chặng"}</span>
              </label>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-2">
            <input className="lg:col-span-4 h-14 rounded-lg bg-black/30 px-4 outline-none" placeholder="Điểm đi" value={from} onChange={e=>setFrom(e.target.value)} />
            <input className="lg:col-span-4 h-14 rounded-lg bg-black/30 px-4 outline-none" placeholder="Điểm đến" value={to} onChange={e=>setTo(e.target.value)} />
            <button onClick={onSearch} className="lg:col-span-2 h-14 rounded-lg bg-primary font-bold">Tìm kiếm</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
            <input type="date" className="h-14 rounded-lg bg-black/30 px-4 outline-none" value={departDate} onChange={e=>setDepartDate(e.target.value)} />
            <input type="date" className="h-14 rounded-lg bg-black/30 px-4 outline-none" value={returnDate} onChange={e=>setReturnDate(e.target.value)} disabled={tripType!=="round"} />
            <select className="h-14 rounded-lg bg-black/30 px-4 outline-none" value={adults} onChange={e=>setAdults(parseInt(e.target.value))}>
              {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n} Người lớn</option>)}
            </select>
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {loading && <p className="text-center">Đang tìm kiếm...</p>}
          {!loading && results.map(f => (
            <div key={f.id} className="bg-white/10 backdrop-blur rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold">{f.carrier} • {f.id}</p>
                <p className="text-white/80">{f.depart} {f.departTime} → {f.arrive} {f.arriveTime} • {f.duration}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold">{(f.price/1000).toFixed(0)}k</p>
                <button onClick={()=>nav("/checkout",{state:{flight:f}})} className="h-10 px-4 rounded-lg bg-primary">Chọn</button>
              </div>
            </div>
          ))}
        </div>
       <ClockWidget showSeconds={true} />
      </div>
    </div>
  )
}
