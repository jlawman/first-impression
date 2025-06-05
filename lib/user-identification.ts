'use client'

// Simple user identification using localStorage UUID
// This is a temporary solution for the prototype

const USER_ID_KEY = 'first-impression-user-id'

export function getUserIdentifier(): string {
  if (typeof window === 'undefined') {
    throw new Error('getUserIdentifier must be called on the client side')
  }

  let userId = localStorage.getItem(USER_ID_KEY)

  if (!userId) {
    // Generate a new UUID
    userId = crypto.randomUUID()
    localStorage.setItem(USER_ID_KEY, userId)
  }

  return userId
}

export function clearUserData(): void {
  if (typeof window === 'undefined') {
    throw new Error('clearUserData must be called on the client side')
  }

  localStorage.removeItem(USER_ID_KEY)
}
