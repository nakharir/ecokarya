document.addEventListener("DOMContentLoaded", () => {
  // 1. Toggle Menu Navigasi (Responsif)
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Sembunyikan menu saat link diklik (di mobile)
  document.querySelectorAll("nav ul li a").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        nav.classList.remove("active");
      }
    });
  });

  // 2. Animasi Penghitung Statistik (Intersection Observer)
  const statsSection = document.querySelector(".our-mission");
  const stats = document.querySelectorAll(".stat .number");
  let animationStarted = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted) {
          stats.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-target"));
            animateCount(stat, 0, target, 2000); // Durasi 2 detik
          });
          animationStarted = true;
          observer.unobserve(statsSection);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (statsSection) {
    observer.observe(statsSection);
  }

  function animateCount(element, start, end, duration) {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };

    window.requestAnimationFrame(step);
  }

  // --- LOGIKA UNTUK GALERI PRODUK ---
  const allGallerySections = document.querySelectorAll(".product-gallery");
  // Semua section utama kecuali hero, testimonials, dan kontak (karena kontak selalu ada di bawah)
  const allMainSections = document.querySelectorAll(
    "section:not(.product-gallery):not(.hero):not(.testimonials):not(.contact-info-revised)"
  );
  const catalogueSection = document.getElementById("produk");

  // Fungsi untuk menyembunyikan semua galeri
  const hideAllGalleries = () => {
    allGallerySections.forEach((gal) => gal.classList.add("hidden"));
  };

  // Fungsi untuk menampilkan semua section utama
  const showAllMainSections = () => {
    allMainSections.forEach((sec) => sec.classList.remove("hidden"));
  };

  // 3. Scroll Behavior (Smooth Scroll & Logika Galeri)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Jika target adalah salah satu galeri
      if (targetId.startsWith("#galeri")) {
        e.preventDefault();

        // Sembunyikan semua bagian utama
        allMainSections.forEach((sec) => sec.classList.add("hidden"));

        // Sembunyikan semua galeri, lalu tampilkan yang dituju
        hideAllGalleries();
        const targetGallery = document.querySelector(targetId);
        if (targetGallery) {
          targetGallery.classList.remove("hidden");
        }

        // Scroll ke galeri yang ditampilkan
        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Jika target adalah "Kembali ke Katalog"
      else if (this.classList.contains("back-to-catalogue")) {
        e.preventDefault();

        // Tampilkan kembali semua bagian utama
        showAllMainSections();

        // Sembunyikan semua galeri
        hideAllGalleries();

        // Scroll ke Katalog
        catalogueSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      // Untuk link navigasi biasa
      else {
        // Untuk navigasi umum, pastikan semua section utama terlihat dan galeri tersembunyi
        showAllMainSections();
        hideAllGalleries();

        document.querySelector(targetId).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Pastikan semua galeri tersembunyi saat pertama kali dimuat
  hideAllGalleries();
});
