import Header from '../components/shared/Header';
import HeroBanner from '../components/shared/HeroBanner';
import ProductList from '../components/products/ProductList';
import styles from './HomePage.module.scss';

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <Header />

      {/* Hero Carousel */}
      <HeroBanner />

      {/* Productos */}
      <section className={styles.products}>
        <ProductList />
      </section>
    </div>
  );
}
