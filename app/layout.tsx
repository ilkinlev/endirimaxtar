import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

// In layout.tsx
export const metadata: Metadata = {
  title: "EndirimAxtar - Bakı Marketlərində Qiymət Müqayisəsi",
  description:
    "Bakıda Bravo, BazarStore, Oba və Araz Market qiymətlərini müqayisə edin. Ən ucuz qiymətləri tapın və pul qənaət edin!",
  keywords:
    "endirim, qiymət müqayisəsi, bakı marketlər, bravo, bazarstore, oba, araz market",
  openGraph: {
    title: "EndirimAxtar - Qiymət Müqayisəsi",
    description: "Bakı marketlərində məhsul qiymətlərini müqayisə edin",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
