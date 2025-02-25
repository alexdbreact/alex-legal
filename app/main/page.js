'use client'

import { useState } from 'react'
import AllTable from '@/components/AllTable'




export default function Dashboard() {

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">شاشة التعليمات و الكتب الواردة للتعميم</h1>
        
       
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <AllTable />
      </div>

    
    </div>
  )
}