import "./css/style.css";

import { Inter } from "next/font/google";
import Theme from "./theme-provider";
import AppProvider from "./app-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "CryptoCapoElite",
  description: "Venta de presales de criptomonedas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body
        className={`${inter.variable} font-inter antialiased bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400`}
      >
        <Theme>
          <AppProvider>
            <ToastContainer />
            {children}
          </AppProvider>
        </Theme>
      </body>
    </html>
  );
}
