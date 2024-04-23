export const metadata = {
  title: "Admin",
  description: "Pagina de admin",
};

import WelcomeBannerAdmin from "./welcome-banner-admin";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { userisadmin } from "@/app/actions/auth";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { success, message } = await userisadmin();
      if (!success) {
        router.push("/");
      }
      if (!message) {
        router.push("/");
      }
    }
    fetchData();
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <WelcomeBannerAdmin />
    </div>
  );
}
