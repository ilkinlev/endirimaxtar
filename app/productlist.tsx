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
    <div>
      {products.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
