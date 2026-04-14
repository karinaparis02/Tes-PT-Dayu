// --- Mobile Menu Toggle ---
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animasi burger menu menjadi 'X'
    mobileMenu.classList.toggle('is-active');
});

// Filter Gallery
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.gallery-item');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {

        // Cegah error jika belum ada active
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        items.forEach(item => {

            // animasi fade out dulu
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';

            setTimeout(() => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';

                    // animasi masuk
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);

                } else {
                    item.style.display = 'none';
                }
            }, 200);
        });

    });
});

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = '#ffffff';
    }
});

// --- Counter Animation for Stats ---
const counters = document.querySelectorAll('.counter');
const speed = 200; // Semakin besar angka, semakin lambat animasinya

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.innerText.replace('+', '').replace('%', '');
            const count = +counter.getAttribute('data-count') || 0;
            const inc = target / speed;

            if (count < target) {
                const currentCount = Math.ceil(count + inc);
                counter.setAttribute('data-count', currentCount);
                // Kembalikan simbol asli setelah angka
                if (counter.innerText.includes('+')) {
                    counter.innerText = currentCount + '+';
                } else if (counter.innerText.includes('%')) {
                    counter.innerText = currentCount + '%';
                } else {
                    counter.innerText = currentCount;
                }
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : (counter.innerText.includes('%') ? '%' : ''));
            }
        };
        updateCount();
    });
};

// --- Intersection Observer untuk Animasi ---
// Menjalankan counter hanya saat elemen terlihat di layar
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.gallery-item, .contact-card, .contact-form')
    .forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    observer.observe(statsSection);
}

// --- Smooth Scroll untuk Link Internal ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});