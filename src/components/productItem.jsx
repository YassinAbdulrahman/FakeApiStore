import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ product }) {
  return (
    <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded shadow-xs">
      <Link href={`/products/${product.id}`}>
        <Image className="w-full m-auto" src="https://flowbite.com/docs/images/products/apple-watch.png" alt={`product-${product.id}`} height={200} width={200} loading="eager"/>
      </Link>
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded-sm">
           {product.category.name}
          </span>
        </div>
        <Link href="#">
          <h5 className="text-xl text-heading font-semibold tracking-tight">
            {product.title}
          </h5>
        </Link>
        <div className="flex items-center justify-between mt-6">
          <span className="text-3xl font-extrabold text-heading">${product.price}</span>
        </div>
      </div>
    </div>
  );
}
