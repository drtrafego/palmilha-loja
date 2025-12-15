// ==================== 
// CAROUSEL FUNCTIONALITY
// ==================== 

document.addEventListener('DOMContentLoaded', function () {

    // Product Carousel
    const carouselImages = document.querySelectorAll('.carousel-image');
    const thumbnails = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function showImage(index) {
        carouselImages.forEach((img, i) => img.classList.toggle('active', i === index));
        thumbnails.forEach((thumb, i) => thumb.classList.toggle('active', i === index));
        currentIndex = index;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let newIndex = currentIndex - 1;
            if (newIndex < 0) newIndex = carouselImages.length - 1;
            showImage(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let newIndex = currentIndex + 1;
            if (newIndex >= carouselImages.length) newIndex = 0;
            showImage(newIndex);
        });
    }

    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => showImage(index));
    });

    // Auto-play carousel
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= carouselImages.length) newIndex = 0;
        showImage(newIndex);
    }, 5000);


    // ==================== 
    // ACCORDION FUNCTIONALITY
    // ==================== 

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isActive = content.classList.contains('active');

            document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.accordion-icon').forEach(i => i.textContent = '+');
            document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));

            if (!isActive) {
                content.classList.add('active');
                icon.textContent = '−';
                header.classList.add('active');
            }
        });
    });


    // ==================== 
    // FAQ ACCORDION
    // ==================== 

    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.faq-icon');
            const isActive = content.classList.contains('active');

            if (isActive) {
                content.classList.remove('active');
                icon.textContent = '+';
            } else {
                content.classList.add('active');
                icon.textContent = '−';
            }
        });
    });


    // ==================== 
    // SIZE & PACK SELECTOR
    // ==================== 

    const sizeButtons = document.querySelectorAll('.size-btn');
    const packOptions = document.querySelectorAll('.pack-option');
    const buyButton = document.getElementById('buy-button');

    // Links de compra para cada variável - Shopify Checkout
    const purchaseLinks = {
        '35-40': {
            '1': 'https://kfnjpd-am.myshopify.com/cart/52647636599147:1?channel=buy_button',
            '2': 'https://kfnjpd-am.myshopify.com/cart/52674622521707:1?channel=buy_button'
        },
        '41-46': {
            '1': 'https://kfnjpd-am.myshopify.com/cart/52647636631915:1?channel=buy_button',
            '2': 'https://kfnjpd-am.myshopify.com/cart/52674622554475:1?channel=buy_button'
        }
    };

    function updateBuyLink() {
        const selectedSize = document.querySelector('.size-btn.active')?.dataset.size || '35-40';
        const selectedPack = document.querySelector('input[name="pack"]:checked')?.value || '1';

        if (buyButton && purchaseLinks[selectedSize] && purchaseLinks[selectedSize][selectedPack]) {
            buyButton.href = purchaseLinks[selectedSize][selectedPack];
        }
    }

    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateBuyLink();
        });
    });

    packOptions.forEach(option => {
        option.addEventListener('click', () => {
            packOptions.forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            option.querySelector('input[type="radio"]').checked = true;
            updateBuyLink();
        });
    });

    // Inicializa o link
    updateBuyLink();


    // ==================== 
    // SMOOTH SCROLL
    // ==================== 

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });


    // ==================== 
    // CTA BUTTON ANIMATION
    // ==================== 

    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-3px) scale(1.02)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });


    // ==================== 
    // SCROLL ANIMATIONS
    // ==================== 

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Make first sections visible immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
    }

});
