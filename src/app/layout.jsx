"use client";
import Link from "next/link";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="text-white">
          <nav>
            <Link href="/products">Products</Link>
          </nav>
        </header>
        <QueryClientProvider client={queryClient}>
          <main className="container">{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <footer>footer</footer>
      </body>
    </html>
  );
}
