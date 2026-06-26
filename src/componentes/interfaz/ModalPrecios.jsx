import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { datosPrecios } from '../../datos/contenido';
import TarjetaPrecio from './TarjetaPrecio';

// ==========================================
// COMPONENTE: MODAL DE PRECIOS
// ==========================================
// Ventana emergente que muestra las tarjetas de precios.
// Usa GSAP para animación suave de entrada y salida.
//
// Se resetea tlRef al cerrar para evitar que la timeline
// apunte a nodos DOM destruidos en la siguiente apertura.

export default function ModalPrecios({ isOpen, onClose }) {
  const refModal = useRef(null);
  const refTimeline = useRef(null);
  // estaCerrando controla si la animación de cierre está en curso
  const [estaCerrando, setEstaCerrando] = useState(false);

  // El modal se renderiza cuando está abierto O cuando está cerrándose (animación)
  const debeRenderizar = isOpen || estaCerrando;

  // Crear/reproducir/revertir la timeline según el estado
  useEffect(() => {
    if (!debeRenderizar || !refModal.current) return;

    // Crear la timeline si no existe
    if (!refTimeline.current) {
      refTimeline.current = gsap.timeline({
        paused: true,
        defaults: { ease: 'power3.out' },
        onReverseComplete: () => {
          setEstaCerrando(false);
          refTimeline.current = null;
          document.body.style.overflow = '';
          if (document.documentElement.classList.contains('lenis')) {
            document.documentElement.classList.remove('lenis-stopped');
          }
        },
      });

      refTimeline.current
        .to(refModal.current, { autoAlpha: 1, duration: 0.3 })
        .fromTo(
          '.pricing-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
          '-=0.1'
        );
    }

    // Abrir o cerrar según el estado
    if (isOpen) {
      refModal.current.setAttribute('aria-hidden', 'false');
      refModal.current.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';
      if (document.documentElement.classList.contains('lenis')) {
        document.documentElement.classList.add('lenis-stopped');
      }
      refTimeline.current.play();
    } else if (estaCerrando) {
      if (refModal.current) {
        refModal.current.setAttribute('aria-hidden', 'true');
      }
      if (refTimeline.current) {
        refTimeline.current.reverse();
      }
    }

    // Cleanup: matar la timeline si el componente se desmonta forzosamente
    return () => {
      if (refTimeline.current) {
        refTimeline.current.kill();
        refTimeline.current = null;
      }
    };
  }, [isOpen, estaCerrando, debeRenderizar]);

  // Detectar cuando isOpen pasa de true a false para iniciar animación de cierre
  const refEstadoAnterior = useRef(isOpen);
  useEffect(() => {
    if (refEstadoAnterior.current && !isOpen) {
      setEstaCerrando(true);
    }
    refEstadoAnterior.current = isOpen;
  }, [isOpen]);

  if (!debeRenderizar) return null;

  return (
    <div
      id="pricing-modal"
      className="modal-hidden"
      aria-hidden="true"
      ref={refModal}
      style={{ opacity: 0, visibility: 'hidden' }}
    >
      {/* Fondo oscuro — clic cierra el modal */}
      <div className="modal-backdrop" id="modal-backdrop" onClick={onClose}></div>

      <div className="modal-content-wrapper">
        <button
          id="close-pricing-btn"
          className="modal-close-btn magnetic"
          aria-label="Cerrar modal"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="cards-grid pricing-grid">
          {datosPrecios.map((plan) => (
            <TarjetaPrecio key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
