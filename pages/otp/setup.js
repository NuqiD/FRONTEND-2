// pages/otp/setup.js
import { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

export default function OTPSetup() {
  const [otpauthUrl, setOtpauthUrl] = useState("");
  const [userId, setUserId] = useState(null); // Ideally, get this from your auth context or localStorage
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id"); // Or fetch from context/session
    setUserId(storedUserId);

    if (storedUserId) {
      fetch("https://tactic.chatngo.net/api/auth/otp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: storedUserId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.otpauth_url) {
            setOtpauthUrl(data.otpauth_url);
          }
        })
        .catch((err) => {
          console.error("Error generating OTP:", err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Scan QR with Google Authenticator</h2>
      {otpauthUrl ? (
        <>
          <QRCode value={otpauthUrl} />
          <p className="mt-4 text-sm text-gray-600">
            Scan this QR code in your Google Authenticator app
          </p>
          <button
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push("/otp/verify")}
          >
            Continue to Verification
          </button>
        </>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
}