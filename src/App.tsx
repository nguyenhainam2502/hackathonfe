
import { Route, Routes, NavLink } from "react-router-dom"
import Login from "@pages/Login"
import SearchFlights from "@pages/SearchFlights"
import ManageBookings from "@pages/ManageBookings"
import Checkout from "@pages/Checkout"
import TicketDetails from "@pages/TicketDetails"

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur border-b border-gray-200/40 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary">
            <svg className="size-6" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"/>
            </svg>
            <span className="font-bold">FlightBooker</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <NavLink to="/" className={({isActive})=> isActive ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300"}>Tìm chuyến bay</NavLink>
            <NavLink to="/manage" className={({isActive})=> isActive ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300"}>Quản lý đặt chỗ</NavLink>
            <NavLink to="/login" className={({isActive})=> isActive ? "text-primary font-semibold" : "text-gray-600 dark:text-gray-300"}>Đăng nhập</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<SearchFlights/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/manage" element={<ManageBookings/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/ticket/:pnr" element={<TicketDetails/>} />
        </Routes>
      </main>
      <footer className="py-6 text-center text-xs text-gray-500">© 2025 FlightBooker FE</footer>
    </div>
  )
}
