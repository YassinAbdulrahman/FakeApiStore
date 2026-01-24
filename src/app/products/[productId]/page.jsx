"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import * as React from "react";
export default function productDetail({ params }) {
  const { productId } = React.use(params);

  const getSingleProduct = async (productId) => {
    const responese = await fetch(
      `https://api.escuelajs.co/api/v1/products/${productId}`,
    );
    return responese.json();
  };
  const {
    data: singleProduct,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["singleProduct"],
    queryFn: async () => await getSingleProduct(productId),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error occurred</h1>;
  }  
  console.log(singleProduct);
  
  return (
    <div className="flex flex-col gap-4">
       <Image  className="object-contain" src={singleProduct?.images?.[0] || "/placeholder.png"} alt={singleProduct.title} width={500} height={500}/>
       <h2 className="text-sm text-gray-500 uppercase tracking-wide">{singleProduct.title}</h2>
       <p className="text-3xl font-bold text-gray-900">${singleProduct.price}</p>
       <p className="text-2xl font-semibold text-green-600">{singleProduct.description}</p>
       <p className="text-gray-700 leading-relaxed">{singleProduct.category.name}</p>
    </div>
  );
}
