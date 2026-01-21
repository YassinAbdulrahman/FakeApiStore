"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const getProducts = async () => {
    const responese = await fetch("https://api.escuelajs.co/api/v1/products");
    return responese.json();
  };
  const getCategory = async () => {
    const responese = await fetch("https://api.escuelajs.co/api/v1/categories");
    return responese.json();
  };
  const getProductInCategory = async (id) => {

    const responese = await fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
    );
    return responese.json();
  };

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products" ,selectedCategory],
    queryFn: async () => selectedCategory
      ? getProductInCategory(selectedCategory)
      : getProducts(),
  });
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
  return (
    <>
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
                    product.images?.[0] || "https://placehold.co/600x400/png"
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
                <button
                  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
