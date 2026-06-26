import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ==========================================
// COMPONENTE: SECCIÓN DE REVELADO (Reveal Section)
// ==========================================
// Usa GSAP y ScrollTrigger para ir iluminando un texto
// a medida que el usuario baja por la página.

// Registramos el plugin de ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SeccionRevelado({ isReady }) {
  const refSeccion = useRef(null);
  
  const texto = "El 99% de las páginas web son invisibles. Plantillas lentas, diseños aburridos y cero personalidad. Nosotros construimos el 1% restante: activos digitales diseñados a medida para dominar el mercado y aplastar a tu competencia.";
  const palabras = texto.split(" ");

  useEffect(() => {
    if (!isReady || !refSeccion.current) return;

    // Animación GSAP: cada palabra pasa de borrosa/oscura a clara
    const contexto = gsap.context(() => {
      gsap.to(".word-reveal", {
        opacity: 1, 
        filter: "blur(0px)", 
        stagger: 0.1,
        scrollTrigger: { 
          trigger: refSeccion.current, 
          start: "top 95%", 
          end: "bottom 80%", 
          scrub: true 
        }
      });
    }, refSeccion);

    return () => contexto.revert();
  }, [isReady]);

  return (
    <section className="reveal-section">
      <div className="reveal-container" id="scroll-container" ref={refSeccion}>
        <p className="reveal-text" id="reveal-text">
          {palabras.map((palabra, idx) => (
            <span 
              key={idx} 
              className="word-reveal" 
              style={{ opacity: 0.1, filter: "blur(5px)", display: "inline-block", marginRight: "10px" }}
            >
              {palabra}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
