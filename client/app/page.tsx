"use client";

import { useEffect, useState } from "react";
import liff from "@line/liff";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    note: "",
  });

  useEffect(() => {
    const main = async () => {
      try {
        // 1. Initialize LIFF 
        await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });

        // 2. เช็คว่า Login หรือยัง ถ้ายังให้ Login อัตโนมัติ
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          // 3. ถ้า Login แล้ว ดึงข้อมูล Profile มาแสดงเบื้องต้น
          const userProfile = await liff.getProfile();
          setProfile(userProfile);
          setFormData((prev) => ({ ...prev, name: userProfile.displayName }));
        }
      } catch (err) {
        console.error("LIFF Initialization failed", err);
      }
    };

    main();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Submitted:", formData);
    // เราสามารถใช้ liff.sendMessages() เพื่อส่งข้อมูลกลับเข้าแชท หรือส่งไปที่ API ก็ได้
    alert("บันทึกข้อมูลสำเร็จ!");
  };

  if (!profile) return <div className="p-10 text-center">กำลังโหลดข้อมูล...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        {/* User Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile.pictureUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border-2 border-green-500"
          />
          <h1 className="mt-2 text-xl font-bold">สวัสดีคุณ {profile.displayName}</h1>
          <p className="text-gray-500 text-sm">กรุณากรอกข้อมูลด้านล่าง</p>
        </div>

        {/* Data Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="08X-XXXXXXX"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">หมายเหตุ</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
          >
            ส่งข้อมูล
          </button>
        </form>
      </div>
    </main>
  );
}