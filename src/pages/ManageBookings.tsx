import { useState } from "react"
import { getBookingByPNR } from "@services/api"
import { useNavigate } from "react-router-dom"

type ResultRow = {
  pnr: string
  passenger: string
  route: string
  date: string
  status: "CONFIRMED" | "PENDING" | "CANCELLED"
}

function StatusBadge({ status }: { status: ResultRow["status"] }) {
  const map = {
    CONFIRMED: { text: "Đã xác nhận", cls: "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/20" },
    PENDING:   { text: "Chờ thanh toán", cls: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-400/20" },
    CANCELLED: { text: "Đã hủy", cls: "bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-400/20" },
  } as const
  const m = map[status]
  return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.cls}`}>{m.text}</span>
}

export default function ManageBookings() {
  const [activeTab, setActiveTab] = useState<"pnr" | "passenger">("pnr")
  const [pnr, setPnr] = useState("W8X2B9")
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<ResultRow[]>([])
  const nav = useNavigate()

  const fetchPNR = async () => {
    setLoading(true)
    try {
      const data = await getBookingByPNR(pnr)
      // map từ BE nếu có; tạm mock cho giống hình
      setRows([
        { pnr: pnr, passenger: "Nguyễn Văn An", route: "SGN → HAN", date: "25/12/2024", status: "CONFIRMED" },
        { pnr: "K4F7G1", passenger: "Trần Thị Bích", route: "DAD → SGN", date: "15/01/2025", status: "PENDING" },
        { pnr: "LP3H5", passenger: "Lê Minh Cường", route: "HPH → DLI", date: "02/02/2025", status: "CANCELLED" },
      ])
    } catch {
      // fallback tương tự
      setRows([
        { pnr: pnr, passenger: "Nguyễn Văn An", route: "SGN → HAN", date: "25/12/2024", status: "CONFIRMED" },
        { pnr: "K4F7G1", passenger: "Trần Thị Bích", route: "DAD → SGN", date: "15/01/2025", status: "PENDING" },
        { pnr: "LP3H5", passenger: "Lê Minh Cường", route: "HPH → DLI", date: "02/02/2025", status: "CANCELLED" },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Card container với shadow lớn */}
        <div className="bg-[#0f1a23] text-gray-100 rounded-2xl border border-white/5 shadow-[0_20px_60px_-20px_rgba(0,0,0,.6)] p-6 md:p-8">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Tra Cứu Thông Tin Đặt Chỗ</h1>

          {/* Tabs */}
          <div className="mt-6">
            <div className="flex gap-6 border-b border-white/10">
              <button
                className={`pb-3 -mb-px text-sm font-semibold ${activeTab === "pnr" ? "text-white border-b-2 border-primary" : "text-white/60 hover:text-white"}`}
                onClick={() => setActiveTab("pnr")}
              >
                Theo Mã Đặt Chỗ
              </button>
              <button
                className={`pb-3 -mb-px text-sm font-semibold ${activeTab === "passenger" ? "text-white border-b-2 border-primary" : "text-white/60 hover:text-white"}`}
                onClick={() => setActiveTab("passenger")}
              >
                Theo Thông Tin Hành Khách
              </button>
            </div>

            {/* Tab content */}
            {activeTab === "pnr" ? (
              <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <label className="flex flex-col">
                  <span className="text-sm text-white/70 mb-2">Mã Đặt Chỗ (PNR)</span>
                  <input
                    className="h-12 rounded-lg bg-[#0b141b] border border-white/10 px-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={pnr}
                    onChange={(e) => setPnr(e.target.value.toUpperCase())}
                    placeholder="Nhập PNR (ví dụ: W8X2B9)"
                  />
                </label>
                <button
                  onClick={fetchPNR}
                  className="h-12 px-5 rounded-lg bg-primary text-white font-bold hover:brightness-110"
                >
                  Tìm Kiếm
                </button>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-white/60 text-sm">(Demo) Form tìm theo họ tên / email / số ĐT sẽ đặt ở đây.</p>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-3">Kết quả tìm kiếm</h2>

            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-white/70">
                  <tr className="[&>th]:px-4 [&>th]:py-3 text-left">
                    <th>MÃ ĐẶT CHỖ</th>
                    <th>HÀNH KHÁCH</th>
                    <th>HÀNH TRÌNH</th>
                    <th>NGÀY BAY</th>
                    <th>TÌNH TRẠNG</th>
                    <th className="text-center">HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading && (
                    <tr><td className="px-4 py-4 text-white/70" colSpan={6}>Đang tải...</td></tr>
                  )}
                  {!loading && rows.length === 0 && (
                    <tr><td className="px-4 py-4 text-white/50" colSpan={6}>Chưa có kết quả</td></tr>
                  )}
                  {!loading && rows.map(r => (
                    <tr key={r.pnr} className="hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-4 font-semibold text-white cursor-pointer underline decoration-dotted"
                          onClick={()=>nav(`/ticket/${r.pnr}`)}>{r.pnr}</td>
                      <td className="px-4 py-4">{r.passenger}</td>
                      <td className="px-4 py-4">{r.route}</td>
                      <td className="px-4 py-4">{r.date}</td>
                      <td className="px-4 py-4"><StatusBadge status={r.status} /></td>
                      <td className="px-2 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center" title="Xem" onClick={()=>nav(`/ticket/${r.pnr}`)}>
                            <span className="material-symbols-outlined">visibility</span>
                          </button>
                          <button className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center" title="Gửi email">
                            <span className="material-symbols-outlined">mail</span>
                          </button>
                          <button className="h-9 w-9 rounded-md hover:bg-white/10 flex items-center justify-center" title="In">
                            <span className="material-symbols-outlined">print</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* footer */}
              <div className="flex items-center justify-between px-4 py-3 bg-white/5 text-xs text-white/60">
                <span>Hiển thị 1–{rows.length || 0} của {rows.length || 0} kết quả</span>
                <div className="flex gap-2">
                  <button className="h-8 px-3 rounded-md bg-white/5 border border-white/10 text-white/80">Trước</button>
                  <button className="h-8 px-3 rounded-md bg-white/5 border border-white/10 text-white/80">Sau</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* đổ bóng ngoài card cho giống mock */}
        <div className="mt-6"></div>
      </div>
    </div>
  )
}
