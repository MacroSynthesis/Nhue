// Add carousel styles dynamically
function addCarouselStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .carousel-container {
            position: relative;
            max-width: 1000px;
            margin: 2rem auto;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 4px 10px rgba(0,0,0,.2);
        }
        .carousel-track {
            display: flex;
            transition: transform .5s ease-in-out;
            position: relative;
        }
        .carousel-item {
            min-width: 100%;
            flex-shrink: 0;
        }
        .carousel-item img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            border-radius: 12px;
        }
        .carousel-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,.5);
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
            padding: .5rem 1rem;
            border-radius: 50%;
            z-index: 10;
            transition: background .3s;
        }
        .carousel-btn:hover {
            background: rgba(0,0,0,.8);
        }
        .carousel-btn.prev {
            left: 15px;
        }
        .carousel-btn.next {
            right: 15px;
        }
        .carousel-indicators {
            display: flex;
            justify-content: center;
            margin-top: 10px;
            gap: 8px;
        }
        .carousel-indicators button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: #bbb;
            cursor: pointer;
            transition: background .3s;
        }
        .carousel-indicators button.active {
            background: #333;
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add carousel styles
    addCarouselStyles();

    const carousel = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsContainer = document.querySelector('.carousel-indicators');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Create indicator dots
    slides.forEach((_, index) => {
        const button = document.createElement('button');
        button.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) button.classList.add('active');
        dotsContainer.appendChild(button);
    });

    // Update dots and slide position
    function updateCarousel(targetIndex) {
        // Handle circular navigation
        if (targetIndex < 0) targetIndex = totalSlides - 1;
        if (targetIndex >= totalSlides) targetIndex = 0;

        // Update slide position
        track.style.transform = `translateX(-${targetIndex * 100}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');

        // Update current slide index
        currentSlide = targetIndex;
    }

    // Event Listeners
    nextButton.addEventListener('click', () => {
        updateCarousel(currentSlide + 1);
    });

    prevButton.addEventListener('click', () => {
        updateCarousel(currentSlide - 1);
    });
    
    dotsContainer.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
            const targetIndex = Array.from(dotsContainer.children).indexOf(e.target);
            updateCarousel(targetIndex);
        }
    });

    // Auto play functionality
    let intervalId = setInterval(() => {
        updateCarousel(currentSlide + 1);
    }, 5000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });

    carousel.addEventListener('mouseleave', () => {
        clearInterval(intervalId);
        intervalId = setInterval(() => {
            updateCarousel(currentSlide + 1);
        }, 5000);
    });

    // Initialize first slide
    updateCarousel(0);
});
