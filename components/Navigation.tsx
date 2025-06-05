'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              First Impression
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                Home
              </Link>
              <Link
                href="/capture"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/capture')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                Capture
              </Link>
              <Link
                href="/history"
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive('/history')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
