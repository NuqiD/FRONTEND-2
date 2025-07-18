import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react";

export default function OTPSetup() {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      router.replace("/login");
      return;
    }

    // Send POST request to generate OTP
    fetch("https://tactic.chatngo.net/api/auth/otp/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: parseInt(userId) }), // or just userId if backend accepts string
    })
      .then((res) => res.json())
      .then((data) => {
        // If backend returns { otpauth_url: "otpauth://..." }
        setQrCodeValue(data.otpauth_url);
      })
      .catch((err) => {
        console.error("Failed to fetch QR code", err);
      });
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-semibold mb-4">Scan this QR Code</h1>
      {qrCodeValue ? (
        <QRCodeCanvas value={qrCodeValue} size={256} />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </div>
  );
}