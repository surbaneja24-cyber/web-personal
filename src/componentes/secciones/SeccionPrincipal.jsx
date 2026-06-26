import { useEffect, useRef } from 'react';

// ==========================================
// COMPONENTE: SECCIÓN PRINCIPAL (Hero Section)
// ==========================================
// Primera sección visible al cargar. Incluye el Canvas de fondo
// con cuadrícula animada y los textos con efectos blur y rotación.

export default function SeccionPrincipal({ isReady }) {
  const refCanvas = useRef(null);
  const refSeccion = useRef(null);
  const refContenedorTexto = useRef(null);

  // Animación de texto borroso (blur → claro)
  useEffect(() => {
    if (!isReady || !refContenedorTexto.current) return;
    
    const temporizador = setTimeout(() => {
      const palabras = refContenedorTexto.current.querySelectorAll('.blur-word-hero');
      palabras.forEach((el, i) => {
        setTimeout(() => el.classList.add('animate'), i * 120);
      });
    }, 100);

    return () => clearTimeout(temporizador);
  }, [isReady]);

  // Animación del Canvas (cuadrícula de fondo)
  useEffect(() => {
    if (!isReady || !refCanvas.current) return;
    const esEscritorio = window.matchMedia("(pointer: fine)").matches;
    if (!esEscritorio) return;

    const canvas = refCanvas.current;
    const ctx = canvas.getContext('2d');
    
    // Configuración de la cuadrícula
    const TAMANO_CELDA = 32;
    const VELOCIDAD = 0.35;
    const COLOR_BORDE = "#121212";
    const COLOR_HOVER = "#1a1a1a";

    let desplazamiento = { x: 0, y: 0 };
    let celdaActiva = null;
    let estaAnimando = true;
    let idAnimacion;

    const ajustarTamano = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', ajustarTamano);
    ajustarTamano();
    
    const alMoverRaton = (e) => {
      if (!estaAnimando) return;
      celdaActiva = {
        x: Math.floor(e.clientX / TAMANO_CELDA),
        y: Math.floor(e.clientY / TAMANO_CELDA),
      };
    };
    window.addEventListener('mousemove', alMoverRaton);

    const animar = () => {
      if (!estaAnimando) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      desplazamiento.x = (desplazamiento.x - VELOCIDAD) % TAMANO_CELDA;
      desplazamiento.y = (desplazamiento.y - VELOCIDAD) % TAMANO_CELDA;
      
      for (let col = -1; col < Math.ceil(canvas.width / TAMANO_CELDA) + 1; col++) {
        for (let fila = -1; fila < Math.ceil(canvas.height / TAMANO_CELDA) + 1; fila++) {
          const posX = col * TAMANO_CELDA + desplazamiento.x;
          const posY = fila * TAMANO_CELDA + desplazamiento.y;
          const esCeldaActiva = (celdaActiva && celdaActiva.x === col && celdaActiva.y === fila);
          
          ctx.strokeStyle = COLOR_BORDE; 
          ctx.strokeRect(posX, posY, TAMANO_CELDA, TAMANO_CELDA);
          
          if (esCeldaActiva) { 
            ctx.fillStyle = COLOR_HOVER; 
            ctx.globalAlpha = 0.5; 
            ctx.fillRect(posX, posY, TAMANO_CELDA, TAMANO_CELDA); 
            ctx.globalAlpha = 1; 
          }
        }
      }
      idAnimacion = requestAnimationFrame(animar);
    };

    // Solo animar cuando la sección es visible (IntersectionObserver)
    if (typeof IntersectionObserver !== 'undefined' && refSeccion.current) {
      const observador = new IntersectionObserver((entries) => {
        estaAnimando = entries[0].isIntersecting;
        if (estaAnimando) animar(); 
      }, { threshold: 0 });
      observador.observe(refSeccion.current);
    } else {
      animar();
    }

    // Limpieza al desmontar
    return () => {
      window.removeEventListener('resize', ajustarTamano);
      window.removeEventListener('mousemove', alMoverRaton);
      cancelAnimationFrame(idAnimacion);
      estaAnimando = false;
    };
  }, [isReady]);

  // Texto principal a separar en palabras
  const textoPrincipal = "¿Llevamos tu proyecto al siguiente nivel?";
  const palabras = textoPrincipal.split(' ');

  return (
    <>
      {/* Canvas de cuadrícula de fondo */}
      <canvas id="shapeGrid" ref={refCanvas} aria-hidden="true"></canvas>

      <div className="content-overlay" id="hero-section" ref={refSeccion}>
        <div className="brand-container">
          <svg className="logo-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8"
            strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
            <polyline points="26,38 42,75 42,32 58,22 58,75 74,38" />
            <polyline points="42,75 51,45 54,52 49,68" />
          </svg>

          <div>
            {/* Texto principal con efecto Blur */}
            <h1 id="blur-text-container" ref={refContenedorTexto}>
              {palabras.map((palabra, idx) => (
                <span key={idx} className="blur-word-hero" aria-hidden="true">
                  {palabra}
                </span>
              ))}
            </h1>

            {/* Texto rotativo */}
            <div className="rotating-text-container" aria-hidden="true">
              <span>Especialista en</span>
              <div className="words">
                <span className="word-spin">Interfaces Magnéticas</span>
                <span className="word-spin">Rendimiento Extremo</span>
                <span className="word-spin">Conversión de Ventas</span>
                <span className="word-spin">Interfaces Magnéticas</span>
              </div>
            </div>

            <div className="dev-signature">
              <span>Santiago | Web Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
