import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              Perfect Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                First Impression
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 sm:text-2xl">
              Stop losing deals because of poor first impressions. Get instant AI feedback on your
              professional presence and close more sales.
            </p>
            <div className="mt-10">
              <Link
                href="/capture"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-lg font-medium text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
              >
                Start Your Analysis
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The Hidden Deal Killer</h2>
            <p className="mt-4 text-lg text-gray-600">
              Research shows that 55% of first impressions are based on visual cues. In sales, you
              have just 7 seconds to establish trust and credibility. Are you making them count?
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Lost Opportunities</h3>
              <p className="mt-2 text-gray-600">
                Poor body language and facial expressions can cost you deals before you even speak
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Lack of Feedback</h3>
              <p className="mt-2 text-gray-600">
                Most professionals never receive honest feedback about their visual presence
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">Stagnant Performance</h3>
              <p className="mt-2 text-gray-600">
                Without objective insights, it&apos;s impossible to improve your professional presence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Your AI-Powered Sales Coach
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get instant, objective feedback on your professional presence. Improve your
              confidence, body language, and visual impact to close more deals.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Facial Expression Analysis
              </h3>
              <p className="mt-2 text-gray-600">
                Ensure your expressions convey confidence and approachability
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Professional Appearance</h3>
              <p className="mt-2 text-gray-600">
                Get feedback on attire, grooming, and overall presentation
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Body Language Insights</h3>
              <p className="mt-2 text-gray-600">
                Optimize your posture and positioning for maximum impact
              </p>
            </div>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Eye Contact Coaching</h3>
              <p className="mt-2 text-gray-600">
                Master the art of engaging, trustworthy eye contact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              Get professional feedback in just 3 simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Take a Photo</h3>
              <p className="mt-2 text-gray-600">
                Use your camera to capture a professional headshot
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">AI Analysis</h3>
              <p className="mt-2 text-gray-600">
                Our AI evaluates your facial expression, appearance, and body language
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Get Actionable Feedback</h3>
              <p className="mt-2 text-gray-600">
                Receive specific suggestions to improve your professional presence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Start Perfecting Your First Impression Today
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of sales professionals who are closing more deals with confidence
          </p>
          <div className="mt-10">
            <Link
              href="/capture"
              className="inline-flex items-center rounded-lg bg-white px-8 py-4 text-lg font-medium text-blue-600 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Get Your Free Analysis
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
