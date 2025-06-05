'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAnalysisHistory } from '@/app/actions/history'
import { getUserIdentifier } from '@/lib/user-identification'
import type { Analysis } from '@/db/schema'
import type { AnalysisResult } from '@/app/actions/analyze-image'

export default function HistoryPage() {
  const [history, setHistory] = useState<Analysis[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedDateRange, setSelectedDateRange] = useState<'all' | 'week' | 'month'>('all')

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setIsLoading(true)
      setError(null)

      if (process.env.NEXT_PUBLIC_ENABLE_HISTORY !== 'true') {
        setHistory([])
        return
      }

      const userId = getUserIdentifier()
      const analyses = await getAnalysisHistory(userId)
      setHistory(analyses)
    } catch (err) {
      console.error('Error loading history:', err)
      setError('Failed to load history')
    } finally {
      setIsLoading(false)
    }
  }

  const filterByDateRange = (analyses: Analysis[]) => {
    const now = new Date()
    const filtered = analyses.filter((analysis) => {
      const createdAt = new Date(analysis.createdAt)
      switch (selectedDateRange) {
        case 'week':
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          return createdAt >= weekAgo
        case 'month':
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          return createdAt >= monthAgo
        default:
          return true
      }
    })
    return filtered
  }

  const filteredHistory = filterByDateRange(history)

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-gray-300"></div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 rounded-xl bg-gray-300"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDateRange('all')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedDateRange === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setSelectedDateRange('month')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedDateRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setSelectedDateRange('week')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                selectedDateRange === 'week'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Last 7 Days
            </button>
          </div>
        </div>

        {error && <div className="mb-8 rounded-lg bg-red-50 p-4 text-red-600">{error}</div>}

        {filteredHistory.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">No analyses yet</h2>
            <p className="mt-2 text-gray-600">
              Start your journey by taking your first professional photo analysis.
            </p>
            <Link
              href="/capture"
              className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              Take Your First Photo
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHistory.map((analysis) => {
              const results = analysis.resultsJson as AnalysisResult
              const createdAt = new Date(analysis.createdAt)

              return (
                <div
                  key={analysis.id}
                  className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={analysis.imageUrl}
                      alt="Analysis"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {createdAt.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span
                        className={`text-2xl font-bold ${
                          results.overallScore >= 80
                            ? 'text-green-600'
                            : results.overallScore >= 60
                              ? 'text-yellow-600'
                              : 'text-red-600'
                        }`}
                      >
                        {results.overallScore}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facial Expression</span>
                        <span className="font-medium">{results.facialExpression.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Professional Appearance</span>
                        <span className="font-medium">{results.professionalAppearance.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Body Language</span>
                        <span className="font-medium">{results.bodyLanguage.score}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Eye Contact</span>
                        <span className="font-medium">{results.eyeContact.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/capture"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl"
          >
            Take New Photo
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
