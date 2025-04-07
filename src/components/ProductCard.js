import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoriteSlice";
import styles from "./ProductCard.module.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFav = favorites.find((item) => item.id === product.id);

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className={styles.actions}>
        <Link to={`/detail/${product.id}`}>View Details</Link>
        <button onClick={() => dispatch(toggleFavorite(product))}>
          {isFav ? "💔 Remove" : "❤️ Favorite"}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
