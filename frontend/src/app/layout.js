import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Sistema Hospitalario",
  description: "Gestión de pacientes - Hospital General",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          bg-[#f9fafb] text-gray-800 antialiased min-h-screen flex flex-col
        `}
      >
        <main className="flex-grow w-full h-full">
          {children}
        </main>
      </body>
    </html>
  );
}
