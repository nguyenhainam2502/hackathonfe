import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { register } from "@services/api"

export default function Register(){
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.username || !form.email || !form.password) {
      setError("Vui lòng điền đủ thông tin.")
      return
    }
    if (form.password !== form.confirm) {
      setError("Mật khẩu nhập lại không khớp.")
      return
    }

    setLoading(true)
    try{
      await register({ username: form.username, email: form.email, password: form.password })
      nav("/login")
    }catch(err:any){
      setError(err?.response?.data?.message || "Đăng ký thất bại")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center bg-cover bg-center"
      style={{backgroundImage: "linear-gradient(rgba(0,0,0,.5), rgba(16,25,34,1)), url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1600&auto=format&fit=crop')" }}>
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-white/15 bg-black/40 backdrop-blur p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Tạo tài khoản</h1>
        <p className="text-white/70 text-center mb-6">Đăng ký để quản lý đặt chỗ và vé.</p>

        {error && <div className="mb-3 rounded-md bg-red-500/20 text-red-200 px-3 py-2 text-sm">{error}</div>}

        <label className="flex flex-col gap-2 mb-3">
          <span className="text-sm">Tên đăng nhập</span>
          <input className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
                 value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        </label>

        <label className="flex flex-col gap-2 mb-3">
          <span className="text-sm">Email</span>
          <input type="email" className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
                 value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        </label>

        <label className="flex flex-col gap-2 mb-3">
          <span className="text-sm">Mật khẩu</span>
          <input type="password" className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
                 value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm">Nhập lại mật khẩu</span>
          <input type="password" className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
                 value={form.confirm} onChange={e=>setForm({...form, confirm:e.target.value})} />
        </label>

        <button disabled={loading} className="w-full h-12 rounded-lg bg-primary text-white font-semibold mt-5 hover:opacity-90 disabled:opacity-60">
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="text-sm text-white/70 mt-4 text-center">
          Đã có tài khoản? <Link to="/login" className="text-white hover:underline">Đăng nhập</Link>
        </p>
      </form>
    </div>
  )
}
