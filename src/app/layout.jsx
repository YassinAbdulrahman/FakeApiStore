import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="text-white">
          <nav>
            <Link href="/products">Products</Link>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer>footer</footer>
      </body>
    </html>
  );
}
