import Image from "next/image";

export default function Home() {
  return (
   <div>
      <h1>Welcome to My Next.js App!</h1>
      <p>This is the home page.</p>
      <Image
        src="/my-app/src/app/favicon.ico"
        alt="Next.js Logo"
        width={200}
        height={100}
      />
   </div>
  );
}
