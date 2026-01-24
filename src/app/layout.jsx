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
        <header className=" text-white ">
          <nav>
            <Link className="text-base bg-black text-white font-[bolder] transition-[cubic-bezier(0.68,-0.55,0.265,1.55)] duration-[0.4s] shadow-[-5px_5px_0px_0px_yellow] px-[2em] py-[0.8em] rounded-[1em] border-[3px] border-solid border-[yellow] hover:translate-x-[5px] hover:translate-y-[-5px]" href="/products">Products</Link>
             <Link className="text-base bg-black text-white font-[bolder] transition-[cubic-bezier(0.68,-0.55,0.265,1.55)] duration-[0.4s] shadow-[-5px_5px_0px_0px_yellow] px-[2em] py-[0.8em] rounded-[1em] border-[3px] border-solid border-[yellow] hover:translate-x-[5px] hover:translate-y-[-5px]" href="/">Home</Link>
          </nav>
        </header>
        <QueryClientProvider client={queryClient}>
          <main className="container">{children}</main>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <footer className="text-center ">Footer</footer>
      </body>
    </html>
  );
}
