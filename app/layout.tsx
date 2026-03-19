import "./globals.css";

export const metadata = {
  title: "AI-verkstan",
  description: "Anmälan till AI-bootcamp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}