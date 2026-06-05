/**
 * MONTE ZION - js/reservas.js
 * Flujo de reserva en 4 pasos con validaciones, cálculo de factura y link a WhatsApp.
 */

(function () {
    const C = MONTE_ZION_CONFIG;
    const RC = C.reserva;
    const MONEDA = RC.config_general.moneda;

    let estado = {
        paso: 1, aptSeleccionado: null, huespedes: 1, fechaDesde: null, fechaHasta: null,
        noches: 0, total: 0, sena: 0, saldo: 0, nombre: '', whatsapp: '', email: '', medioPago: '', mensaje: ''
    };

    function aplicarTema() {
        const temaActivo = localStorage.getItem('mz_theme') || C.apariencia.tema_activo;
        const paleta = C.apariencia.paletas[temaActivo];
        if (!paleta) return;
        Object.entries(paleta).forEach(([v, val]) => document.documentElement.style.setProperty(v, val));
    }

    function construirHeader() {
        const logoEl = document.getElementById('header-logo');
        const navEl = document.getElementById('header-nav');
        const burgerEl = document.getElementById('header-burger');
        if (!logoEl || !navEl) return;
        const h = C.encabezado;
        const img = new Image();
        img.src = h.logo_url; img.alt = h.logo_alt; img.className = 'header__logo';
        img.onerror = () => { const s = document.createElement('span'); s.className = 'header__logo-text'; s.textContent = h.logo_texto_fallback || 'Monte Zion'; logoEl.replaceChild(s, img); };
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

        [{ etiqueta: 'Inicio', url: 'index.html' }, { etiqueta: 'Apartamentos', url: 'index.html#apartamentos' }].forEach(l => {
            const a = document.createElement('a'); a.href = l.url; a.className = 'nav__link'; a.textContent = l.etiqueta; navEl.appendChild(a);
        });
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

        window.addEventListener('scroll', () => document.getElementById('header').classList.toggle('scrolled', window.scrollY > 30));
    }

    function construirPaso1() {
        const grid = document.getElementById('reserva-apts-grid');
        if (!grid) return;
        RC.paso_1_seleccion.forEach(apt => {
            const detallesApt = C.paginas_detalle.find(d => d.id === apt.id) || {};
            const nombreMostrar = detallesApt.titulo_principal || `Cabaña ${apt.id}`;
            const fotoMostrar = detallesApt.hero_foto || "";
            apt._nombre_memoria = nombreMostrar; // Guardamos para la validacion posterior

            const card = document.createElement('div');
            card.className = 'reserva-apt-card';
            card.dataset.id = apt.id;
            const foto = fotoMostrar ? `<img src="${fotoMostrar}" alt="${nombreMostrar}" class="reserva-apt-card__photo" onerror="this.outerHTML='<div class=\\'reserva-apt-card__photo-placeholder\\'>🏔️</div>'">` : `<div class="reserva-apt-card__photo-placeholder">🏔️</div>`;
            card.innerHTML = `${foto}<div class="reserva-apt-card__body">
          <p class="reserva-apt-card__name">${nombreMostrar}</p>
          <p class="reserva-apt-card__price">${MONEDA}${apt.precio_noche.toLocaleString('es-AR')} / noche</p>
          <p class="reserva-apt-card__cap">Máx. ${apt.capacidad_maxima} huéspedes</p></div>`;
            card.addEventListener('click', () => {
                document.querySelectorAll('.reserva-apt-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                estado.aptSeleccionado = apt; estado.huespedes = 1;
                document.getElementById('paso1-error').classList.remove('visible');
            });
            grid.appendChild(card);
        });
    }

    function construirPaso2() {
        const d = RC.paso_2_detalles;
        const titleEl = document.getElementById('paso2-banner-titulo');
        const promoEl = document.getElementById('paso2-promo');
        const includes = document.getElementById('paso2-incluye');
        const noInc = document.getElementById('paso2-no-incluye');
        if (titleEl) titleEl.textContent = d.banner_titulo;
        if (promoEl) promoEl.textContent = d.promocion_activa;
        if (includes) d.incluye.forEach(i => { const li = document.createElement('li'); li.textContent = i; includes.appendChild(li); });
        if (noInc) d.no_incluye.forEach(i => { const li = document.createElement('li'); li.textContent = i; noInc.appendChild(li); });

        document.getElementById('btn-menos').addEventListener('click', () => { if (estado.huespedes > 1) { estado.huespedes--; actualizarHuespedes(); } });
        document.getElementById('btn-mas').addEventListener('click', () => {
            const max = estado.aptSeleccionado ? estado.aptSeleccionado.capacidad_maxima : 99;
            if (estado.huespedes < max) { estado.huespedes++; actualizarHuespedes(); }
            else mostrarAlerta('paso2-huespedes-error', `Este apartamento admite hasta ${max} huéspedes.`);
        });

        const hoy = new Date().toISOString().split('T')[0];
        document.getElementById('fecha-desde').min = hoy;
        document.getElementById('fecha-hasta').min = hoy;
        document.getElementById('fecha-desde').addEventListener('change', calcularFactura);
        document.getElementById('fecha-hasta').addEventListener('change', calcularFactura);
    }

    function actualizarHuespedes() {
        document.getElementById('guests-count').textContent = estado.huespedes;
        document.getElementById('paso2-huespedes-error').classList.remove('visible');
    }

    function calcularFactura() {
        const desde = document.getElementById('fecha-desde').value;
        const hasta = document.getElementById('fecha-hasta').value;
        if (!desde || !hasta || !estado.aptSeleccionado) return;
        const d1 = new Date(desde), d2 = new Date(hasta);
        if (d2 <= d1) { mostrarAlerta('paso2-fechas-error', 'La salida debe ser posterior a la entrada.'); return; }
        document.getElementById('paso2-fechas-error').classList.remove('visible');
        const noches = Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
        const precio = estado.aptSeleccionado.precio_noche;
        const total = noches * precio;
        estado.fechaDesde = desde; estado.fechaHasta = hasta; estado.noches = noches;
        estado.total = total; estado.sena = Math.round(total * RC.config_general.porcentaje_sena);
        estado.saldo = Math.round(total * RC.config_general.porcentaje_saldo);
        document.getElementById('inv-apto').textContent = estado.aptSeleccionado._nombre_memoria;
        document.getElementById('inv-precio').textContent = `${MONEDA}${precio.toLocaleString('es-AR')}`;
        document.getElementById('inv-noches').textContent = noches;
        document.getElementById('inv-total').textContent = `${MONEDA}${total.toLocaleString('es-AR')}`;
        document.getElementById('invoice-card').classList.add('visible');
    }

    function construirPaso3() {
        const select = document.getElementById('medio-pago');
        if (select) RC.paso_3_formulario.medios_pago.forEach(mp => { const o = document.createElement('option'); o.value = mp; o.textContent = mp; select.appendChild(o); });
        ['input-nombre', 'input-whatsapp', 'input-email', 'medio-pago', 'input-mensaje'].forEach(id => {
            const el = document.getElementById(id); if (el) el.addEventListener('change', actualizarResumen);
        });
    }

    function actualizarResumen() {
        document.getElementById('res-apto').textContent = estado.aptSeleccionado?._nombre_memoria || '-';
        document.getElementById('res-desde').textContent = estado.fechaDesde || '-';
        document.getElementById('res-hasta').textContent = estado.fechaHasta || '-';
        document.getElementById('res-noches').textContent = estado.noches || '-';
        document.getElementById('res-precio').textContent = estado.aptSeleccionado ? `${MONEDA}${estado.aptSeleccionado.precio_noche.toLocaleString('es-AR')}` : '-';
        document.getElementById('res-total').textContent = `${MONEDA}${estado.total.toLocaleString('es-AR')}`;
        document.getElementById('res-sena').textContent = `${MONEDA}${estado.sena.toLocaleString('es-AR')}`;
        document.getElementById('res-saldo').textContent = `${MONEDA}${estado.saldo.toLocaleString('es-AR')}`;
    }

    function rellenarResumenFinal() {
        estado.nombre = document.getElementById('input-nombre').value.trim();
        estado.whatsapp = document.getElementById('input-whatsapp').value.trim();
        estado.email = document.getElementById('input-email').value.trim();
        estado.medioPago = document.getElementById('medio-pago').value;
        estado.mensaje = document.getElementById('input-mensaje').value.trim();
        document.getElementById('final-apto').textContent = estado.aptSeleccionado._nombre_memoria;
        document.getElementById('final-desde').textContent = estado.fechaDesde;
        document.getElementById('final-hasta').textContent = estado.fechaHasta;
        document.getElementById('final-huesp').textContent = estado.huespedes;
        document.getElementById('final-pago').textContent = estado.medioPago;
        document.getElementById('final-total').textContent = `${MONEDA}${estado.total.toLocaleString('es-AR')}`;
        document.getElementById('final-sena').textContent = `${MONEDA}${estado.sena.toLocaleString('es-AR')}`;
        document.getElementById('final-saldo').textContent = `${MONEDA}${estado.saldo.toLocaleString('es-AR')}`;
        document.getElementById('final-nombre').textContent = estado.nombre;
        document.getElementById('final-whatsapp').textContent = estado.whatsapp;
    }

    function formatearFecha(fechaStr) {
        if (!fechaStr) return '-';
        // fechaStr viene en formato YYYY-MM-DD
        const partes = fechaStr.split('-');
        if (partes.length !== 3) return fechaStr;
        const anioCorto = partes[0].substring(2); // obtiene los últimos dos dígitos del año
        return `${partes[2]}/${partes[1]}/${anioCorto}`;
    }

    function generarLinkWhatsApp() {
        const saludo = "¡Hola Monte Zion! 👋 Quisiera confirmar mi reserva:\n\n";
        const emailStr = estado.email ? ` | Email: ${estado.email}` : "";
        const texto = saludo + C.contacto.whatsapp_template
            .replace('{{apartamento}}', estado.aptSeleccionado._nombre_memoria)
            .replace('{{desde}}', formatearFecha(estado.fechaDesde))
            .replace('{{hasta}}', formatearFecha(estado.fechaHasta))
            .replace('{{huespedes}}', estado.huespedes)
            .replace('{{medio_pago}}', estado.medioPago)
            .replace('{{total}}', `${MONEDA}${estado.total.toLocaleString('es-AR')}`)
            .replace('{{sena}}', `${MONEDA}${estado.sena.toLocaleString('es-AR')}`)
            .replace('{{nombre}}', estado.nombre)
            .replace('{{whatsapp_user}}', estado.whatsapp)
            .replace('{{email_user}}', emailStr)
            .replace('{{mensaje}}', estado.mensaje || '(sin mensaje adicional)') + "\n\n";
        return `https://wa.me/${RC.config_general.whatsapp_destino}?text=${encodeURIComponent(texto)}`;
    }

    function irAPaso(n) {
        document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.step-dot').forEach((d, i) => { d.classList.toggle('active', i + 1 === n); d.classList.toggle('done', i + 1 < n); });
        document.querySelectorAll('.step-connector').forEach((c, i) => c.classList.toggle('done', i < n - 1));
        const panel = document.getElementById(`paso-${n}`);
        if (panel) { panel.classList.add('active'); panel.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        estado.paso = n;
    }

    function validarPaso1() { if (!estado.aptSeleccionado) { mostrarAlerta('paso1-error', 'Seleccioná un apartamento.'); return false; } return true; }
    function validarPaso2() {
        if (!estado.fechaDesde || !estado.fechaHasta) { mostrarAlerta('paso2-fechas-error', 'Seleccioná las fechas.'); return false; }
        if (estado.noches < 1) { mostrarAlerta('paso2-fechas-error', 'Mínimo 1 noche.'); return false; }
        return true;
    }
    function validarPaso3() {
        const n = document.getElementById('input-nombre').value.trim();
        const w = document.getElementById('input-whatsapp').value.trim();
        const p = document.getElementById('medio-pago').value;
        if (!n) { mostrarAlerta('paso3-error', 'El nombre es obligatorio.'); return false; }
        if (!w) { mostrarAlerta('paso3-error', 'El WhatsApp es obligatorio.'); return false; }
        if (!p) { mostrarAlerta('paso3-error', 'Seleccioná un medio de pago.'); return false; }
        return true;
    }
    function mostrarAlerta(id, msg) {
        const el = document.getElementById(id);
        if (el) { el.textContent = msg; el.classList.add('visible'); setTimeout(() => el.classList.remove('visible'), 5000); }
    }

    document.addEventListener('DOMContentLoaded', () => {
        aplicarTema();
        construirHeader();
        construirPaso1();
        construirPaso2();
        construirPaso3();

        // Preselección por URL ?apt=
        const aptParam = new URLSearchParams(window.location.search).get('apt');
        if (aptParam) {
            const card = document.querySelector(`.reserva-apt-card[data-id="${aptParam}"]`);
            if (card) card.click();
        }

        document.getElementById('btn-paso1-siguiente')?.addEventListener('click', () => { if (validarPaso1()) irAPaso(2); });
        document.getElementById('btn-paso2-volver')?.addEventListener('click', () => irAPaso(1));
        document.getElementById('btn-paso2-siguiente')?.addEventListener('click', () => { if (validarPaso2()) { actualizarResumen(); irAPaso(3); } });
        document.getElementById('btn-paso3-volver')?.addEventListener('click', () => irAPaso(2));
        document.getElementById('btn-paso3-siguiente')?.addEventListener('click', () => { 
            if (validarPaso3()) {
                // Rellenar datos en el estado local
                estado.nombre = document.getElementById('input-nombre').value.trim();
                estado.whatsapp = document.getElementById('input-whatsapp').value.trim();
                estado.email = document.getElementById('input-email').value.trim();
                estado.medioPago = document.getElementById('medio-pago').value;
                estado.mensaje = document.getElementById('input-mensaje').value.trim();
                
                // Redirigir directamente a WhatsApp
                window.open(generarLinkWhatsApp(), '_blank');
            } 
        });

        if (fab) {
            fab.href = `https://wa.me/${C.contacto.whatsapp_numero}?text=Hola%20Monte%20Zion!%20Quiero%20hacer%20una%20reserva.`;
            fab.target = '_blank';
            fab.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>`;
        }

        const footDateEl = document.getElementById('footer-fecha');
        if (footDateEl) footDateEl.textContent = new Date().toLocaleDateString('es-AR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const footCopyEl = document.getElementById('footer-copyright');
        if (footCopyEl) footCopyEl.textContent = C.footer.copyright;
        const footPrivEl = document.getElementById('footer-privacidad');
        if (footPrivEl) { footPrivEl.textContent = C.legal.texto_footer_privacidad; footPrivEl.href = C.legal.url_privacidad; }
    });

})();
