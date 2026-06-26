import { enlacesSociales } from '../../datos/enlaces';

// ==========================================
// COMPONENTE: LLAMADA A LA ACCIÓN (Footer CTA)
// ==========================================
// Sección inferior con el botón de WhatsApp para iniciar proyecto
// y el botón para abrir la ventana de precios.

export default function LlamadaAccion({ onOpenPricing }) {
  return (
    <section className="footer-cta" id="contacto" style={{ gap: "1rem", flexWrap: "wrap" }}>
      <a 
        href={enlacesSociales.whatsappMain} 
        target="_blank"
        rel="noopener noreferrer" 
        className="big-btn" 
        style={{ textAlign: "center" }}
      >
        INICIAR PROYECTO
      </a>
      <button 
        id="open-pricing-btn" 
        className="secondary-btn"
        onClick={onOpenPricing}
      >
        VER TARIFAS
      </button>
    </section>
  );
}
