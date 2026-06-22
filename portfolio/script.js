(function() {
    'use strict';

    // ===== TYPING EFFECT =====
    const roles = ['Data Scientist', 'Data Analyst', 'Python Developer'];
    let idx = 0,
        charIdx = 0,
        isDeleting = false;
    const el = document.getElementById('typed-text');

    function typeEffect() {
        const current = roles[idx];
        if (!isDeleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1800);
                return;
            }
            setTimeout(typeEffect, 120);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                isDeleting = false;
                idx = (idx + 1) % roles.length;
                setTimeout(typeEffect, 400);
                return;
            }
            setTimeout(typeEffect, 60);
        }
    }
    typeEffect();

    // ===== MOUSE GLOW =====
    const glow = document.getElementById('glow');
    document.addEventListener('mousemove', function(e) {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // ===== STICKY NAV + ACTIVE LINK + PROGRESS BAR =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const progressBar = document.getElementById('progress-bar');

    function updateNavAndProgress() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = progress + '%';

        let current = '';
        sections.forEach(function(section) {
            const top = section.offsetTop - 200;
            if (scrollY >= top) current = section.getAttribute('id');
        });
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateNavAndProgress);

    // ===== HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');
    hamburger.addEventListener('click', function() {
        navLinksContainer.classList.toggle('open');
    });
    document.addEventListener('click', function(e) {
        if (!navLinksContainer.contains(e.target) && !hamburger.contains(e.target)) {
            navLinksContainer.classList.remove('open');
        }
    });

    // ===== SMOOTH SCROLL (nav links) =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinksContainer.classList.remove('open');
            }
        });
    });

    // ===== SCROLL REVEAL (Intersection Observer) =====
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(function(el) {
        revealObserver.observe(el);
    });

    // ===== ANIMATED COUNTERS =====
    const counters = document.querySelectorAll('.number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'), 10);
                let current = 0;
                const increment = Math.ceil(target / 50);
                const timer = setInterval(function() {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = current;
                    }
                }, 25);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.4 });
    counters.forEach(function(c) {
        counterObserver.observe(c);
    });

    // ===== SKILL BARS ANIMATION =====
    const fills = document.querySelectorAll('.fill');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const w = fill.getAttribute('data-width');
                fill.style.width = w + '%';
                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });
    fills.forEach(function(f) {
        skillObserver.observe(f);
    });

    // ===== BACK TO TOP =====
    document.getElementById('back-top').addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== CONTACT FORM =====
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('form-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('cname').value.trim();
        const email = document.getElementById('cemail').value.trim();
        const msg = document.getElementById('cmsg').value.trim();

        if (!name || !email || !msg) {
            formMsg.textContent = 'Please fill all fields.';
            formMsg.style.color = '#ff6b6b';
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            formMsg.textContent = 'Enter a valid email.';
            formMsg.style.color = '#ff6b6b';
            return;
        }

        formMsg.textContent = '✅ Message sent! I\'ll get back soon.';
        formMsg.style.color = 'var(--accent)';
        form.reset();
        setTimeout(function() {
            formMsg.textContent = '';
        }, 4000);
    });

    // ===== DOWNLOAD RESUME (demo) =====
    document.getElementById('download-resume').addEventListener('click', function(e) {
    e.preventDefault();

    const link = document.createElement('a');
    link.href = 'Lakshit_Suthar_Resume.pdf';
    link.download = 'Lakshit_Suthar_Resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

    // ===== PROJECT BUTTONS (placeholder) =====
    document.querySelectorAll('.project-card .btn-outline').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var icon = btn.querySelector('.fab');
            if (icon) {
                alert('🔗 GitHub repository (placeholder)');
            } else {
                alert('🔗 Live demo (placeholder)');
            }
        });
    });

    // ===== INITIAL ACTIVE LINK =====
    updateNavAndProgress();

})();