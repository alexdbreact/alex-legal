'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { Building2, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="mr-2 text-xl font-bold text-gray-800">  الإدارة العامة للشئون القانونية 
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:mr-6">
            <div className="flex space-x-4 space-x-reverse">
              <Link 
                href="/"
                className="text-white-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                الرئيسية
              </Link>
              
              {user ? (
                <>
                  <Link 
                    href="/main"
                    className="text-blue-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                   التأشيرات العامة
                   </Link>
                  <Link 
                    href="/dashboard"
                    className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    لوحة التحكم
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <Link 
                  href="/login"
                  className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
            >
              الرئيسية
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  لوحة التحكم
                </Link>
                <Link 
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                   النأشيرات العامة
                </Link>

                <button
                  onClick={logout}
                  className="block w-full text-right px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <Link 
                href="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}