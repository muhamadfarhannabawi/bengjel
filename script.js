// 1. Inisialisasi AOS dengan pengaturan yang lebih halus
AOS.init({ 
    once: true,
    duration: 1000,
    easing: 'ease-out-back'
});

// 2. Elemen Selektor
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const nav = document.getElementById('navbar');

// 3. Logika Mobile Menu dengan Staggered Animation
function toggleMenu() {
    const isOpen = !mobileMenu.classList.contains('-translate-y-full');
    
    mobileMenu.classList.toggle('-translate-y-full');
    
    if (!isOpen) {
        // Saat Membuka
        menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
        document.body.style.overflow = 'hidden'; // Kunci scroll
        
        // Animasi link muncul satu-satu (Stagger)
        const links = mobileMenu.querySelectorAll('a');
        links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease forwards';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * index + 300);
        });
    } else {
        // Saat Menutup
        menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
        document.body.style.overflow = 'auto'; // Aktifkan scroll
    }
}

if(menuBtn) menuBtn.addEventListener('click', toggleMenu);

// 4. Navbar Scroll Effect & Scroll Progress
window.addEventListener('scroll', () => {
    // Efek Transisi Navbar
    if(window.scrollY > 50) {
        nav.classList.add('nav-scrolled', 'bg-black/90', 'backdrop-blur-xl', 'py-4');
        nav.classList.remove('py-8');
    } else {
        nav.classList.remove('nav-scrolled', 'bg-black/90', 'backdrop-blur-xl', 'py-4');
        nav.classList.add('py-8');
    }
});

// 5. Animasi Angka Statistik (Counter)
const counters = document.querySelectorAll('.heading-font.text-5xl.text-yellow-500');
const speed = 200;

const startCounter = (el) => {
    const target = +el.innerText.replace('+', '').replace('%', '');
    const count = +el.getAttribute('data-count') || 0;
    const inc = target / speed;

    if (count < target) {
        const currentCount = Math.ceil(count + inc);
        el.setAttribute('data-count', currentCount);
        el.innerText = currentCount + (el.innerText.includes('+') ? '+' : (el.innerText.includes('%') ? '%' : ''));
        setTimeout(() => startCounter(el), 1);
    } else {
        el.innerText = target + (el.innerText.includes('+') ? '+' : (el.innerText.includes('%') ? '%' : ''));
    }
};

// Observer untuk memulai counter saat section terlihat di layar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 1 });

counters.forEach(counter => {
    // Simpan nilai asli ke atribut dan set text ke 0 dulu
    counter.setAttribute('data-target', counter.innerText);
    observer.observe(counter);
});

// 6. Smooth Scroll untuk Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});