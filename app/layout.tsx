import CanvasCursor from "@/components/fancyCursor/canvas-cursor";
import { FloatingDockComponent } from "@/components/flotingDock/page";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bishal | Full Stack Developer",
  description: "Developed by Bishal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rajdhani.className} dark antialiased relative max-w-[1400px] mx-auto bg-black`}
      >
        {children}
        <FloatingDockComponent />
        <CanvasCursor />
      </body>
    </html>
  );
}
