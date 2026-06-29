document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // 2. Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // 3. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = target.getBoundingClientRect().top + window.pageYOffset - 75;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });

    // 4. Drag-to-scroll carousel
    const carousel = document.getElementById('carousel');
    if (carousel) {
        let isDown = false, startX, scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'grab'; });
        carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'grab'; });
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        let touchStartX = 0, touchScrollLeft = 0;
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = carousel.scrollLeft;
        }, { passive: true });
        carousel.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX;
            const walk = (touchStartX - x) * 1.5;
            carousel.scrollLeft = touchScrollLeft + walk;
        }, { passive: true });
    }
});
