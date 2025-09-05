document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let current = 0;
    let interval;
    let isSliding = false;

    // Create dots
    images.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            if (current !== i) showImage(i, i > current ? 'left' : 'right');
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots(idx) {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }

    function showImage(idx, direction = 'left') {
        if (isSliding) return;
        isSliding = true;

        images.forEach((img, i) => {
            img.classList.remove('active', 'slide-out-left', 'slide-in-right', 'slide-out-right', 'slideIn');
            img.style.opacity = '0';
        });

        const prev = current;
        current = idx;

        if (direction === 'left') {
            images[prev].classList.add('slide-out-left');
            images[current].classList.add('active', 'slideIn');
        } else {
            images[prev].classList.add('slide-out-right');
            images[current].classList.add('active', 'slide-in-right');
        }

        images[current].style.opacity = '1';
        updateDots(current);

        setTimeout(() => {
            images.forEach((img, i) => {
                img.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slideIn');
                img.style.opacity = i === current ? '1' : '0';
                img.classList.toggle('active', i === current);
            });
            isSliding = false;
        }, 700);
    }

    function nextImage() {
        let next = (current + 1) % images.length;
        showImage(next, 'left');
    }

    function prevImage() {
        let prev = (current - 1 + images.length) % images.length;
        showImage(prev, 'right');
    }

    nextBtn.addEventListener('click', () => {
        nextImage();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevImage();
        resetInterval();
    });

    function startInterval() {
        interval = setInterval(nextImage, 4000);
    }

    function resetInterval() {
        clearInterval(interval);
        startInterval();
    }

    // Initial state
    images.forEach((img, i) => {
        img.classList.toggle('active', i === current);
        img.style.opacity = i === current ? '1' : '0';
    });
    startInterval();
});