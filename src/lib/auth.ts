// Simple auth utilities for admin panel
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
}

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token)
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token')
  }
  return null
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() === 'admin_authenticated'
}

export function login(username: string, password: string): boolean {
  if (validateCredentials(username, password)) {
    setAuthToken('admin_authenticated')
    return true
  }
  return false
}

export function logout(): void {
  removeAuthToken()
}