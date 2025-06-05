'use client'

import { useState } from 'react'
import CameraCapture from '@/components/CameraCapture'
import { analyzeImage, type AnalysisResult } from '@/app/actions/analyze-image'

export default function Home() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCapture = async (imageData: string) => {
    setCapturedImage(imageData)
    setError(null)
    setIsAnalyzing(true)

    try {
      const result = await analyzeImage(imageData)
      setAnalysisResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image')
    } finally {
      setIsAnalyzing(false)
    }
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
          {!capturedImage && !analysisResult ? (
            <CameraCapture onCapture={handleCapture} />
          ) : isAnalyzing ? (
            <div className="text-center">
              <div className="mx-auto max-w-2xl">
                <div className="animate-pulse">
                  <div className="h-64 rounded-xl bg-gray-300"></div>
                  <p className="mt-6 text-lg text-gray-600">Analyzing your image...</p>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="mx-auto max-w-2xl rounded-lg bg-red-50 p-6">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => {
                    setCapturedImage(null)
                    setError(null)
                  }}
                  className="mt-4 rounded-lg bg-red-600 px-6 py-3 text-white transition-colors hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : analysisResult ? (
            <div className="mx-auto max-w-4xl">
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900">Analysis Complete!</h2>
                <p className="mt-2 text-gray-600">
                  Overall Score: {analysisResult.overallScore}/100
                </p>
                <p className="mt-4 text-gray-700">{analysisResult.summary}</p>
                <button
                  onClick={() => {
                    setCapturedImage(null)
                    setAnalysisResult(null)
                  }}
                  className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                  Take Another Photo
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  )
}
