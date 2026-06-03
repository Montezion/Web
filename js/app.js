/**
 * MONTE ZION - js/app.js
 * Lee MONTE_ZION_CONFIG y construye toda la página automáticamente.
 */

(function () {
    const C = MONTE_ZION_CONFIG;

    // ── 1. Aplicar paleta de colores al :root ────────────────
    function aplicarTema() {
        const temaActivo = localStorage.getItem('mz_theme') || C.apariencia.tema_activo;
        const paleta = C.apariencia.paletas[temaActivo];
        if (!paleta) return;
        const root = document.documentElement;
        Object.entries(paleta).forEach(([varName, value]) => {
            root.style.setProperty(varName, value);
        });
    }

    // ── 2. Inyectar analytics en <head> ─────────────────────
    function inyectarAnalytics() {
        const m = C.marketing;

        // Meta SEO
        document.title = m.meta_title_home;
        setMeta('description', m.meta_desc_home);
        setMeta('og:title', m.meta_title_home, 'property');
        setMeta('og:description', m.meta_desc_home, 'property');
        setMeta('og:image', m.og_image, 'property');

        // Google Tag Manager
        if (m.tag_manager_id && !m.tag_manager_id.includes('XXXXXXX')) {
            const s = document.createElement('script');
            s.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${m.tag_manager_id}');`;
            document.head.appendChild(s);
        }

        // Google Analytics (GA4)
        if (m.analytics_id && !m.analytics_id.includes('XXXXXXX')) {
            const s = document.createElement('script');
            s.async = true;
            s.src = `https://www.googletagmanager.com/gtag/js?id=${m.analytics_id}`;
            document.head.appendChild(s);
            const s2 = document.createElement('script');
            s2.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${m.analytics_id}');`;
            document.head.appendChild(s2);
        }

        // Facebook Pixel
        if (m.pixel_id && !m.pixel_id.includes('AQUI')) {
            const s = document.createElement('script');
            s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        fbq('init','${m.pixel_id}');fbq('track','PageView');`;
            document.head.appendChild(s);
        }
    }

    function setMeta(name, content, attr = 'name') {
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
        el.setAttribute('content', content);
    }

    // ── 3. Header ────────────────────────────────────────────
    function construirHeader() {
        const h = C.encabezado;
        const logoEl = document.getElementById('header-logo');
        const navEl = document.getElementById('header-nav');
        const burgerEl = document.getElementById('header-burger');
        if (!logoEl || !navEl) return;

        const img = new Image();
        img.src = h.logo_url;
        img.alt = h.logo_alt;
        img.className = 'header__logo';
        img.onerror = () => {
            const span = document.createElement('span');
            span.className = 'header__logo-text';
            span.textContent = h.logo_texto_fallback || 'Monte Zion';
            logoEl.replaceChild(span, img);
        };
        logoEl.appendChild(img);

        // --- SELECTOR TEMPORAL DE TEMAS ---
        if (!document.getElementById('theme-switcher')) {
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

        h.menu_items.forEach(item => {
            const a = document.createElement('a');
            a.href = item.anclaje;
            a.className = 'nav__link';
            a.textContent = item.etiqueta;
            a.addEventListener('click', (e) => {
                if (item.anclaje.startsWith('#')) {
                    e.preventDefault();
                    navEl.classList.remove('open');
                    const target = document.querySelector(item.anclaje);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            });
            navEl.appendChild(a);
        });

        const btnR = document.createElement('a');
        btnR.href = h.boton_reservar.url;
        btnR.className = 'btn-reservar';
        btnR.textContent = h.boton_reservar.etiqueta;
        navEl.appendChild(btnR);

        if (burgerEl) {
            burgerEl.addEventListener('click', () => navEl.classList.toggle('open'));
        }

        window.addEventListener('scroll', () => {
            document.getElementById('header').classList.toggle('scrolled', window.scrollY > 30);
        });
    }

    // ── 4. Hero Video ────────────────────────────────────────
    function construirHero() {
        const videoEl = document.getElementById('hero-video');
        const textEl = document.getElementById('hero-text');
        if (!videoEl || !textEl) return;

        const isMobile = window.innerWidth < 768;
        const src = isMobile ? C.hero.video_mobile_url : C.hero.video_desktop_url;
        
        // Bugfix iOS/Mobile Cache: Asignar directo al video (no source), forzar muted y playsinline siempre.
        videoEl.muted = true;
        videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('webkit-playsinline', '');
        videoEl.src = src;
        
        videoEl.load();
        videoEl.play().catch(e => console.log('Autoplay bloqueado:', e));

        const textos = C.hero.textos_rotativos;
        let idx = 0;

        function mostrarTexto(i) {
            textEl.classList.remove('visible');
            setTimeout(() => {
                textEl.textContent = textos[i];
                textEl.classList.add('visible');
            }, 300);
        }

        mostrarTexto(0);
        setInterval(() => {
            idx = (idx + 1) % textos.length;
            mostrarTexto(idx);
        }, 5000);
    }

    // ── 5. Bienvenida ────────────────────────────────────────
    function construirBienvenida() {
        const tEl = document.getElementById('bienvenida-titulo');
        const mEl = document.getElementById('bienvenida-mensaje');
        if (tEl) tEl.textContent = C.bienvenida.titulo;
        if (mEl) mEl.textContent = C.bienvenida.mensaje;
    }

    // ── 6. Tarjetas apartamentos ─────────────────────────────
    function construirApartamentos() {
        const gridEl = document.getElementById('apartamentos-grid');
        if (!gridEl) return;
        C.apartamentos.forEach(apt => {
            const detalle = C.paginas_detalle.find(d => d.id.toLowerCase() === apt.id.toLowerCase());
            const fotos = detalle ? detalle.galeria_fotos : [];
            const a = document.createElement('a');
            a.href = apt.url_detalle;
            a.className = 'apartment-card';

            let fotoHTML = '';
            if (fotos && fotos.length > 0) {
                fotoHTML = `<div class="apartment-card__gallery">
                    <div class="apartment-card__gallery-track">
                        ${fotos.map(f => `<img src="${f}" alt="Monte Zion" class="apartment-card__gallery-photo" onerror="this.outerHTML='<div class=\\'apartment-card__photo-placeholder\\'>🏔️</div>'">`).join('')}
                    </div>
                </div>`;
            } else {
                fotoHTML = `<div class="apartment-card__photo-placeholder">🏔️</div>`;
            }

            a.innerHTML = `
        ${fotoHTML}
        <div class="apartment-card__body">
          <p class="apartment-card__subtitle">${apt.titulo_secundario}</p>
          <h3 class="apartment-card__title">${apt.titulo_principal}</h3>
          <p class="apartment-card__desc">${apt.detalle_breve}</p>
          <p class="apartment-card__amenities">${apt.comodidades_resumen.split('·').map(item => `<span style="white-space: nowrap;">${item.trim()}</span>`).join(' · ')}</p>
          <span class="apartment-card__cta">Ver detalle →</span>
        </div>`;
            gridEl.appendChild(a);
        });

        // Lógica de slider activo
        let activeSliderIndex = 0; // La primera tarjeta rota por defecto

        const cards = document.querySelectorAll('.apartment-card');
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                activeSliderIndex = index;
            });
        });

        // Sincronizar el slider de las tarjetas cada 2 segundos sin reiniciar (infinito seamless)
        setInterval(() => {
            const isMobile = window.innerWidth <= 768;
            document.querySelectorAll('.apartment-card__gallery-track').forEach((track, index) => {
                if (track.children.length > 1 && (isMobile || index === activeSliderIndex)) {
                    track.style.transition = 'transform 0.5s ease-in-out';
                    track.style.transform = `translateX(-100%)`;
                    setTimeout(() => {
                        track.style.transition = 'none';
                        track.appendChild(track.children[0]);
                        track.style.transform = `translateX(0)`;
                    }, 500);
                }
            });
        }, 2000);
    }

    // ── 7. Servicios ─────────────────────────────────────────
    function construirServicios() {
        const tEl = document.getElementById('servicios-titulo');
        const stEl = document.getElementById('servicios-subtitulo');
        const gridEl = document.getElementById('servicios-grid');
        const logEl = document.getElementById('logistica-grid');
        if (tEl) tEl.textContent = C.servicios.titulo_seccion;
        if (stEl) stEl.textContent = C.servicios.subtitulo;

        if (gridEl) {
            C.servicios.tarjetas.forEach(t => {
                const div = document.createElement('div');
                div.className = 'service-card';
                div.innerHTML = `
          <div class="service-card__icon">${t.icono}</div>
          <h3 class="service-card__title">${t.titulo}</h3>
          <ul class="service-card__list">
            ${t.especificaciones.map(e => `<li class="service-card__item">${e}</li>`).join('')}
          </ul>`;
                gridEl.appendChild(div);
            });
        }

        if (logEl) {
            C.info_logistica.forEach(item => {
                const div = document.createElement('div');
                div.className = 'logistics-card' + (item.es_pet_friendly ? ' logistics-card--pet' : '');
                div.innerHTML = `
          <span class="logistics-card__icon">${item.icono}</span>
          <span class="logistics-card__title">${item.titulo}</span>
          <p class="logistics-card__text">${item.texto}</p>`;
                logEl.appendChild(div);
            });
        }
    }

    // ── 8. Qué hacer ─────────────────────────────────────────
    function construirQueHacer() {
        const tEl = document.getElementById('quehacer-titulo');
        const stEl = document.getElementById('quehacer-subtitulo');
        const gridEl = document.getElementById('quehacer-grid');
        if (tEl) tEl.textContent = C.que_hacer.titulo_seccion;
        if (stEl) stEl.textContent = C.que_hacer.subtitulo;
        if (!gridEl) return;

        const actividades = C.que_hacer.actividades;

        // 4 fotos → 2 columnas | otro → 3 columnas
        gridEl.classList.add(actividades.length === 4 ? 'activities-grid--2col' : 'activities-grid--3col');

        actividades.forEach(act => {
            const div = document.createElement('div');
            div.className = 'activity-card';
            const fotoHTML = renderFoto(act.foto, 'activity-card__photo', 'activity-card__photo-placeholder', '🌄');
            div.innerHTML = `
        ${fotoHTML}
        <h3 class="activity-card__title">${act.titulo}</h3>
        <p class="activity-card__desc">${act.descripcion}</p>`;
            gridEl.appendChild(div);
        });
    }

    // ── 9. Galería ───────────────────────────────────────────
    function construirGaleria() {
        const tEl = document.getElementById('galeria-titulo');
        const trackEl = document.getElementById('galeria-track');
        if (tEl) tEl.textContent = C.galeria.titulo_seccion;
        if (!trackEl) return;

        let lightbox = document.getElementById('lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'lightbox';
            lightbox.className = 'lightbox';
            lightbox.innerHTML = '<div class="lightbox-close">×</div><img id="lightbox-img" src="" alt="" style="display:none;"><video id="lightbox-video" src="" controls autoplay loop style="display:none; max-width:90%; max-height:90vh; border-radius:8px; box-shadow:0 10px 40px rgba(0, 0, 0, 0.8);"></video>';
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', () => {
                lightbox.classList.remove('open');
                const videoEl = document.getElementById('lightbox-video');
                if (videoEl) {
                    videoEl.pause();
                    videoEl.src = '';
                }
            });
        }

        const esVideo = (url) => /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);

        const fotos = [...C.galeria.fotos, ...C.galeria.fotos];
        fotos.forEach(src => {
            const card = document.createElement('div');
            card.className = 'gallery-card';
            card.style.position = 'relative';
            
            let el;
            if (esVideo(src)) {
                el = document.createElement('video');
                el.src = src;
                el.muted = true;
                el.loop = true;
                el.playsInline = true;
                el.autoplay = true;
                el.style.width = '100%';
                el.style.height = '100%';
                el.style.objectFit = 'cover';

                // Crear el símbolo de video centrado
                const badge = document.createElement('div');
                badge.className = 'gallery-card__video-badge';
                badge.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="display: block;">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                `;
                badge.style.cssText = "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: rgba(0, 0, 0, 0.6); border: 2px solid #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; pointer-events: none; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.3);";
                card.appendChild(badge);
            } else {
                el = new Image();
                el.src = src;
                el.alt = 'Monte Zion';
            }
            
            el.onerror = () => { card.innerHTML = '<div class="gallery-card__placeholder">🏔️</div>'; };
            card.appendChild(el);

            // Abrir lightbox al hacer clic en PC o tocar en Celular
            card.addEventListener('click', (e) => {
                if (isDragging) return; // evitar abrir si solo estaba arrastrando
                e.stopPropagation();
                const imgEl = document.getElementById('lightbox-img');
                const videoEl = document.getElementById('lightbox-video');
                if (esVideo(src)) {
                    imgEl.style.display = 'none';
                    imgEl.src = '';
                    videoEl.src = src;
                    videoEl.style.display = 'block';
                } else {
                    videoEl.style.display = 'none';
                    videoEl.src = '';
                    imgEl.src = src;
                    imgEl.style.display = 'block';
                }
                lightbox.classList.add('open');
            });

            trackEl.appendChild(card);
        });

        const wrapper = trackEl.parentElement;
        trackEl.style.animation = 'none';

        // Detectar si es un F5/recarga para limpiar sessionStorage
        const navEntries = performance.getEntriesByType('navigation');
        const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
        if (isReload) {
            sessionStorage.removeItem('galleryScrollPos');
        }

        // Obtener el ancho de un slide (ancho de tarjeta + gap) dinámicamente
        const cardsList = trackEl.querySelectorAll('.gallery-card');
        let stepWidth = 300; // default fallback (280px + 20px gap)
        if (cardsList.length > 1) {
            stepWidth = cardsList[1].offsetLeft - cardsList[0].offsetLeft;
        }

        let scrollPosition = parseFloat(sessionStorage.getItem('galleryScrollPos')) || 0;
        let currentIndex = Math.round(scrollPosition / stepWidth);
        wrapper.scrollLeft = currentIndex * stepWidth;

        let autoScrollTimer = null;
        let isDragging = false;
        let isPaused = false;
        let startX = 0;
        let scrollLeft = 0;

        function goToIndex(index, smooth = true) {
            const halfCount = C.galeria.fotos.length;
            
            if (smooth) {
                wrapper.scrollTo({
                    left: index * stepWidth,
                    behavior: 'smooth'
                });
            } else {
                wrapper.scrollLeft = index * stepWidth;
            }

            currentIndex = index;
            sessionStorage.setItem('galleryScrollPos', currentIndex * stepWidth);

            // Reinicio invisible al inicio cuando llega a la mitad (fotos duplicadas para loop infinito)
            if (currentIndex >= halfCount) {
                setTimeout(() => {
                    if (!isDragging) {
                        wrapper.scrollTo({ left: 0, behavior: 'auto' });
                        currentIndex = 0;
                        sessionStorage.setItem('galleryScrollPos', 0);
                    }
                }, 600); // Esperar a que termine la animación suave
            }
        }

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollTimer = setInterval(() => {
                if (!isPaused && !isDragging) {
                    goToIndex(currentIndex + 1, true);
                }
            }, 1500); // Cambiar cada 1.5 segundos
        }

        function stopAutoScroll() {
            if (autoScrollTimer) {
                clearInterval(autoScrollTimer);
                autoScrollTimer = null;
            }
        }

        // Iniciar el auto-scroll
        startAutoScroll();

        // Pausar en hover
        wrapper.addEventListener('mouseenter', () => { isPaused = true; });
        wrapper.addEventListener('mouseleave', () => { isPaused = false; });

        // Mouse Drag
        wrapper.addEventListener('mousedown', e => {
            isDragging = true;
            startX = e.pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
            stopAutoScroll();
        });
        wrapper.addEventListener('mouseup', () => {
            isDragging = false;
            currentIndex = Math.round(wrapper.scrollLeft / stepWidth);
            goToIndex(currentIndex, true);
            startAutoScroll();
        });
        wrapper.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                currentIndex = Math.round(wrapper.scrollLeft / stepWidth);
                goToIndex(currentIndex, true);
                startAutoScroll();
            }
        });
        wrapper.addEventListener('mousemove', e => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - wrapper.offsetLeft;
            const walk = x - startX;
            wrapper.scrollLeft = scrollLeft - walk;
        });

        // Touch Drag para móviles
        wrapper.addEventListener('touchstart', e => {
            isDragging = true;
            startX = e.touches[0].pageX - wrapper.offsetLeft;
            scrollLeft = wrapper.scrollLeft;
            stopAutoScroll();
        }, { passive: true });
        wrapper.addEventListener('touchend', () => {
            isDragging = false;
            currentIndex = Math.round(wrapper.scrollLeft / stepWidth);
            goToIndex(currentIndex, true);
            startAutoScroll();
        });
        wrapper.addEventListener('touchmove', e => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - wrapper.offsetLeft;
            const walk = x - startX;
            wrapper.scrollLeft = scrollLeft - walk;
        }, { passive: true });
    }

    // ── 10. Ubicación ────────────────────────────────────────
    function construirUbicacion() {
        const u = C.ubicacion;
        const tEl = document.getElementById('ubicacion-titulo');
        const stEl = document.getElementById('ubicacion-subtitulo');
        const ctaEl = document.getElementById('ubicacion-cta');
        const videoEl = document.getElementById('ubicacion-video');
        const wrapper = document.getElementById('ubicacion-wrapper');
        if (tEl) tEl.textContent = u.titulo_seccion;
        if (stEl) stEl.textContent = u.subtitulo;
        if (ctaEl) { ctaEl.textContent = u.texto_cta; ctaEl.href = u.google_maps_link; ctaEl.target = '_blank'; }
        if (videoEl) { videoEl.querySelector('source').src = u.video_zoom_loop; videoEl.load(); }
        if (wrapper) wrapper.addEventListener('click', () => window.open(u.google_maps_link, '_blank'));
    }

    // ── 11. Footer ───────────────────────────────────────────
    function construirFooter() {
        const f = C.footer;
        const l = C.legal;
        const ct = C.contacto;

        const cityEl = document.getElementById('footer-ciudad');
        const dateEl = document.getElementById('footer-fecha');
        const copyEl = document.getElementById('footer-copyright');
        const devEl = document.getElementById('footer-dev');
        const socials = document.getElementById('footer-socials');
        const privEl = document.getElementById('footer-privacidad');
        const resEl = document.getElementById('footer-reservar');

        if (cityEl) cityEl.textContent = f.ciudad;
        if (copyEl) copyEl.textContent = f.copyright;
        if (devEl) devEl.textContent = f.desarrollo;
        if (privEl) { privEl.textContent = l.texto_footer_privacidad; privEl.href = l.url_privacidad; }
        if (resEl) resEl.href = C.encabezado.boton_reservar.url;

        const headerMobBtn = document.getElementById('header-mobile-reservar');
        if (headerMobBtn) headerMobBtn.href = C.encabezado.boton_reservar.url;

        if (dateEl) {
            dateEl.textContent = new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }

        if (socials) {
            const svgs = {
                Instagram: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
                Facebook: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>`,
                Email: `<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>`
            };

            [{ url: ct.redes.instagram, svg: svgs.Instagram, label: 'Instagram' },
            { url: ct.redes.facebook, svg: svgs.Facebook, label: 'Facebook' },
            { url: `mailto:${ct.email}`, svg: svgs.Email, label: 'Email' }].forEach(r => {
                const a = document.createElement('a');
                a.href = r.url; a.target = '_blank'; a.className = 'footer__social-link';
                a.setAttribute('aria-label', r.label);
                a.innerHTML = r.svg;
                socials.appendChild(a);
            });
        }
    }

    // ── 12. WhatsApp flotante ────────────────────────────────
    function construirWhatsAppFAB() {
        const fab = document.getElementById('whatsapp-fab');
        if (!fab) return;
        fab.href = `https://api.whatsapp.com/send?phone=${C.contacto.whatsapp_numero}&text=Hola%20Monte%20Zion!%20Me%20interesa%20conocer%20m%C3%A1s.`;
        fab.target = '_blank';
        fab.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>`;
    }

    // ── Utilidad ─────────────────────────────────────────────
    function renderFoto(src, claseImg, clasePlaceholder, emoji) {
        if (!src || src.includes('link-a-la-foto')) {
            return `<div class="${clasePlaceholder}">${emoji}</div>`;
        }
        return `<img src="${src}" alt="Monte Zion" class="${claseImg}" onerror="this.outerHTML='<div class=\\'${clasePlaceholder}\\'>${emoji}</div>'">`;
    }

    // ── INIT ─────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        aplicarTema();
        inyectarAnalytics();
        construirHeader();
        construirHero();
        construirBienvenida();
        construirApartamentos();
        construirServicios();
        construirQueHacer();
        construirGaleria();
        construirUbicacion();
        construirFooter();
        construirWhatsAppFAB();
    });

})();
