import axios from "axios";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <main className="flex justify-center items-center w-auto max-w-6xl mx-auto px-4 ">
        <div className="flex flex-col gap-4 justify-between w-auto m-5 ">
          {products.map((item) => (
            <div className="border rounded-lg " key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
