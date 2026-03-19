"use client"

import { useRef, useState } from "react";

import liff from "@line/liff";

export default function Home() {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBase64, setPhotoBase64] = useState<string | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [detail, setDetail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [locState, setLocState] = useState<"idle" | "loading" | "found">("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const handleSubmit = () => {
    const payload = {
      topic,
      detail,
      photo: photoBase64 ?? null,    // base64 data URL, e.g. "data:image/jpeg;base64,..."
      location: coords
        ? { lat: coords.lat, lng: coords.lng }
        : null,
    };
    console.log("Submit payload:", JSON.stringify(payload, null, 2));
    // use for await fetch("/api/incident", { method: "POST", body: JSON.stringify(payload) })
  };

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Preview
    setPhotoPreview(URL.createObjectURL(file));
    // Base64 for payload
    const reader = new FileReader();
    reader.onload = () => setPhotoBase64(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleGetLocation = () => {
    setLocState("loading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocState("found");
      },
      () => setLocState("idle"),
    );
  };

  return (
    <div id="line profile" className="min-h-screen bg-[#FFE2C2] px-4 py-4 flex flex-col">
      <div className="bg-white rounded-2xl shadow-sm p-4 flex-1">
        <div className="border-b border-gray-200 pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Incidence Request</h2>
        </div>
        <div className="relative">
          <select
            className="w-full px-3 py-2 rounded-lg text-gray-400 text-sm appearance-none"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            <option value="" disabled>-- Select Topic --</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg className="w-3 h-3 text-gray-500" viewBox="0 0 10 6" fill="currentColor">
              <path d="M0 0L5 6L10 0H0Z" />
            </svg>
          </div>
        </div>
        <textarea
          className="w-full mt-3 px-3 py-2 rounded-lg text-gray-400 text-sm resize-none h-40"
          style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
          placeholder="Type detail..."
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <div className="border-b border-gray-200 mt-3 pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Take a photo</h2>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleCapture}
        />

        {photoPreview ? (
          <div className="relative w-full h-40 rounded-lg overflow-hidden" style={{ border: "1px solid #5D5A5A" }}>
            <img src={photoPreview} alt="captured" className="w-full h-full object-cover" />
            <button
              onClick={() => {
                URL.revokeObjectURL(photoPreview);
                setPhotoPreview(null);
                setPhotoBase64(null);
              }}
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className="w-full h-40 rounded-lg flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
            onClick={() => inputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span className="text-gray-400 text-sm">Please take a photo</span>
            </div>
          </div>
        )}

        <div className="border-b border-gray-200 mt-3 pb-3 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Your Location</h2>
        </div>

        {locState === "idle" && (
          <div
            className="w-full h-20 rounded-lg flex items-center justify-center gap-3 cursor-pointer"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
            onClick={handleGetLocation}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-gray-400 text-sm">Searching your Location</span>
          </div>
        )}

        {locState === "loading" && (
          <div
            className="w-full h-20 rounded-lg flex items-center justify-center gap-3"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
          >
            <svg className="w-5 h-5 text-gray-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}

        {locState === "found" && (
          <div
            className="w-full h-20 rounded-lg flex flex-col items-start justify-center px-4 gap-1"
            style={{ backgroundColor: "#F5F5F5", border: "1px solid #5D5A5A" }}
          >
            <span className="text-gray-700 text-sm font-medium">S3 Canteen</span>
            <span className="text-gray-400 text-xs">Lat: 13.736717, Long: 100.532478</span>
          </div>
        )}

        <button
          className="w-full mt-4 py-3 rounded-xl text-white font-semibold text-sm"
          style={{ backgroundColor: "#F29A4E" }}
          onClick={handleSubmit}
        >
          Submit Confirmed
        </button>

        <img src="capibara_san.png" alt="capibara"></img>
      </div>
    </div>
  );
}
