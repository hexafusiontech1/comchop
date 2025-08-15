document.addEventListener("DOMContentLoaded", () => {
      const slider = {
        cube: document.querySelector(".cube"),
        slides: document.querySelectorAll(".cube-face"),
        markers: document.querySelectorAll(".timeline-marker"),
        prevBtn: document.querySelector(".arrow-prev"),
        nextBtn: document.querySelector(".arrow-next"),
        progress: document.querySelector(".timeline-progress"),
        currentSlideEl: document.querySelector(".current-slide"),
        totalSlidesEl: document.querySelector(".total-slides"),
        currentSlide: 0,
        slideCount: document.querySelectorAll(".cube-face").length,
        autoplayInterval: null,
        autoplayDelay: 8000,
        isAnimating: false,

        init: function () {
          if (this.totalSlidesEl) {
            this.totalSlidesEl.textContent = this.formatSlideNumber(this.slideCount);
          }

          if (this.prevBtn) {
            this.prevBtn.addEventListener("click", () => this.prevSlide());
          }
          if (this.nextBtn) {
            this.nextBtn.addEventListener("click", () => this.nextSlide());
          }

          if (this.markers.length > 0) {
            this.markers.forEach((marker) => {
              marker.addEventListener("click", () => {
                const slideIndex = parseInt(marker.getAttribute("data-index"));
                this.goToSlide(slideIndex);
              });
            });
          }

          this.startAutoplay();

          const heroSlider = document.querySelector(".hero-slider");
          if (heroSlider) {
            heroSlider.addEventListener("mouseenter", () => this.stopAutoplay());
            heroSlider.addEventListener("mouseleave", () => this.startAutoplay());
          }

          this.updateProgress();

          document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
              this.prevSlide();
            } else if (e.key === "ArrowRight") {
              this.nextSlide();
            }
          });

          this.setupTouchEvents();
        },

        goToSlide: function (index) {
          if (this.isAnimating || !this.cube) return;
          this.isAnimating = true;

          // Remove active class from current slide
          if (this.slides[this.currentSlide]) {
            this.slides[this.currentSlide].classList.remove("active");
          }
          if (this.markers[this.currentSlide]) {
            this.markers[this.currentSlide].classList.remove("active");
          }

          this.currentSlide = index;
          if (this.currentSlide < 0) {
            this.currentSlide = this.slideCount - 1;
          } else if (this.currentSlide >= this.slideCount) {
            this.currentSlide = 0;
          }

          // Calculate rotation based on current slide
          const rotationY = -this.currentSlide * 72;
          this.cube.style.transform = `rotateY(${rotationY}deg)`;

          // Add active class to new slide after a short delay
          setTimeout(() => {
            if (this.slides[this.currentSlide]) {
              this.slides[this.currentSlide].classList.add("active");
            }
            if (this.markers[this.currentSlide]) {
              this.markers[this.currentSlide].classList.add("active");
            }
            if (this.currentSlideEl) {
              this.currentSlideEl.textContent = this.formatSlideNumber(this.currentSlide + 1);
            }
            this.updateProgress();

            setTimeout(() => {
              this.isAnimating = false;
            }, 1200);
          }, 300);

          this.stopAutoplay();
          this.startAutoplay();
        },

        nextSlide: function () {
          this.goToSlide(this.currentSlide + 1);
        },

        prevSlide: function () {
          this.goToSlide(this.currentSlide - 1);
        },

        startAutoplay: function () {
          this.stopAutoplay();
          this.autoplayInterval = setInterval(() => {
            this.nextSlide();
          }, this.autoplayDelay);
        },

        stopAutoplay: function () {
          clearInterval(this.autoplayInterval);
        },

        updateProgress: function () {
          if (this.progress) {
            const progressPercentage = (this.currentSlide / (this.slideCount - 1)) * 100;
            this.progress.style.width = `${progressPercentage}%`;
          }
        },

        formatSlideNumber: function(number) {
          return number < 10 ? `0${number}` : `${number}`;
        },

        setupTouchEvents: function () {
          const heroSlider = document.querySelector(".hero-slider");
          if (!heroSlider) return;

          let touchStartX = 0;
          let touchEndX = 0;

          heroSlider.addEventListener(
            "touchstart",
            (e) => {
              touchStartX = e.changedTouches[0].screenX;
            },
            { passive: true }
          );

          heroSlider.addEventListener(
            "touchend",
            (e) => {
              touchEndX = e.changedTouches[0].screenX;
              this.handleSwipe();
            },
            { passive: true }
          );

          this.handleSwipe = function () {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
              this.nextSlide();
            } else if (touchEndX > touchStartX + swipeThreshold) {
              this.prevSlide();
            }
          };
        },
      };

      slider.init();

      // Parallax effect for background images
      window.addEventListener("mousemove", (e) => {
        const activeSlide = document.querySelector('.cube-face.active');
        if (!activeSlide) return;

        const activeBackground = activeSlide.querySelector('.slide-bg');
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;

        activeBackground.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
      });

      // Button hover effects
      document.querySelectorAll(".btn").forEach((btn) => {
        btn.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-3px)";
        });
        btn.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(0)";
        });
      });
    });