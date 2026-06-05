/**
 * MONTE ZION - js/apartments.js
 * Carga los datos del apartamento correcto según la página actual.
 */

(function () {
    const C = MONTE_ZION_CONFIG;

    function detectarApartamentoId() {
        const filename = window.location.pathname.split('/').pop();
        if (filename.includes('1')) return 'apart-1';
        if (filename.includes('2')) return 'apart-2';
        if (filename.includes('3')) return 'apart-3';
        return 'apart-1';
    }

    function aplicarTema() {
        const temaActivo = localStorage.getItem('mz_theme') || C.apariencia.tema_activo;
        const paleta = C.apariencia.paletas[temaActivo];
        if (paleta) Object.entries(paleta).forEach(([v, val]) => document.documentElement.style.setProperty(v, val));
    }

    document.addEventListener('DOMContentLoaded', () => {
        aplicarTema();

        const aptId = detectarApartamentoId();
        const apt = C.paginas_detalle.find(a => a.id === aptId) || C.paginas_detalle[0];
        const aptRes = C.reserva.paso_1_seleccion.find(a => a.id === aptId) || C.reserva.paso_1_seleccion[0];

        document.title = `${apt.titulo_principal} | Monte Zion`;

        // ── HEADER ───────────────────────────────────────────
        const logoEl = document.getElementById('header-logo');
        const navEl = document.getElementById('header-nav');
        const burgerEl = document.getElementById('header-burger');

        if (logoEl) {
            const h = C.encabezado;
            const img = new Image();
            img.src = h.logo_url; img.alt = h.logo_alt; img.className = 'header__logo';
            img.onerror = () => {
                const span = document.createElement('span');
                span.className = 'header__logo-text';
                span.textContent = h.logo_texto_fallback || 'Monte Zion';
                logoEl.replaceChild(span, img);
            };
            logoEl.appendChild(img);
        }

        // --- SELECTOR TEMPORAL DE TEMAS ---
        if (navEl && !document.getElementById('theme-switcher')) {
            const select = document.createElement('select');
            select.id = 'theme-switcher';
            select.className = 'theme-switcher-nav';

            const temaActivo = localStorage.getItem('mz_theme') || C.apariencia.tema_activo;
            Object.keys(C.apariencia.paletas).forEach(tema => {
                const opt = document.createElement('option');
                opt.value = tema;
                opt.textContent = tema.replace(/_/g, ' ');
                if (tema === temaActivo) opt.selected = true;
                select.appendChild(opt);
            });

            select.addEventListener('change', (e) => {
                localStorage.setItem('mz_theme', e.target.value);
                aplicarTema();
            });
            navEl.appendChild(select);
        }
        // ---------------------------------

        if (navEl) {
            [{ etiqueta: 'Inicio', url: 'index.html' },
            { etiqueta: 'Departamentos', url: 'index.html#apartamentos' },
            { etiqueta: 'Servicios', url: 'index.html#servicios' }].forEach(l => {
                const a = document.createElement('a');
                a.href = l.url; a.className = 'nav__link'; a.textContent = l.etiqueta;
                navEl.appendChild(a);
            });
            const btnR = document.createElement('a');
            btnR.href = `reservas.html?apt=${aptId}`;
            btnR.className = 'btn-reservar'; btnR.textContent = 'Reservar';
            navEl.appendChild(btnR);
            if (burgerEl) {
                burgerEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    navEl.classList.toggle('open');
                });
            }

            // Close hamburger menu when clicking outside of it
            document.addEventListener('click', (e) => {
                if (navEl.classList.contains('open')) {
                    const isClickInsideMenu = navEl.contains(e.target);
                    const isClickInsideBurger = burgerEl && burgerEl.contains(e.target);
                    if (!isClickInsideMenu && !isClickInsideBurger) {
                        navEl.classList.remove('open');
                    }
                }
            });
        }

        window.addEventListener('scroll', () => {
            document.getElementById('header').classList.toggle('scrolled', window.scrollY > 30);
        });

        // ── HERO ─────────────────────────────────────────────
        const heroPhotoEl = document.getElementById('detail-hero-photo');
        const heroTitleEl = document.getElementById('detail-hero-title');
        const heroEyebrow = document.getElementById('detail-hero-eyebrow');
        if (heroPhotoEl) { heroPhotoEl.src = apt.hero_foto; heroPhotoEl.alt = apt.titulo_principal; heroPhotoEl.onerror = () => heroPhotoEl.style.display = 'none'; }
        if (heroTitleEl) heroTitleEl.textContent = apt.titulo_principal;
        if (heroEyebrow) heroEyebrow.textContent = apt.titulo_secundario || 'Monte Zion · Apart de Montaña';

        // ── DETALLE ───────────────────────────────────────────
        const techEl = document.getElementById('detail-tech');
        const titleEl = document.getElementById('detail-title');
        const descEl = document.getElementById('detail-desc');
        const priceEl = document.getElementById('detail-price');
        if (techEl) techEl.textContent = apt.info_tecnica;
        if (titleEl) titleEl.style.display = 'none'; // ocultar título repetido
        if (descEl) descEl.textContent = apt.descripcion_larga;
        if (priceEl && aptRes) priceEl.textContent = `Desde ${C.reserva.config_general.moneda}${aptRes.precio_noche.toLocaleString('es-AR')} / noche`;

        // ── ICONOS ────────────────────────────────────────────
        const iconsEl = document.getElementById('detail-icons');
        if (iconsEl && apt.servicios_iconos) {
            apt.servicios_iconos.forEach(s => {
                const div = document.createElement('div');
                div.className = 'detail-icon-item';
                div.innerHTML = `<span class="detail-icon-item__icon">${s.icono}</span><span class="detail-icon-item__name">${s.nombre}</span>`;
                iconsEl.appendChild(div);
            });
        }

        // ── GALERÍA ───────────────────────────────────────────
        const galEl = document.getElementById('detail-gallery');
        if (galEl && apt.galeria_fotos) {
            apt.galeria_fotos.forEach(src => {
                const esVideo = /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);
                let el;
                if (esVideo) {
                    el = document.createElement('video');
                    el.src = src;
                    el.muted = true;
                    el.loop = true;
                    el.playsInline = true;
                    el.autoplay = true;
                    el.className = 'detail-gallery__photo';
                } else {
                    el = document.createElement('img');
                    el.src = src; el.alt = 'Monte Zion'; el.className = 'detail-gallery__photo';
                }
                el.onerror = () => el.style.display = 'none';
                galEl.appendChild(el);
            });
        }

        // ── BOTONES ───────────────────────────────────────────
        const btnDisp = document.getElementById('detail-btn-disponibilidad');
        if (btnDisp) btnDisp.href = `reservas.html?apt=${aptId}`;

        // ── WHATSAPP FAB ──────────────────────────────────────
        if (fab) {
            fab.href = `https://wa.me/${C.contacto.whatsapp_numero}?text=Hola%20Monte%20Zion!%20Consulto%20por%20${encodeURIComponent(apt.titulo_principal)}`;
            fab.target = '_blank';
            fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>`;
        }

        // ── FOOTER ────────────────────────────────────────────
        const footCityEl = document.getElementById('footer-ciudad');
        const footDateEl = document.getElementById('footer-fecha');
        const footCopyEl = document.getElementById('footer-copyright');
        const footPrivEl = document.getElementById('footer-privacidad');
        if (footCityEl) footCityEl.textContent = C.footer.ciudad;
        if (footCopyEl) footCopyEl.textContent = C.footer.copyright;
        if (footPrivEl) { footPrivEl.textContent = C.legal.texto_footer_privacidad; footPrivEl.href = C.legal.url_privacidad; }
        if (footDateEl) footDateEl.textContent = new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    });

})();
