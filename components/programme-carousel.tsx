'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ThemeIcon } from '@/components/theme-icon';

export interface CarouselProgramme {
  id: string;
  number: string;
  title: string;
  summary: string;
  category: string;
  kind: string;
  image?: string;
}

const programmeImageMap: Record<string, string> = {
  'senior-medical-felicitation': '/images/programmes/programme-01-hd.png',
  'healthcare-awards': '/images/programmes/programme-02-hd.png',
  'nursing-education-awards': '/images/programmes/programme-03-award-v2.png',
  'nursing-quality-workshop': '/images/programmes/workshop-healthcare-excellence.png',
  'clinical-procedures': '/images/programmes/programme-05-hd.png',
  'emergency-trainings': '/images/programmes/programme-06-hd.png',
  'environmental-sustainability': '/images/programmes/programme-07-hd.png',
  'ai-enabled-demonstrations': '/images/programmes/programme-08-hd.png',
  'innovation-hackathon': '/images/programmes/programme-09-hd.png',
  'quiz-innovation-awards': '/images/programmes/programme-10-hd.png',
  'motivational-lecture': '/images/programmes/programme-11-hd.png',
  'cultural-programme': '/images/programmes/programme-12-hd.png',
  'student-innovation-exhibition': '/images/programmes/programme-13-hd.png',
  'health-lab-tech-exhibition': '/images/programmes/programme-14-hd.png',
  'group-lunch-networking': '/images/programmes/programme-15-hd.png',
};

const kindLabelMap: Record<string, string> = {
  excellence: 'Recognition & Excellence',
  skills: 'Education & Clinical Skills',
  technology: 'AI & Digital Health',
  innovation: 'Innovation & Research',
  quality: 'Quality & Patient Safety',
};

export function ProgrammeCarousel({ programmes }: { programmes: CarouselProgramme[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Touch tracking for mobile swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible cards count
  useEffect(() => {
    function updateVisibleCards() {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1);
        setIsMobile(true);
      } else if (width < 1024) {
        setVisibleCards(2);
        setIsMobile(false);
      } else {
        setVisibleCards(3);
        setIsMobile(false);
      }
    }
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards, { passive: true });
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, programmes.length - visibleCards);

  // Ensure index stays clamped if screen resizes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Smooth auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, nextSlide]);

  // Mouse hover handlers - only activate on devices with real hover capability
  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setIsPaused(false);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipe = 35;
    if (distance > minSwipe) {
      nextSlide();
    } else if (distance < -minSwipe) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Calculate transform offset matching CSS gap
  const getTransform = () => {
    if (visibleCards === 1) {
      return `translateX(calc(-${currentIndex} * (100% + 16px)))`;
    }
    if (visibleCards === 2) {
      return `translateX(calc(-${currentIndex} * (100% + 20px) / 2))`;
    }
    return `translateX(calc(-${currentIndex} * (100% + 24px) / 3))`;
  };

  // Pagination calculations
  const totalPages = Math.ceil(programmes.length / visibleCards);
  const activeDotIndex = Math.min(
    Math.round((currentIndex / (maxIndex || 1)) * (totalPages - 1)) || 0,
    totalPages - 1
  );

  return (
    <div
      className="programme-carousel-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Programme highlights carousel"
    >
      <div className="programme-carousel-viewport">
        <div
          className="programme-carousel-track"
          style={{
            transform: getTransform(),
          }}
        >
          {programmes.map((p) => {
            const imgSrc = p.image || programmeImageMap[p.id] || '/images/programmes/programme-01-hd.png';
            const kindLabel = kindLabelMap[p.kind] || p.category;

            return (
              <div
                className="programme-carousel-slide"
                key={p.id}
              >
                <Link
                  href={`/programme#${p.id}`}
                  className={`modern-programme-card card-kind-${p.kind}`}
                >
                  {/* Top Image Window with Floating Badges */}
                  <div
                    className="programme-card-media"
                    style={{
                      backgroundImage: `url('${imgSrc}')`,
                    }}
                  >
                    <div className="programme-card-overlay" />
                    <span className="programme-card-badge">{p.category}</span>
                    <span className="programme-card-index">#{p.number}</span>
                  </div>

                  {/* Modern Body */}
                  <div className="programme-card-content">
                    <div className="programme-card-meta">
                      <span className="programme-kind-icon">
                        <ThemeIcon kind={p.kind} />
                      </span>
                      <span className="programme-kind-label">{kindLabel}</span>
                    </div>

                    <h3 className="programme-card-title">{p.title}</h3>
                    <p className="programme-card-desc">{p.summary}</p>

                    <div className="programme-card-action">
                      <span>View Details</span>
                      <span className="action-arrow">→</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows & Controls */}
      <div className="programme-carousel-controls">
        <button
          type="button"
          className="carousel-nav-btn prev"
          onClick={prevSlide}
          aria-label="Previous programme"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* On mobile: compact elegant counter; on desktop: dots */}
        {isMobile ? (
          <div className="programme-carousel-counter" aria-label={`Showing programme ${currentIndex + 1} of ${programmes.length}`}>
            <strong>{currentIndex + 1}</strong>
            <span>/</span>
            <span>{programmes.length}</span>
          </div>
        ) : (
          <div className="programme-carousel-dots" role="tablist" aria-label="Carousel pages">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
              const targetIndex = Math.min(pageIdx * visibleCards, maxIndex);
              const isActive = pageIdx === activeDotIndex;
              return (
                <button
                  key={pageIdx}
                  type="button"
                  className={`carousel-dot ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(targetIndex)}
                  aria-label={`Go to slide page ${pageIdx + 1}`}
                  aria-selected={isActive}
                  role="tab"
                />
              );
            })}
          </div>
        )}

        <button
          type="button"
          className="carousel-nav-btn next"
          onClick={nextSlide}
          aria-label="Next programme"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Explore All Programmes button */}
      <div className="programme-carousel-footer">
        <Link href="/programme" className="button programme-explore-btn">
          Explore All Programmes ↗
        </Link>
      </div>
    </div>
  );
}
