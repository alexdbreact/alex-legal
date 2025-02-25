'use client'

import { useState } from 'react'
import { Plus, FileSpreadsheet, Printer } from 'lucide-react'
import MainTable from '@/components/MainTable'
import AddEmployeeModal from '@/components/AddEmployeeModal'



export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">لوحة التحكم</h1>
        
        <div className="flex gap-3">

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            إضافة مذكرة
          </button>
          
          <button className="btn-secondary flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            تصدير Excel
          </button>
          
          <button className="btn-secondary flex items-center gap-2">
            <Printer className="h-5 w-5" />
            طباعة
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <MainTable />
      </div>

      <AddEmployeeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  )
}