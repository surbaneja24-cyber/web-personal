import { textosCinta } from '../../datos/contenido';

// ==========================================
// COMPONENTE: CINTA DE TEXTO (Marquee)
// ==========================================
// Cinta animada de tecnologías que se desplaza de derecha a izquierda.
// Se duplica el contenido para lograr el efecto visual infinito en CSS.

export default function CintaTexto() {
  const contenidoCinta = (
    <div className="marquee-content">
      {textosCinta.map((texto, idx) => (
        <span key={idx}>
          {texto}<span className="dot">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="logo-loop-section" aria-hidden="true">
      <div className="marquee">
        {/* Renderizamos el contenido dos veces para el efecto infinito */}
        {contenidoCinta}
        <div className="marquee-content" aria-hidden="true">
          {textosCinta.map((texto, idx) => (
            <span key={`dup-${idx}`}>
              {texto}<span className="dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
