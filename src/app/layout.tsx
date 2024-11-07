import type { Metadata } from "next";
import Provider from "./client-provider";
import "./index.css";

export const metadata: Metadata = {
  title: "Zeph Chambers",
  description: "Zeph Chambers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
