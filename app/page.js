import Image from 'next/image'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="text-center space-y-8 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl max-w-3xl w-full mx-auto">
        <div className="flex justify-center">
          <Building2 className="h-24 w-24 text-blue-500" />
        </div>
        
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          نظام إدارةالتأشيرات 
        </h1>
   
        
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link 
            href="/dashboard" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
             قاعدة البيانات
          </Link>
          
          <Link 
            href="/login" 
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            تسجيل الدخول
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">مميزات النظام</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>إرسال المكاتبات و الردود بسهولة</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>تتبع المراسلات و المذكرات</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>حفظ البيانات مؤمنة و بدقة  </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>تقارير وإحصائيات متقدمة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}