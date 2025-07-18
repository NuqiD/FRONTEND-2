import React, { useEffect, useState } from "react";

export default function OTPSetup({ username }) {
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    const fetchQrCode = async () => {
      const res = await fetch(`/api/proxy/otp/setup?username=${username}`);
      const blob = await res.blob();
      setQrUrl(URL.createObjectURL(blob));
    };
    fetchQrCode();
  }, [username]);

  return (
    <div>
      <h2>Scan this QR with Google Authenticator</h2>
      {qrUrl && <img src={qrUrl} alt="OTP QR Code" />}
    </div>
  );
}