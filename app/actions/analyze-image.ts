'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

export interface AnalysisResult {
  facialExpression: {
    score: number
    feedback: string
    suggestions: string[]
  }
  professionalAppearance: {
    score: number
    feedback: string
    suggestions: string[]
  }
  bodyLanguage: {
    score: number
    feedback: string
    suggestions: string[]
  }
  eyeContact: {
    score: number
    feedback: string
    suggestions: string[]
  }
  overallScore: number
  summary: string
}

export async function analyzeImage(imageData: string): Promise<AnalysisResult> {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured')
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    // Remove data URL prefix
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')

    const prompt = `Analyze this professional headshot for a sales professional's first impression. 
    Evaluate the following aspects and provide specific, actionable feedback:

    1. Facial Expression (confidence, approachability, genuine smile)
    2. Professional Appearance (attire, grooming, overall presentation)
    3. Body Language (posture, shoulders, positioning)
    4. Eye Contact (directness, engagement, warmth)

    For each aspect, provide:
    - A score from 1-100
    - Brief feedback (1-2 sentences)
    - 2-3 specific suggestions for improvement

    Also provide an overall score (average of all aspects) and a brief summary.

    Format your response as a JSON object with this structure:
    {
      "facialExpression": {
        "score": number,
        "feedback": "string",
        "suggestions": ["string", "string", "string"]
      },
      "professionalAppearance": {
        "score": number,
        "feedback": "string",
        "suggestions": ["string", "string", "string"]
      },
      "bodyLanguage": {
        "score": number,
        "feedback": "string",
        "suggestions": ["string", "string", "string"]
      },
      "eyeContact": {
        "score": number,
        "feedback": "string",
        "suggestions": ["string", "string", "string"]
      },
      "overallScore": number,
      "summary": "string"
    }`

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: 'image/jpeg',
                data: base64Data,
              },
            },
          ],
        },
      ],
    })

    const response = await result.response
    const text = response.text()

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('Invalid response format from AI')
    }

    const analysis: AnalysisResult = JSON.parse(jsonMatch[0])

    return analysis
  } catch (error) {
    console.error('Error analyzing image:', error)
    throw new Error('Failed to analyze image. Please try again.')
  }
}
