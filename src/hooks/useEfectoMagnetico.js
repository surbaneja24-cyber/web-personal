import { useEffect } from 'react';
import gsap from 'gsap';

// ==========================================
// HOOK: useEfectoMagnetico
// ==========================================
// Hace que los elementos con clase .magnetic sigan ligeramente al cursor,
// dando un efecto interactivo premium a botones y logos.
//
// Usa DELEGACIÓN DE EVENTOS en el document, lo que resuelve el bug original
// donde los listeners se enganchaban antes de que el DOM estuviera listo.
// Con delegación, no importa cuándo aparezcan los elementos .magnetic.
//
// Parámetro:
//   estaActivo — si es false, no se activa (útil para esperar a la carga)

export default function useEfectoMagnetico(estaActivo) {
  useEffect(() => {
    // Solo activar en desktop con puntero preciso (ratón)
    const esEscritorio = window.matchMedia('(pointer: fine)').matches;
    if (!estaActivo || !esEscritorio) return;

    // --- Delegación de eventos ---
    // En lugar de buscar todos los .magnetic al montar (que pueden no existir),
    // escuchamos en el document y comprobamos si el target es .magnetic.

    function buscarMagnetico(evento) {
      return evento.target.closest('.magnetic');
    }

    function alMoverRaton(evento) {
      const elemento = buscarMagnetico(evento);
      if (!elemento) return;

      const rect = elemento.getBoundingClientRect();
      const desfaseX = evento.clientX - rect.left - rect.width / 2;
      const desfaseY = evento.clientY - rect.top - rect.height / 2;

      gsap.to(elemento, {
        x: desfaseX * 0.4,
        y: desfaseY * 0.4,
        duration: 0.3,
      });
    }

    function alSalirRaton(evento) {
      const elemento = buscarMagnetico(evento);
      if (!elemento) return;

      gsap.to(elemento, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1,0.3)',
      });
    }

    document.addEventListener('mousemove', alMoverRaton);
    document.addEventListener('mouseleave', alSalirRaton, true);

    // Cleanup: eliminamos los listeners globales
    return () => {
      document.removeEventListener('mousemove', alMoverRaton);
      document.removeEventListener('mouseleave', alSalirRaton, true);
    };
  }, [estaActivo]);
}
