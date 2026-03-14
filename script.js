document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. HEADER SCROLL EFFECT
    ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* =========================================
       2. MENU MOBILE TOGGLE
    ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a, .navbar .btn');

    mobileBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Alterna o ícone de hambúrguer para fechar (X)
        const icon = mobileBtn.querySelector('i');
        if(navbar.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* =========================================
       3. SLIDER DA EQUIPE DE ADVOGADOS
    ========================================= */
    const teamSlider = document.getElementById('teamSlider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // Valor de scroll igual à largura de um card + gap
    const getScrollAmount = () => {
        const card = teamSlider.querySelector('.team-card');
        return card.offsetWidth + 30; // 30 é o gap definido no CSS
    };

    nextBtn.addEventListener('click', () => {
        teamSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        teamSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });

    /* =========================================
       4. VALIDAÇÃO DO FORMULÁRIO DE CONTATO
    ========================================= */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita recarregamento da página
            
            // Aqui entraria a lógica de envio (Fetch API / AJAX para o backend)
            // Simulação de sucesso:
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'ENVIADO COM SUCESSO!';
            btn.style.backgroundColor = '#25D366'; // Verde sucesso
            contactForm.reset();

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = ''; // Retorna ao padrão do CSS
            }, 3000);
        });
    }

    /* =========================================
       5. ANIMAÇÕES NO SCROLL (INTERSECTION OBSERVER)
    ========================================= */
    const faders = document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .slide-in-right');

    const appearOptions = {
        threshold: 0.15, // O elemento deve aparecer 15% na tela para ativar
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de chegar na base
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Anima apenas 1 vez
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

});

/* =========================================
   SISTEMA DE MODAIS DA EQUIPE
========================================= */
function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    // Pequeno atraso para a animação do CSS funcionar
    setTimeout(() => modal.classList.add('show'), 10); 
    document.body.style.overflow = 'hidden'; // Trava o scroll do site no fundo
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    // Espera a animação terminar para esconder de verdade
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Destrava o scroll do site
    }, 400); 
}

// Fecha o modal se a pessoa clicar fora da caixa de conteúdo (no fundo borrado)
window.onclick = function(event) {
    if (event.target.classList.contains('team-modal')) {
        event.target.classList.remove('show');
        setTimeout(() => {
            event.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 400);
    }
}