import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page since registration is admin-only
    router.replace("/auth/login");
  }, [router]);

  return null;
}
