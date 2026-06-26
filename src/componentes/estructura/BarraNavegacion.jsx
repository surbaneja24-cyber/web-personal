import { useState } from 'react';
import gsap from 'gsap';
import { enlacesMenu } from '../../datos/enlaces';

// ==========================================
// COMPONENTE: BARRA DE NAVEGACIÓN Y MENÚ OVERLAY
// ==========================================
// Maneja la barra superior (logo + botón "MENÚ") y la pantalla completa
// negra que aparece al pulsar el botón con los enlaces de navegación.

export default function BarraNavegacion() {
  const [estaAbierto, setEstaAbierto] = useState(false);

  // Función para abrir/cerrar el menú y animarlo
  const alternarMenu = () => {
    const nuevoEstado = !estaAbierto;
    setEstaAbierto(nuevoEstado);

    if (nuevoEstado) {
      // Si se abre, animamos los enlaces para que suban apareciendo
      gsap.to(".menu-item", { y: 0, opacity: 1, stagger: 0.1, delay: 0.2 });
    } else {
      // Si se cierra, los ocultamos
      gsap.to(".menu-item", { y: 50, opacity: 0 });
    }
  };

  // Función para manejar el clic en un enlace del menú
  const alHacerClicEnlace = (e, idDestino) => {
    e.preventDefault();
    const elementoDestino = document.querySelector(`#${idDestino}`);
    if (elementoDestino) {
      alternarMenu(); // Cerramos el menú
      // Navegación fluida (Lenis si está, si no el scroll nativo)
      if (window.lenis) {
        window.lenis.scrollTo(elementoDestino);
      } else {
        elementoDestino.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Menú a pantalla completa (Overlay) */}
      <nav id="menu-overlay" className={estaAbierto ? 'active' : ''} aria-hidden={!estaAbierto}>
        <div className="menu-links">
          {enlacesMenu.map((enlace) => (
            <a 
              key={enlace.id}
              href={`#${enlace.id}`} 
              className="menu-item"
              onClick={(e) => alHacerClicEnlace(e, enlace.id)}
            >
              {enlace.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Barra de navegación superior fija */}
      <header id="navbar">
        <div className="nav-logo-container">
          <a href="#" className="magnetic" aria-label="Ir al inicio">
            <svg className="nav-logo-svg" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8"
              strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
              <polyline points="26,38 42,75 42,32 58,22 58,75 74,38" />
              <polyline points="42,75 51,45 54,52 49,68" />
            </svg>
          </a>
        </div>
        <button 
          className="nav-menu magnetic" 
          id="menu-toggle" 
          aria-label="Abrir menú" 
          aria-expanded={estaAbierto}
          onClick={alternarMenu}
        >
          {estaAbierto ? 'CERRAR' : 'MENÚ'}
        </button>
      </header>
    </>
  );
}
