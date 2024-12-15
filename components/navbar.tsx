import Link from 'next/link'
import { Globe } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-4 border-b bg-white z-50">
      <Link href="/" className="flex items-center gap-2">
        <Globe className="w-8 h-8" />
        <span className="text-xl font-bold">VehicleCounter</span>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <Link href="/about" className="hover:text-primary">
          About Us
        </Link>
        <Link href="/detections" className="hover:text-primary">
          Detect
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 text-white bg-[#362222] rounded-md hover:bg-[#362222]/90"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  )
}