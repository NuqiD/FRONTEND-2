import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { QRCodeCanvas } from "qrcode.react"; // ✅ fixed import

export default function OTPSetup() {
  const [qrCodeValue, setQrCodeValue] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      router.replace("/login");
      return;
    }

    // Fetch the QR code value from the backend
    fetch(`https://tactic.chatngo.net/api/auth/otp/generate?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setQrCodeValue(data.qr_code); // The `qr_code` should be the string like "otpauth://..."
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