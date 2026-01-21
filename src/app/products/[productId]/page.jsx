export default async function productDetail({params}){

    const api_url = 'https://api.escuelajs.co/api/v1/products';

    const { productId } = await params;
    
    const res = await fetch(`${api_url}/${Number(productId)}`);
    const product = await res.json();
    console.log(product);
    
      return (
        <div>
            <h1>{product.title}</h1>
        </div>
      )
}