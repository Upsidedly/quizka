import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "quizka",
  description: "Made in 15 minutes so I don't flop exams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <MantineProvider
            theme={{
              colors: {
                // override dark colors to change them for all components
                dark: ["#d5d7e0", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
              },
            }}
          >
            {children}
          </MantineProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
