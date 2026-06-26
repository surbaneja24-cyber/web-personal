import { useEffect, useState } from 'react';

// ==========================================
// COMPONENTE: CARGA INICIAL (Intro Loader)
// ==========================================
// Pantalla negra con el logo SVG dibujándose que aparece al entrar a la web.
//
// Funciona en DOS FASES con temporizadores:
//   Fase 1 (0–2s): Se muestra el logo animándose
//   Fase 2 (2s–2.8s): Se desvanece con opacity → 0 (transición CSS de 0.8s)
//   Fase 3 (2.8s): Se destruye del DOM y se avisa a la app

const DURACION_LOGO_MS = 2000;       // Tiempo que se muestra el logo
const DURACION_FADEOUT_MS = 800;      // Duración de la transición CSS de opacity

export default function CargaInicial({ onFinish }) {
  const [fase, setFase] = useState('visible'); // 'visible' | 'fading' | 'destroyed'

  useEffect(() => {
    // Fase 1 → 2: Tras mostrar el logo, iniciamos el fade-out
    const timerFade = setTimeout(() => {
      setFase('fading');
    }, DURACION_LOGO_MS);

    // Fase 2 → 3: Tras el fade-out, destruimos y avisamos
    const timerDestroy = setTimeout(() => {
      setFase('destroyed');
      if (onFinish) onFinish();
    }, DURACION_LOGO_MS + DURACION_FADEOUT_MS);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerDestroy);
    };
  }, [onFinish]);

  // Si ya pasó la fase 3, no renderizamos nada
  if (fase === 'destroyed') return null;

  return (
    <div
      id="intro-loader"
      className={fase === 'fading' ? 'loader-hidden' : ''}
    >
      <svg viewBox="0 0 100 100" className="logo-svg-intro">
        <polyline className="logo-path" points="26,38 42,75 42,32 58,22 58,75 74,38" />
        <polyline className="logo-path" points="42,75 51,45 54,52 49,68" />
      </svg>
    </div>
  );
}
