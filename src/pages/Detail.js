import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      const data = await fetchProducts();
      const selectedProduct = data.find((item) => item.id === parseInt(id));
      setProduct(selectedProduct);
      setLoading(false);
    }
    getProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.detailContainer}>
      <img className={styles.image} src={product.image} alt={product.title} />
      <div className={styles.info}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>Price: ${product.price}</p>
      </div>
    </div>
  );
}

export default Detail;
