'use client'

import { useCallback, useRef, useState } from 'react'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
}

export default function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasPhoto, setHasPhoto] = useState(false)
  const [photoData, setPhotoData] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    setIsLoading(true)
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setStream(mediaStream)
      setHasPhoto(false)
      setPhotoData(null)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please ensure you have granted camera permissions.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }, [stream])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0)

        const imageData = canvas.toDataURL('image/jpeg')
        setPhotoData(imageData)
        setHasPhoto(true)
        stopCamera()
      }
    }
  }, [stopCamera])

  const retakePhoto = useCallback(() => {
    setHasPhoto(false)
    setPhotoData(null)
    startCamera()
  }, [startCamera])

  const confirmPhoto = useCallback(() => {
    if (photoData) {
      onCapture(photoData)
    }
  }, [photoData, onCapture])

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-1">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
          {!stream && !hasPhoto && (
            <div className="flex h-full items-center justify-center">
              <button
                onClick={startCamera}
                disabled={isLoading}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-white shadow-xl transition-all hover:shadow-2xl disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg font-medium">
                  {isLoading ? 'Starting Camera...' : 'Start Camera'}
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform group-hover:translate-x-0" />
              </button>
            </div>
          )}

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`h-full w-full object-cover ${hasPhoto ? 'hidden' : ''}`}
          />

          <canvas ref={canvasRef} className="hidden" />

          {hasPhoto && photoData && (
            <img src={photoData} alt="Captured" className="h-full w-full object-cover" />
          )}
        </div>
      </div>

      {stream && !hasPhoto && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={capturePhoto}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="8" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-y-full bg-white/20 transition-transform group-hover:translate-y-0" />
          </button>
        </div>
      )}

      {hasPhoto && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={retakePhoto}
            className="rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700"
          >
            Retake Photo
          </button>
          <button
            onClick={confirmPhoto}
            className="rounded-lg bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl"
          >
            Use This Photo
          </button>
        </div>
      )}
    </div>
  )
}
