export const getUser = () => localStorage.getItem("auth_user")

export const setAuth = (token: string, user: string) => {
  localStorage.setItem("auth_token", token)
  localStorage.setItem("auth_user", user)
  window.dispatchEvent(new Event("auth:change"))  // báo cho header cập nhật
}

export const clearAuth = () => {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("auth_user")
  window.dispatchEvent(new Event("auth:change"))
}
