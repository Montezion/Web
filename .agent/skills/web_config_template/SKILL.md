---
name: web_config_template
description: |
  Generates and bootstraps a modular, config-driven static website based on 2-3 design reference pages.
  Guides the user through choosing modules (hero, sliders, cards, footer) and outputs a custom config.js and matching HTML layout.
  Includes a dynamic header dropdown selector for testing 8 distinct theme palettes (colors and font pairings) in design phase.
  Triggers: build config template, create modular web, template bootstrap, design config web, build template, web_config_template.
---

# Web Config Template Habilidad

Esta habilidad permite al asistente estructurar y configurar un sitio web modular estático (con arquitectura idéntica a Monte Zion) a partir de referencias visuales o de texto y la selección interactiva de módulos por parte del usuario.

## Requisitos y Modo de Operación

Cuando el usuario invoque esta habilidad, debes guiarlo a través de un proceso interactivo de recopilación de requisitos de diseño, estructuración de módulos seleccionables y asignación de temas de colores.

### Flujo de Trabajo:
```
INVENTARIO DE REFERENCIAS → SELECCIÓN DE MÓDULOS → DEFINICIÓN DE 8 TEMAS → GENERACIÓN DE ARCHIVOS → VALIDACIÓN
```

---

## Fases de la Habilidad

### Fase 1: Análisis de Referencias y Diseño
Solicita al usuario de 2 a 3 páginas web de referencia (o descripciones detalladas de su diseño y comportamiento ideal) para identificar:
1. **Disposición y Estructura:** ¿Tiene barra de navegación fija? ¿Usa carruseles infinitos, cuadrículas de servicios o sliders interactivos?
2. **Identidad y Tono Visual:** Paleta de colores dominante y tipografías deseadas.
3. **Módulos Críticos:** Mapea el diseño a componentes reutilizables y desacoplados del HTML.

### Fase 2: Selección de Módulos (Interactivo)
Pregunta al usuario cuáles de los siguientes módulos modulares incluirá en su página y cómo se estructurará su información en el objeto central de configuración:
- **`encabezado`:** Logo configurable, enlaces estáticos/anclajes y botón de llamado a la acción primario. *Incluye obligatoriamente un selector de temas dropdown inyectado temporalmente en la etapa de diseño para alternar entre los 8 temas.*
- **`hero`:** Soporte de video loop (desktop y mobile desacoplados) con textos rotativos dinámicos.
- **`tarjetas` / `apartamentos`:** Elementos tipo grilla o slider interactivo infinito que despliega productos, servicios o habitaciones con comodidades personalizables y enlace a detalle.
- **`servicios` / `características`:** Listas modulares por categorías acompañadas de iconos customizables.
- **`galeria`:** Un carrusel infinito seamless autodeslizable con soporte de Lightbox al hacer clic/tap.
- **`que_hacer` / `actividades`:** Grillas responsivas auto-ajustables según la cantidad de elementos.
- **`ubicacion`:** Integración de mapa interactivo o loop de video dinámico con enlaces de geolocalización.
- **`formulario_reserva` / `contacto`:** Flujo de formulario dinámico multietapas personalizable con salida de mensajes formateados hacia WhatsApp o Email.
- **`apariencia`:** Paletas de colores intercambiables por variables CSS asignadas al `:root` desde el script.

### Fase 3: Estructuración Obligatoria de Apariencia (8 Temas)
El objeto `apariencia` generado debe incluir siempre 8 temas estructurados con diferentes paletas cromáticas y combinaciones de tipografías (fuentes de títulos y cuerpo). 
Ejemplo de esquema de apariencia con 8 temas en `config.js`:
```javascript
  apariencia: {
    tema_activo: "TEMA_1",
    paletas: {
      TEMA_1: {
        "--color-fondo-general": "#0B162C",
        "--color-texto-principal": "#FFFFFF",
        "--fuente-titulos": "'Playfair Display', Georgia, serif",
        "--fuente-cuerpo": "'Montserrat', sans-serif"
      },
      TEMA_2: { ... },
      TEMA_3: { ... },
      TEMA_4: { ... },
      TEMA_5: { ... },
      TEMA_6: { ... },
      TEMA_7: { ... },
      TEMA_8: { ... }
    }
  }
```

### Fase 4: Generación del Selector de Temas Temporal (Dropdown)
Para la etapa de diseño, el script base `js/app.js` debe inyectar de forma dinámica en la cabecera un selector HTML `<select>` con ID `theme-switcher` que lea las 8 paletas de `SITE_CONFIG.apariencia.paletas` y permita al usuario alternarlas al instante cambiando las variables del `:root`.
Este componente debe estar encapsulado para ser retirado fácilmente comentando una sola línea de código en producción:
```javascript
// --- SELECTOR TEMPORAL DE TEMAS ---
if (!document.getElementById('theme-switcher')) {
    const select = document.createElement('select');
    select.id = 'theme-switcher';
    // Lógica de carga e inyección en header-nav...
}
// ---------------------------------
```

### Fase 5: Generación de la Estructura HTML y JS
1. Crea un `index.html` limpio y semántico preparado para renderizar condicionalmente los módulos activos del config.
2. Genera un script base `js/app.js` optimizado para inyectar los datos del config sin interferir con la maquetación.
3. Define en `index.css` el sistema de temas basado en variables CSS consumidas desde el objeto `apariencia`.

---

## Ejemplo de Configuración Generada
```javascript
const SITE_CONFIG = {
  marketing: {
    meta_title: "Mi Sitio Modular",
    meta_description: "Sitio web dinámico de alto rendimiento."
  },
  apariencia: {
    tema_activo: "TEMA_1",
    paletas: {
      TEMA_1: {
        "--color-fondo-general": "#FFF8F5",
        "--color-texto-principal": "#3E2723",
        "--color-acento": "#D84315"
      }
      // ... más los otros 7 temas estructurados
    }
  }
};
```
