import Header from '../components/shared/Header';
import HeroBanner from '../components/shared/HeroBanner';
import ProductList from '../components/products/ProductList';
import { CATEGORY_SUMMARY, DUMMY_PRODUCTS } from '../data/dummyData';
import { buildCategoryTree, buildProductRanking } from '../helpers/commerceStructures';
import styles from './HomePage.module.scss';

export default function HomePage() {
  const rankedProducts = buildProductRanking(DUMMY_PRODUCTS).slice(0, 3);
  const categoryTree = buildCategoryTree(CATEGORY_SUMMARY.map((category) => category.name));

  return (
    <div className={styles.homePage}>
      <Header />
      <HeroBanner />

      <section className={styles.trustBar} aria-label="Indicadores de confianza">
        <article>
          <strong>10+</strong>
          <span>productos curados</span>
        </article>
        <article>
          <strong>5</strong>
          <span>estructuras de datos aplicadas</span>
        </article>
        <article>
          <strong>24/7</strong>
          <span>chat preparado en tiempo real</span>
        </article>
        <article>
          <strong>Firebase</strong>
          <span>login, registro y base de datos</span>
        </article>
      </section>

      <section className={styles.categories} id="categorias">
        <div className={styles.sectionHeader}>
          <span>Categorias</span>
          <h2>Compra por tipo de producto</h2>
          <p>El arbol binario ordena las categorias alfabeticamente para navegacion consistente.</p>
        </div>
        <div className={styles.categoryGrid}>
          {CATEGORY_SUMMARY.map((category) => (
            <a href={`/#catalogo`} className={styles.categoryCard} key={category.name}>
              <img src={category.image} alt={category.label} />
              <div>
                <strong>{category.label}</strong>
                <span>{category.count} productos</span>
              </div>
            </a>
          ))}
        </div>
        <p className={styles.structureNote}>
          Recorrido in-order: {categoryTree.inOrder().join(' · ')}
        </p>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <span>Ranking</span>
          <h2>Mejor calificados</h2>
          <p>Un max-heap prioriza productos por calificacion y numero de reseñas.</p>
        </div>
        <div className={styles.featuredGrid}>
          {rankedProducts.map((product, index) => (
            <article key={product.id}>
              <span>#{index + 1}</span>
              <img src={product.image} alt={product.name} />
              <div>
                <strong>{product.name}</strong>
                <small>{product.rating} / 5 · {product.reviews} reseñas</small>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.products} id="catalogo">
        <ProductList />
      </section>
    </div>
  );
}
