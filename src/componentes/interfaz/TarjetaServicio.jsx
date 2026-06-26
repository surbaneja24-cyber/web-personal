import { useRef } from 'react';

// ==========================================
// COMPONENTE: TARJETA DE SERVICIO
// ==========================================
// Cada una de las tarjetas que muestran los servicios ofrecidos.
// Incluye el efecto "linterna" que sigue al cursor del ratón.

export default function TarjetaServicio({ servicio }) {
  const refTarjeta = useRef(null);

  // Calcula la posición del ratón para mover el efecto linterna
  const alMoverRaton = (e) => {
    if (!refTarjeta.current) return;
    const rect = refTarjeta.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Pasamos las coordenadas como variables CSS
    refTarjeta.current.style.setProperty('--x', `${x}px`);
    refTarjeta.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <article 
      className="premium-card" 
      ref={refTarjeta}
      onMouseMove={alMoverRaton}
    >
      <div className="card-content">
        <span className="card-number">{servicio.id} // {servicio.category}</span>
        <h3>{servicio.title}</h3>
        <p>{servicio.description}</p>
      </div>
    </article>
  );
}
