import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 12; // Diperbanyak dari 6 ke 12

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getData() {
      const data = await fetchProducts();

      // Gandakan produk agar lebih banyak (x3)
      let extended = [];
      for (let i = 0; i < 3; i++) {
        extended = extended.concat(
          data.map((item) => ({
            ...item,
            id: `${item.id}-${i}`, // ID unik biar tidak crash
          }))
        );
      }

      setProducts(extended);
      setFilteredProducts(extended);
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Product List</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "300px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <div
        style={{
          maxHeight: "calc(100vh - 250px)",
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{
              padding: "5px 10px",
              margin: "0 5px",
              background: page === currentPage ? "#333" : "#eee",
              color: page === currentPage ? "#fff" : "#000",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
