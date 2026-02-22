import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/navigation/Sidebar";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/api/react-query/QueryProvider";

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "과제 제출",
  description: "과제 제출",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          pretendard.className,
          "font-sans",
          "antialiased flex min-h-screen",
        )}
      >
        <QueryProvider>
          <Sidebar />
          <main className="flex-1 bg-gray-50 p-8">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
