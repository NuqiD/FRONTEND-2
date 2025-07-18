// services/otpAuth.js
export const verifyOtp = async (otp) => {
  const username = localStorage.getItem("otpUsername");
  const accessToken = localStorage.getItem("preAuthToken");

  const response = await fetch("http://192.168.0.21:8000/api/otp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      username,
      otp,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "OTP verification failed");
  }

  return data;
};