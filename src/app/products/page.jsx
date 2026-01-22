"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchByTitle, setSearchByTitle] = useState("");

  // Fetaching Product
  const getProducts = async () => {
    const responese = await fetch("https://api.escuelajs.co/api/v1/products");
    return responese.json();
  };

  // Fetaching Category
  const getCategory = async () => {
    const responese = await fetch("https://api.escuelajs.co/api/v1/categories");
    return responese.json();
  };

  // Fetaching Selecting Category
  const getProductInCategory = async (id) => {
    const responese = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
    );
    return responese.json();
  };

  // Fetaching Searching By Title
  const getProductInTitle = async (title) => {
    const responese = await fetch(
      `https://api.escuelajs.co/api/v1/products/?title=${title}`,
    );
    return responese.json();
  };

  // Using useQuery For Product to get Data Conditionally
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", selectedCategory, searchByTitle],
    queryFn: async () =>
      selectedCategory
        ? getProductInCategory(selectedCategory)
        : searchByTitle
          ? getProductInTitle(searchByTitle)
          : getProducts(),
  });


  // Using useQuery For Product to get Data and others
  const { data: categories, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategory(),
  });


  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error occurred</h1>;
  }
  
  const handleSearch = (e) => {
    setSearchByTitle(e.target.value);
  };
  return (
    <>
      <form className="flex h-12 w-[50%] mx-auto my-5  items-center gap-2 overflow-hidden rounded-full border border-gray-500/30 bg-white">
        <input
          type="email"
          placeholder="Search for Product By it's Title"
          className="h-full bg-transparent w-full pl-6 text-sm placeholder-gray-500 outline-none"
          value={searchByTitle}
          onChange={handleSearch}
        />
      </form>

      <div className="flex justify-center items-center flex-wrap">
        {isPending ? (
          <h2>Loading...</h2>
        ) : (
          categories.map((category) => {
            return (
              <button
                data-ripple-light="true"
                className="rounded-md mb-3 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                }}
              >
                {category.name}
              </button>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6  justify-items-center">
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96"
            >
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <Image
                  src={
                    product.images[1]
                      ? product.images[1]
                      : "https://placehold.co/600x400/png"
                  }
                  className="w-full h-full object-cover object-center"
                  alt="card-image"
                  width={100}
                  height={100}
                />
              </div>
              <div className="p-4">
                <span className="block border-2 border-solid border-b-black p-1 mb-2   w-fit shadow-2xl">
                  {product.category.name}
                </span>
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                  {product.title}
                </h6>
                <p className="text-slate-600 leading-normal font-light">
                  {product.description}
                </p>
                <p className="text-slate-600 leading-normal font-light">
                  ${product.price}
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2">
                <Link href={`/products/${product.id}`}>
                  <button
                    className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
