document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a, .navbar .btn');
    const teamSlider = document.getElementById('teamSlider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const contactForm = document.getElementById('contactForm');
    const faders = document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .slide-in-right');

    window.addEventListener('scroll', () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    if (mobileBtn && navbar) {
        mobileBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');

            const icon = mobileBtn.querySelector('i');
            if (!icon) {
                return;
            }

            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');

                const icon = mobileBtn.querySelector('i');
                if (!icon) {
                    return;
                }

                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    if (teamSlider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = teamSlider.querySelector('.team-card');
            return card ? card.offsetWidth + 30 : 0;
        };

        nextBtn.addEventListener('click', () => {
            teamSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            teamSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const btn = contactForm.querySelector('button');
            if (!btn) {
                return;
            }

            const originalText = btn.innerText;
            btn.innerText = 'ENVIADO COM SUCESSO!';
            btn.style.backgroundColor = '#25D366';
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }

    if (faders.length) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach((fader) => {
            appearOnScroll.observe(fader);
        });
    }
});

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden';
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) {
        return;
    }

    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 400);
}

window.onclick = function(event) {
    if (event.target.classList.contains('team-modal')) {
        event.target.classList.remove('show');
        setTimeout(() => {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }
};
