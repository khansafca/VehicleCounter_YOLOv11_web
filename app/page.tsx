import Link from 'next/link'
import Image from 'next/image'
import { Cloud, Car, BarChart3 } from 'lucide-react'

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center gap-12">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-4">
              Automated Traffic Monitoring System
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Enhancing Urban Mobility with Deep Learning and Computer Vision
            </p>
            <div className="flex gap-4">
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-[#362222] text-white rounded-md hover:bg-[#362222]/90"
              >
                Check it Now
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 border rounded-md hover:bg-gray-50"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <Image src="/assets/main.gif" alt="Traffic Monitoring" layout="responsive" width={640} height={360} className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <Car className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-Time Vehicle Counting</h3>
              <p className="text-gray-600">
                Use machine learning and computer vision techniques to automatically and accurately count vehicle traffic density
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <Cloud className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Cloud-Based Deployment</h3>
              <p className="text-gray-600">
                The model is powered by the Google Cloud platform, enabling real-time traffic analysis through a RESTful API built with Express.js
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <BarChart3 className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-2">Enhanced Urban Mobility Insights</h3>
              <p className="text-gray-600">
                Provide traffic insights that can help urban planners optimize traffic flow and support sustainable urban development
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}