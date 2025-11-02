// src/pages/Checkout.tsx
import { useLocation, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { createBooking } from "@services/api"

type Flight = {
  id: string
  carrier: string
  cabin?: string
  depart: string
  arrive: string
  departTime: string
  arriveTime: string
  duration: string
  price: number
}

function VND(n: number) {
  return n.toLocaleString("vi-VN") + "đ"
}

export default function Checkout(){
  const { state } = useLocation() as { state?: { flight?: Flight } }
  const nav = useNavigate()

  // flight mock nếu chưa có BE
  const flight: Flight = state?.flight || {
    id:"VJ123", carrier:"Vietjet Air", cabin:"Phổ thông",
    depart:"SGN", arrive:"HAN",
    departTime:"20:30", arriveTime:"22:35",
    duration:"2h05m", price:1500000
  }

  // form hành khách
  const [form, setForm] = useState({
    lastName:"Nguyen", firstName:"A", dob:"1990-05-15",
    gender:"Nam", email:"nguyenvana@email.com", phone:"+84 987 654 321",
  })

  // dịch vụ bổ sung
  const [seatOpen, setSeatOpen] = useState(true)
  const [baggageOpen, setBaggageOpen] = useState(true)
  const [seatSelected, setSeatSelected] = useState(true)   // giả lập đã chọn ghế 24A
  const [seatCode, setSeatCode] = useState("24A")
  const [baggageKg, setBaggageKg] = useState<0|20>(20)     // 0 hoặc 20kg

  // thanh toán
  const [payMethod, setPayMethod] = useState<"card"|"wallet"|"bank">("card")
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)

  // bảng phí (giống ảnh demo)
  const priceFare   = useMemo(()=> flight.price, [flight.price])                 // 1.500.000
  const priceTax    = 350000
  const priceSeat   = seatSelected ? 90000 : 0
  const priceBagg20 = baggageKg === 20 ? 250000 : 0
  const priceTotal  = priceFare + priceTax + priceSeat + priceBagg20

  const onSubmit = async () => {
    if(!agree) return alert("Vui lòng đồng ý điều khoản.")
    setLoading(true)
    try{
      const payload = {
        flightId: flight.id,
        passenger: form,
        addons: { seat: seatSelected ? seatCode : null, baggageKg },
        payMethod
      }
      const data = await createBooking(payload)
      nav(`/ticket/${data?.pnr || "Y29DEF"}`)
    }catch{
      nav("/ticket/Y29DEF")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        {/* cột trái */}
        <div className="lg:col-span-2 space-y-6">

          {/* tiêu đề + bước */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">Đặt vé máy bay</h1>
            <p className="text-sm text-white/70 mt-2">Bước 2/4: Thông tin hành khách</p>
            <div className="h-1.5 bg-white/10 rounded mt-2 overflow-hidden">
              <div className="h-full w-1/2 bg-primary"></div>
            </div>
          </div>

          {/* Thông tin hành khách */}
          <section className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]">
            <h2 className="text-xl font-bold mb-4">Thông tin hành khách</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span>Họ</span>
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white placeholder-white/40"
                       value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Tên</span>
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white placeholder-white/40"
                       value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Ngày sinh</span>
                <input type="date" className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white"
                       value={form.dob} onChange={e=>setForm({...form,dob:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2">
                <span>Giới tính</span>
                <select className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white"
                        value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}>
                  <option>Nam</option><option>Nữ</option><option>Khác</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 md:col-span-1">
                <span>Email</span>
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white placeholder-white/40"
                       value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              </label>
              <label className="flex flex-col gap-2 md:col-span-1">
                <span>Số điện thoại</span>
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white placeholder-white/40"
                       value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
              </label>
            </div>
          </section>

          {/* Dịch vụ bổ sung */}
          <section className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]">
            <h2 className="text-xl font-bold mb-4">Dịch vụ bổ sung</h2>

            {/* Chọn ghế */}
            <div className="rounded-lg border border-white/10 overflow-hidden mb-3">
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10"
                onClick={()=>setSeatOpen(v=>!v)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">event_seat</span>
                  <div>
                    <p className="font-semibold">Chọn ghế ngồi</p>
                    <p className="text-xs text-white/60">
                      {seatSelected ? `Ghế đã chọn: ${seatCode} (Cửa sổ)` : "Chọn ghế yêu thích để có trải nghiệm tốt nhất."}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-white/70">{seatSelected ? VND(priceSeat) : "Miễn phí"}</span>
              </button>
              {seatOpen && (
                <div className="px-4 py-3 bg-[#0b141b]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="h-5 w-5"
                           checked={seatSelected} onChange={e=>setSeatSelected(e.target.checked)} />
                    <span className="text-sm">Giữ ghế ưa thích ({seatCode})</span>
                  </label>
                  {seatSelected && (
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-white/60">Mã ghế:</span>
                      <input value={seatCode} onChange={e=>setSeatCode(e.target.value.toUpperCase())}
                             className="h-9 w-20 rounded bg-black/40 border border-white/10 px-2" />
                      <span className="text-xs text-white/60">(ví dụ 24A)</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hành lý */}
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10"
                onClick={()=>setBaggageOpen(v=>!v)}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">luggage</span>
                  <div>
                    <p className="font-semibold">Hành lý</p>
                    <p className="text-xs text-white/60">Thêm hành lý ký gửi nếu cần mang nhiều đồ hơn.</p>
                  </div>
                </div>
                <span className="text-sm text-white/70">{baggageKg ? VND(priceBagg20) : "0đ"}</span>
              </button>
              {baggageOpen && (
                <div className="px-4 py-3 bg-[#0b141b]">
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2">
                      <input type="radio" name="bag" checked={baggageKg===0} onChange={()=>setBaggageKg(0)} />
                      <span className="text-sm">Không thêm</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name="bag" checked={baggageKg===20} onChange={()=>setBaggageKg(20)} />
                      <span className="text-sm">+ 1 kiện (20kg) — {VND(priceBagg20)}</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Thanh toán */}
          <section className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]">
            <h2 className="text-xl font-bold mb-4">Thanh toán</h2>
            <div className="flex gap-3 flex-wrap">
              {(["card","wallet","bank"] as const).map(m => (
                <button key={m}
                        onClick={()=>setPayMethod(m)}
                        className={`h-10 px-4 rounded-lg border ${payMethod===m? "bg-primary/20 text-primary border-primary" : "border-white/10 text-white"} `}>
                  {m==="card"?"Thẻ Tín dụng/Ghi nợ":m==="wallet"?"Ví điện tử":"Chuyển khoản"}
                </button>
              ))}
            </div>

            {payMethod==="card" && (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <input className="md:col-span-2 h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white" placeholder="Số thẻ" />
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white" placeholder="MM/YY" />
                <input className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white" placeholder="CVV" />
              </div>
            )}

            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" className="h-4 w-4" checked={agree} onChange={e=>setAgree(e.target.checked)} />
              Tôi đồng ý với các <a className="underline" href="#">điều khoản và điều kiện</a>.
            </label>
          </section>

          {/* nút */}
          <div className="flex justify-between">
            <button onClick={()=>history.back()} className="h-11 px-6 rounded-lg bg-white/10 border border-white/10">Quay lại</button>
            <button onClick={onSubmit} disabled={loading || !agree}
                    className="h-11 px-6 rounded-lg bg-primary text-white font-bold disabled:opacity-60">
              {loading ? "Đang xử lý..." : "Hoàn tất thanh toán"}
            </button>
          </div>
        </div>

        {/* cột phải: tóm tắt chuyến bay */}
        <aside className="space-y-4 lg:sticky top-24 h-fit">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)]">
            <h3 className="text-xl font-bold mb-4">Tóm tắt chuyến bay</h3>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/10 grid place-items-center text-xs font-semibold">✈️</div>
              <div>
                <p className="font-semibold">{flight.carrier} • {flight.id} {flight.cabin ? `• ${flight.cabin}` : ""}</p>
                <p className="text-xs text-white/60">{flight.duration} • Bay thẳng</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 text-center rounded-lg bg-black/20 p-3">
              <div>
                <p className="text-lg font-bold">{flight.departTime}</p>
                <p className="text-xs text-white/60">{flight.depart}</p>
              </div>
              <div className="text-xs text-white/60 grid place-items-center">—</div>
              <div>
                <p className="text-lg font-bold">{flight.arriveTime}</p>
                <p className="text-xs text-white/60">{flight.arrive}</p>
              </div>
            </div>

            {/* chi tiết giá */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Giá vé (người lớn)</span><span>{VND(priceFare)}</span></div>
              <div className="flex justify-between"><span>Thuế và phí</span><span>{VND(priceTax)}</span></div>
              <div className="flex justify-between"><span>Hành lý (20kg)</span><span>{VND(priceBagg20)}</span></div>
              <div className="flex justify-between"><span>Chọn ghế ({seatCode})</span><span>{VND(priceSeat)}</span></div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="font-semibold">Tổng cộng</span>
              <span className="text-lg font-extrabold text-blue-300">{VND(priceTotal)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
