
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { createBooking } from "@services/api"

export default function Checkout(){
  const { state } = useLocation() as { state?: any }
  const flight = state?.flight || { id:"VJ123", carrier:"Vietjet Air", depart:"SGN", arrive:"HAN", departTime:"20:30", arriveTime:"22:35", duration:"2h05m", price:1299000 }
  const [form, setForm] = useState({lastName:"Nguyen", firstName:"A", dob:"1990-05-15", gender:"Nam", email:"a@example.com", phone:"+84 987 654 321"})
  const [payMethod, setPayMethod] = useState<"card"|"wallet"|"bank">("card")
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSubmit = async () => {
    setLoading(true)
    try{
      const payload = { flightId: flight.id, passenger: form, payMethod }
      const data = await createBooking(payload)
      nav(`/ticket/${data.pnr || "Y29DEF"}`)
    }catch{
      nav("/ticket/Y29DEF")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4">Thông tin hành khách</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span>Họ</span>
                <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Tên</span>
                <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Ngày sinh</span>
                <input type="date" className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Giới tính</span>
                <select className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
              </label>
              <label className="flex flex-col gap-2">
                <span>Email</span>
                <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Số điện thoại</span>
                <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              </label>
            </div>
          </section>

          <section className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-4">Thanh toán</h2>
            <div className="flex gap-3 flex-wrap">
              {["card","wallet","bank"].map(m => (
                <button key={m} onClick={()=>setPayMethod(m as any)} className={`h-12 px-4 rounded-lg border ${payMethod===m? "bg-primary/20 text-primary border-primary" : ""}`}>
                  {m=="card"?"Thẻ Tín dụng/Ghi nợ":m=="wallet"?"Ví điện tử":"Chuyển khoản"}
                </button>
              ))}
            </div>
            <div className="grid gap-4 mt-4">
              {payMethod==="card" && (
                <>
                  <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" placeholder="Số thẻ"/>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" placeholder="MM/YY"/>
                    <input className="h-14 rounded-lg border px-3 bg-background-light dark:bg-gray-800" placeholder="CVV"/>
                  </div>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input id="terms" type="checkbox" className="h-5 w-5 rounded border" />
              <label htmlFor="terms" className="text-sm">Tôi đồng ý với điều khoản.</label>
            </div>
          </section>

          <div className="flex justify-between">
            <button onClick={()=>history.back()} className="h-12 px-6 rounded-lg bg-gray-200 dark:bg-gray-800">Quay lại</button>
            <button disabled={loading} onClick={onSubmit} className="h-12 px-6 rounded-lg bg-primary text-white font-bold">
              {loading ? "Đang xử lý..." : "Hoàn tất thanh toán"}
            </button>
          </div>
        </div>

        <aside className="lg:sticky top-24 h-fit space-y-4">
          <div className="bg-white dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-3">Tóm tắt chuyến bay</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{flight.carrier} • {flight.id}</p>
                <p className="text-sm text-gray-500">{flight.departTime} {flight.depart} → {flight.arriveTime} {flight.arrive}</p>
                <p className="text-sm text-gray-500">{flight.duration} • Bay thẳng</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{(flight.price/1000).toFixed(0)}k</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
