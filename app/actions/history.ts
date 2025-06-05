'use server'

import { db } from '@/db'
import { analyses, type Analysis } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import type { AnalysisResult } from './analyze-image'

export async function saveAnalysis(
  userIdentifier: string,
  imageUrl: string,
  results: AnalysisResult
): Promise<Analysis> {
  try {
    const [analysis] = await db
      .insert(analyses)
      .values({
        userIdentifier,
        imageUrl,
        resultsJson: results,
        overallScore: results.overallScore,
      })
      .returning()

    return analysis
  } catch (error) {
    console.error('Error saving analysis:', error)
    throw new Error('Failed to save analysis')
  }
}

export async function getAnalysisHistory(userIdentifier: string): Promise<Analysis[]> {
  try {
    const history = await db
      .select()
      .from(analyses)
      .where(eq(analyses.userIdentifier, userIdentifier))
      .orderBy(desc(analyses.createdAt))

    return history
  } catch (error) {
    console.error('Error fetching analysis history:', error)
    throw new Error('Failed to fetch analysis history')
  }
}

export async function getAnalysisByDateRange(
  userIdentifier: string,
  startDate: Date,
  endDate: Date
): Promise<Analysis[]> {
  try {
    const history = await db
      .select()
      .from(analyses)
      .where(eq(analyses.userIdentifier, userIdentifier))
      .orderBy(desc(analyses.createdAt))

    // Filter by date range in application code since Drizzle's date filtering can be complex
    return history.filter((analysis) => {
      const createdAt = new Date(analysis.createdAt)
      return createdAt >= startDate && createdAt <= endDate
    })
  } catch (error) {
    console.error('Error fetching analysis by date range:', error)
    throw new Error('Failed to fetch analysis history')
  }
}
