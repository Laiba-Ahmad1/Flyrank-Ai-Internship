import "./globals.css";

export const metadata = {
  title: "Settings App",
  description: "User settings form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
