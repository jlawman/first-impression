import { type AnalysisResult } from '@/app/actions/analyze-image'

interface ResultsDisplayProps {
  results: AnalysisResult
  onRetake: () => void
}

interface CategoryCardProps {
  title: string
  score: number
  feedback: string
  suggestions: string[]
  icon: React.ReactNode
  colorClass: string
}

function CategoryCard({
  title,
  score,
  feedback,
  suggestions,
  icon,
  colorClass,
}: CategoryCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
      <div className={`h-2 ${colorClass}`} />
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg ${colorClass} ${colorClass.replace('bg-', 'bg-opacity-10 ')} p-3`}
            >
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
        </div>

        <div className="mb-4">
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className={`h-2 rounded-full transition-all ${getProgressColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        <p className="mb-4 text-gray-700">{feedback}</p>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">Suggestions:</p>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-2">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <p className="text-sm text-gray-600">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ResultsDisplay({ results, onRetake }: ResultsDisplayProps) {
  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-600 to-green-500'
    if (score >= 60) return 'from-yellow-600 to-yellow-500'
    return 'from-red-600 to-red-500'
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Overall Score Card */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
        <div className="p-8 sm:p-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">Your First Impression Analysis</h2>
              <p className="text-lg text-gray-300">{results.summary}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div
                  className={`h-32 w-32 rounded-full bg-gradient-to-br ${getOverallScoreColor(results.overallScore)} p-1`}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                    <span className="text-4xl font-bold">{results.overallScore}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-400">Overall Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <CategoryCard
          title="Facial Expression"
          score={results.facialExpression.score}
          feedback={results.facialExpression.feedback}
          suggestions={results.facialExpression.suggestions}
          colorClass="bg-blue-500"
          icon={
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />

        <CategoryCard
          title="Professional Appearance"
          score={results.professionalAppearance.score}
          feedback={results.professionalAppearance.feedback}
          suggestions={results.professionalAppearance.suggestions}
          colorClass="bg-purple-500"
          icon={
            <svg
              className="h-6 w-6 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        />

        <CategoryCard
          title="Body Language"
          score={results.bodyLanguage.score}
          feedback={results.bodyLanguage.feedback}
          suggestions={results.bodyLanguage.suggestions}
          colorClass="bg-green-500"
          icon={
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          }
        />

        <CategoryCard
          title="Eye Contact"
          score={results.eyeContact.score}
          feedback={results.eyeContact.feedback}
          suggestions={results.eyeContact.suggestions}
          colorClass="bg-orange-500"
          icon={
            <svg
              className="h-6 w-6 text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onRetake}
          className="rounded-lg bg-gray-600 px-8 py-3 text-white transition-colors hover:bg-gray-700"
        >
          Take Another Photo
        </button>
        <button className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-3 text-white shadow-lg transition-all hover:shadow-xl">
          Save Results
        </button>
      </div>
    </div>
  )
}
