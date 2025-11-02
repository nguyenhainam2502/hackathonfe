import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@services/api"
import { setAuth } from "@services/auth"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const DEMO_USER = "admin@demo.com"
    const DEMO_PASS = "123456"

    // ---- Đăng nhập DEMO (không cần backend) ----
    if (username.trim() === DEMO_USER && password === DEMO_PASS) {
      setAuth("demo-token", DEMO_USER) // lưu localStorage + bắn sự kiện
      setLoading(false)
      nav("/manage")
      return
    }

    // ---- Đăng nhập qua backend (nếu có) ----
    try {
      const data = await login(username.trim(), password)
      // nếu BE không trả token/user, dùng fallback để không bị lỗi
      setAuth(data?.token || "demo-token", data?.user?.username || username.trim())
      nav("/manage")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đăng nhập thất bại")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="relative min-h-[calc(100vh-56px)] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=1920")` }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <form
        onSubmit={onSubmit}
        className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-background-dark/50 p-8 text-white"
      >
        <h1 className="text-3xl font-bold text-center mb-2">Chào mừng trở lại</h1>
        <p className="text-white/70 text-center mb-6">Đăng nhập vào hệ thống quản lý vé</p>

        {error && (
          <div className="mb-3 rounded-md bg-red-500/20 text-red-200 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <label className="flex flex-col gap-2 mb-3">
          <span className="text-sm">Tên đăng nhập</span>
          <input
            className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email hoặc username"
            autoComplete="username"
          />
        </label>

        <label className="flex flex-col gap-2 mb-2">
          <span className="text-sm">Mật khẩu</span>
          <input
            type="password"
            className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </label>

        <button
          disabled={loading}
          className="w-full h-12 rounded-lg bg-primary text-white font-semibold mt-4 hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        {/* Gợi ý tài khoản demo – có thể xoá nếu không muốn hiện */}
        <p className="mt-4 text-center text-xs text-white/70">
          Tài khoản demo: <code>admin@demo.com</code> / <code>123456</code>
        </p>
      </form>
    </div>
  )
}
