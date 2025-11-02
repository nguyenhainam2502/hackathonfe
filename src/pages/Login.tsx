
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "@services/api"

export default function Login(){
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try{
      await login(username, password)
      nav("/manage")
    }catch(err:any){
      setError(err?.response?.data?.message || "Đăng nhập thất bại")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-56px)] flex items-center justify-center bg-cover bg-center"
      style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCoC2QQVz6sDzS3JSvDjs4vtsvw70SLSxIXjjbqJWZSB6YiWKB64EWn-lJUq11xaB_fvKRo7Q2V92eUXHAhlFUvyBnTyWqHZiM-AuZ9dtMOZ2tqJYZmpEWGcd-4aHJWCoEqE9_09G2oAKMnf2fezCX4LDPmemth4c8iCB7jrS3Q-F10EWN7pwgE1SA4578KaYCDVZthv5TVQkhP8Hn7EgFXGSmZKem52AesO726M2tmzSlw038KdSLS4hm6zcs01b2675B6wqYnfzII')"}}>
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-sm" />
      <form onSubmit={onSubmit} className="relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-background-dark/50 p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Chào mừng trở lại</h1>
        <p className="text-white/70 text-center mb-6">Đăng nhập vào hệ thống quản lý vé</p>
        {error && <div className="mb-3 rounded-md bg-red-500/20 text-red-200 px-3 py-2 text-sm">{error}</div>}
        <label className="flex flex-col gap-2 mb-3">
          <span className="text-sm">Tên đăng nhập</span>
          <input className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Email hoặc username" />
        </label>
        <label className="flex flex-col gap-2 mb-2">
          <span className="text-sm">Mật khẩu</span>
          <input type="password" className="h-12 rounded-lg bg-white/5 border border-white/20 px-3 outline-none focus:ring-2 focus:ring-primary/50" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" />
        </label>
        <button disabled={loading} className="w-full h-12 rounded-lg bg-primary text-white font-semibold mt-4 hover:opacity-90 disabled:opacity-60">
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  )
}
