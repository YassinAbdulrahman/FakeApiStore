import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-between bg-amber-300 h-[100vh] border-2 border-black rounded-[20px] ">
      <div className="w-full flex items-center justify-center ">
        <div>
          <h3 className="font-bold text-2xl text-center">
            Test Platzi Fake Store API 
          </h3>
          <p className="text-center text-xl font-semibold  mt-4">
            The Platzi Fake Store API is a free, public REST API designed for
            testing and learning purposes. It provides realistic e-commerce data
            such as products, categories, users, and images, making it ideal for
            frontend practice, API integration, and state management testing.
          </p>
          <div className="w-full flex items-center justify-center">
            <button className="bg-black text-white mt-4 px-4 py-2 rounded-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Image
          className=" object-contain"
          src="photo.svg"
          alt="Landing Photo"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
}
