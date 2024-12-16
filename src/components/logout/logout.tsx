"use client"

import { signOut } from 'next-auth/react'
import React from 'react'

export default function Logout() {
  const handelLogout = () => {
    signOut({ callbackUrl: "/login" })

    
  }
  return <button className='text-white rounded-xl bg-red-500 px-4 py-2' onClick={ ()=> handelLogout()}>Logout</button>
}
