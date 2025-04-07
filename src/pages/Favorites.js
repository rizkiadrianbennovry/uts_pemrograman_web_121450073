import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Favorite Products</h1>
      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
