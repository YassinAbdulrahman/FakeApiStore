"use client";
import CategoryItem from "@/components/categoryItem";
import ProductList from "@/components/productlist";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ShimmerPostList } from "react-shimmer-effects";

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
    return (
      <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={4} gap={30} />
    );
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
        {categories?.length > 0 ? (
          categories?.map((category) => {
            return (
              <CategoryItem key={category.id} category={category} setSelectedCategory={setSelectedCategory}/>
            );
          })
        ) : <h2>There is No Category Available</h2>}
      </div>

      <div>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <h2>There is No Products Available</h2>
        )}
      </div>
    </>
  );
}
