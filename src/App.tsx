import { useEffect, useState } from "react"
import { Route, Routes, NavLink, useNavigate } from "react-router-dom"

import Login from "@pages/Login"
import SearchFlights from "@pages/SearchFlights"
import ManageBookings from "@pages/ManageBookings"
import Checkout from "@pages/Checkout"
import TicketDetails from "@pages/TicketDetails"
import Register from "@pages/Register"

import { getUser, clearAuth } from "@services/auth"

export default function App() {
  const [user, setUser] = useState<string | null>(getUser())
  const nav = useNavigate()

  // Cập nhật header khi đăng nhập/đăng xuất
  useEffect(() => {
    const update = () => setUser(getUser())
    window.addEventListener("auth:change", update)
    window.addEventListener("storage", update) // sync giữa các tab
    return () => {
      window.removeEventListener("auth:change", update)
      window.removeEventListener("storage", update)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-[#0f1a23]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-gray-100">

          {/* LOGO — click về trang chủ */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <svg
              className="w-5 h-5 text-primary group-hover:scale-110 transition-transform"
              viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"/>
            </svg>
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">
              FlightBooking <span className="text-primary">Pro</span>
            </span>
          </NavLink>

          {/* MENU trái (luôn hiện) */}
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-white/70 hover:text-white"
              }
            >
              Chuyến bay
            </NavLink>
            <NavLink
              to="/manage"
              className={({ isActive }) =>
                isActive ? "text-primary font-semibold" : "text-white/70 hover:text-white"
              }
            >
              Tra cứu thông tin đặt chỗ
            </NavLink>
          </nav>

          {/* MENU phải: phụ thuộc login */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/80 hidden sm:block">
                Xin chào, {user}
              </span>
              <button
                onClick={() => { clearAuth(); nav("/login") }}
                className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-6 text-sm">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-white/70 hover:text-white"
                }
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "text-white/70 hover:text-white"
                }
              >
                Đăng ký
              </NavLink>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<SearchFlights />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manage" element={<ManageBookings />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ticket/:pnr" element={<TicketDetails />} />
        </Routes>
      </main>

      <footer className="py-6 text-center text-xs text-gray-500">
        © 2025 FlightBooker
      </footer>
    </div>
  )
}
