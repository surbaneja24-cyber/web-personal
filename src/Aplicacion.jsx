import { useState } from 'react';

// Hooks propios
import useScrollSuave from './hooks/useScrollSuave';
import useEfectoMagnetico from './hooks/useEfectoMagnetico';

// Componentes de estructura (layout)
import BarraNavegacion from './componentes/estructura/BarraNavegacion';
import CargaInicial from './componentes/estructura/CargaInicial';

// Secciones de contenido
import SeccionPrincipal from './componentes/secciones/SeccionPrincipal';
import SeccionRevelado from './componentes/secciones/SeccionRevelado';
import SeccionServicios from './componentes/secciones/SeccionServicios';
import CintaTexto from './componentes/secciones/CintaTexto';
import LlamadaAccion from './componentes/secciones/LlamadaAccion';

// Componentes de interfaz (UI)
import ModalPrecios from './componentes/interfaz/ModalPrecios';

// ==========================================
// COMPONENTE: APLICACIÓN PRINCIPAL
// ==========================================
// Ensambla toda la página y gestiona dos estados globales:
//   1. cargaTerminada — ¿Ha terminado la pantalla de carga?
//   2. modalPreciosAbierto — ¿Está abierta la ventana de tarifas?

function Aplicacion() {
  const [cargaTerminada, setCargaTerminada] = useState(false);
  const [modalPreciosAbierto, setModalPreciosAbierto] = useState(false);

  // Scroll suave con Lenis (con cleanup correcto de RAF y destroy)
  useScrollSuave();

  // Efecto magnético en botones (se activa cuando la carga termina)
  useEfectoMagnetico(cargaTerminada);

  return (
    <>
      <CargaInicial onFinish={() => setCargaTerminada(true)} />
      
      <BarraNavegacion />
      
      <main
        id="main"
        style={{
          display: cargaTerminada ? 'block' : 'none',
          opacity: cargaTerminada ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      >
        <SeccionPrincipal isReady={cargaTerminada} />
        <SeccionRevelado isReady={cargaTerminada} />
        <SeccionServicios />
        <CintaTexto />
        <LlamadaAccion onOpenPricing={() => setModalPreciosAbierto(true)} />
      </main>

      <ModalPrecios 
        isOpen={modalPreciosAbierto} 
        onClose={() => setModalPreciosAbierto(false)} 
      />
    </>
  );
}

export default Aplicacion;
