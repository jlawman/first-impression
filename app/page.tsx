'use client'

import { useState } from 'react'
import CameraCapture from '@/components/CameraCapture'

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData)
    console.log('Image captured:', imageData.substring(0, 50) + '...')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
            First Impression
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Perfect your first impressions with AI-powered feedback
          </p>
        </div>

        <div className="mt-12">
          {!capturedImage ? (
            <CameraCapture onCapture={handleCapture} />
          ) : (
            <div className="text-center">
              <div className="mx-auto max-w-2xl">
                <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-1">
                  <img src={capturedImage} alt="Captured" className="rounded-xl" />
                </div>
                <button
                  onClick={() => setCapturedImage(null)}
                  className="mt-6 rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700"
                >
                  Take Another Photo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
