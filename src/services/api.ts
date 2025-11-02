
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000/api",
  withCredentials: true
})

// Auth
export const login = async (username: string, password: string) => {
  const { data } = await api.post("/auth/login", { username, password })
  return data
}

export const register = async (payload: {
  username: string
  email: string
  password: string
}) => {
  const { data } = await api.post("/auth/register", payload)
  return data
}

// Flights
export const searchFlights = async (params: {
  from: string; to: string; departDate: string; returnDate?: string; adults?: number; children?: number; tripType?: "oneway"|"round"|"multi"
}) => {
  const { data } = await api.get("/flights/search", { params })
  return data
}

// Bookings
export const getBookingByPNR = async (pnr: string) => {
  const { data } = await api.get(`/bookings/${pnr}`)
  return data
}

export const createBooking = async (payload: any) => {
  const { data } = await api.post("/bookings", payload)
  return data
}

// Tickets
export const getTicket = async (pnr: string) => {
  const { data } = await api.get(`/tickets/${pnr}`)
  return data
}

export default api
