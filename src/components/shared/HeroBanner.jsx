import { useState, useEffect } from 'react';
import { BANNERS } from '../../data/bannerData';
import styles from './HeroBanner.module.scss';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Auto-rotación del carousel
  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 5000); // Cambiar cada 5 segundos

    return () => clearInterval(timer);
  }, [isAutoplay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    // Reanudar autoplay después de 10 segundos
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const currentBanner = BANNERS[currentSlide];

  return (
    <div className={styles.carousel}>
      {/* Slides */}
      <div className={styles.slidesContainer}>
        {BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{
              backgroundImage: banner.backgroundImage,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className={styles.overlay}>
              <div className={styles.content}>
                <p className={styles.subtitle}>{banner.subtitle}</p>
                <h2 className={styles.title}>{banner.title}</h2>
                <div className={styles.highlight}>{banner.highlight}</div>
                <button className={styles.ctaBtn}>{banner.cta}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación izquierda y derecha */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={goToPrevious}>
        ‹
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={goToNext}>
        ›
      </button>

      {/* Indicadores de puntos */}
      <div className={styles.indicators}>
        {BANNERS.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mostrar número de slide actual */}
      <div className={styles.slideCounter}>
        {currentSlide + 1} / {BANNERS.length}
      </div>
    </div>
  );
}
