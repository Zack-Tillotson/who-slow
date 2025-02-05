'use client'

import { useEffect, useState } from "react"
import auth from './index'
import { User } from "firebase/auth"

export function useClientAuth() {

  const [isAuthenticated, updateIsAuthenticated] = useState(false)
  const [isLoading, updateIsLoading] = useState(true)
  const [user, updateUser] = useState<User|null>(null)
  
  useEffect(() => {
    auth.getAuthUser().then(user => {
      updateIsAuthenticated(!!user)
      updateUser(user)
      updateIsLoading(false)
    })
  }, [])

  return {isAuthenticated, isLoading, user}
}