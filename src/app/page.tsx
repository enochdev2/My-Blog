'use client'

import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Home() {
  const {data:session, status} = useSession()
  console.log("🚀 ~ file: page.tsx:6 ~ Home ~ session:", session?.user?.accessToken)

  
  return (
    <main className="flex w-screen min-h-screen flex-col dark:bg-transparent items-center justify-between p-2">
     <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, corporis!</h1>
    </main>
  )
}