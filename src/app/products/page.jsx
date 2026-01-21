'use client';
import ProductItem from "@/components/productItem";
import { useEffect, useState } from "react";

export default function ProductsPage() {
   const [products, setProducts] = useState([]);
   const [categories, setCategories] = useState([]);

  const getAllProducts = () => {
    const res =  fetch("https://api.escuelajs.co/api/v1/products").then((res) => res.json()).then((data)=>setProducts(data)).catch((error) => console.log("Error fetching products:", error));
  };
  const getAllCategories = () => {
    const res =  fetch("https://api.escuelajs.co/api/v1/categories").then((res) => res.json()).then((data)=>setCategories(data)).catch((error) => console.log("Error fetching categories:", error));
   
  };
  const getSpeicificCategory = (id) => {
    const res =  fetch(
      `https://api.escuelajs.co/api/v1/categories/${id}/products`,
    ).then((res) => res.json()).then((data)=>setProducts(data)).catch((error) => console.log("Error fetching category", error));
  };
  
  useEffect(() => {
    getAllProducts()
    getAllCategories()
  }, [])
  

  return (
    <div>
      <div className=" flex justify-center">
         {categories.map((category) => {
        return (
          <div key={category.id}>
            {category.name.length < 20 ? (
              <button className="btn-primary" key={category.id} onClick={(id)=>{getSpeicificCategory(category.id)}}>
                {category.name}
              </button>
            ) : undefined}
          </div>
        );
      })}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          return <ProductItem key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
