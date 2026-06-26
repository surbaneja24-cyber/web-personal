import { datosServicios } from '../../datos/contenido';
import TarjetaServicio from '../interfaz/TarjetaServicio';

// ==========================================
// COMPONENTE: SECCIÓN DE SERVICIOS
// ==========================================
// Genera todas las tarjetas de servicios basándose en los datos
// definidos en datos/contenido.js.

export default function SeccionServicios() {
  return (
    <section className="services-section" id="servicios">
      <div className="services-header">
        <h2 className="section-title">CERO <span className="text-outline">PLANTILLAS.</span></h2>
      </div>

      <div className="cards-grid">
        {/* Recorremos el array de servicios y creamos una tarjeta para cada uno */}
        {datosServicios.map((servicio) => (
          <TarjetaServicio key={servicio.id} servicio={servicio} />
        ))}
      </div>
    </section>
  );
}
