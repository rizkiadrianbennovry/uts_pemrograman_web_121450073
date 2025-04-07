// Navbar.js
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar({ dark, setDark }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <h2 className={styles.logo}>Toko Thrifting</h2>
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/favorites" className={styles.link}>Favorites</Link>
        </div>
      </div>
      <button className={styles.toggleBtn} onClick={() => setDark(prev => !prev)}>
        {dark ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
