import { useEffect } from 'react';
import Lenis from 'lenis';

// ==========================================
// HOOK: useScrollSuave
// ==========================================
// Inicializa Lenis para scroll suave y lo expone como window.lenis
// para que otros componentes (como BarraNavegacion) puedan usarlo.
//
// Corrige dos bugs del código original:
//   1. En móvil, Lenis se creaba pero nunca se destruía (memory leak).
//   2. El requestAnimationFrame nunca se cancelaba, corriendo infinitamente.

export default function useScrollSuave() {
  useEffect(() => {
    const lenis = new Lenis();

    // Lo exponemos globalmente para que BarraNavegacion pueda hacer lenis.scrollTo()
    window.lenis = lenis;

    // Guardamos el ID del frame para poder cancelarlo en el cleanup
    let idFrame;

    function alFrame(time) {
      lenis.raf(time);
      idFrame = requestAnimationFrame(alFrame);
    }

    // Arrancamos el bucle de animación
    idFrame = requestAnimationFrame(alFrame);

    // Cleanup: se ejecuta SIEMPRE (desktop y mobile) al desmontar
    return () => {
      cancelAnimationFrame(idFrame);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);
}
