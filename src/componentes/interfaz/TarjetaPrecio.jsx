import { enlacesSociales } from '../../datos/enlaces';

// ==========================================
// COMPONENTE: TARJETA DE PRECIO
// ==========================================
// Renderiza una tarifa individual con su título, precio,
// descripción, lista de características y botón de WhatsApp.

export default function TarjetaPrecio({ plan }) {
  // Obtenemos el enlace de WhatsApp correcto de enlaces.js según la clave
  const enlaceWhatsApp = enlacesSociales[plan.whatsappLinkKey];

  return (
    <article className={`premium-card pricing-card ${plan.isRecommended ? 'recommended-card' : ''}`}>
      {plan.isRecommended && <div className="recommended-badge">Popular</div>}
      
      <div className="card-content">
        <span className="card-number">{plan.type}</span>
        <h3>{plan.title}</h3>
        <div className="pricing-price">{plan.price}</div>
        <p className="pricing-desc">{plan.description}</p>
        
        <ul className="pricing-features">
          {plan.features.map((caracteristica, idx) => (
            <li key={idx}>{caracteristica}</li>
          ))}
        </ul>
        
        <a 
          href={enlaceWhatsApp}
          target="_blank" 
          rel="noopener noreferrer" 
          className={`small-btn ${plan.isRecommended ? 'accent-btn' : ''}`}
          style={{ textAlign: "center", display: "block", marginTop: "auto", boxSizing: "border-box" }}
        >
          Elegir Plan
        </a>
      </div>
    </article>
  );
}
