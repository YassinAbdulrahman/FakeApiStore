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
    <div>
       <Image src={singleProduct.images[0]} alt={singleProduct.title} width={500} height={500}/>
       <h2>{singleProduct.title}</h2>
       <p>{singleProduct.price}</p>
       <p>{singleProduct.description}</p>
       <p>{singleProduct.category.name}</p>
    </div>
  );
}
