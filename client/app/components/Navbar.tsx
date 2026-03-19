"use client"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="px-3">
        <div className="flex items-center justify-between h-17">
          {/* Logo / Brand */}
          <div className="flex items-center gap-1">
            <img src="capi_icon.png" alt="capibara" className="w-15 h-15 object-contain" />
            <span className="text-gray-700 font-semibold text-xl">Report Incident</span>
          </div>

          {/* Profile / Action */}
          <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-xl font-semibold">U</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
