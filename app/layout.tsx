import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EndirimAxtar - Qiymət Müqayisəsi",
  description: "Bakı marketlərində məhsul qiymətlərini müqayisə edin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
