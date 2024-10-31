import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { FloatingDockComponent } from "@/components/flotingDock/page";
import CanvasCursor from "@/components/fancyCursor/canvas-cursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bishal Portfolio",
  description: "Developed by Bishal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased relative`}>
        {children}
        <FloatingDockComponent />
        <CanvasCursor />
      </body>
    </html>
  );
}
