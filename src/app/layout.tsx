import "./globals.css";

import { geistMono, geistSans } from "./fonts";

import type { Metadata } from "next";
import { ThemeProvider } from "@/app/theme-provider";

export const metadata: Metadata = {
  title: "UTMIST Projects Platform Demo",
  description: "Dashboard + Kanban + Gantt + Settings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
