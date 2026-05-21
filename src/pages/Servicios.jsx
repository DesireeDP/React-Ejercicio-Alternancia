import React from 'react';
import Galeria from '../components/Galeria';

// Componente que representa la página de Servicios.
// Contiene la galería interactiva que nos piden en el ejercicio 3.
function Servicios() {
  return (
    <div className="page-container">
      {/* Título de la sección */}
      <h1>Servicios</h1>
      
      {/* Introducción de la sección */}
      <p style={{ marginBottom: '2rem', fontSize: '1.1rem', color: 'var(--text-color)' }}>
        Explora nuestro catálogo visual interactivo de servicios. Haz clic en cualquiera de las 
        visiones inferiores para adentrarte en sus misterios y descubrir los detalles.
      </p>

      {/* Galería interactiva de imágenes */}
      <Galeria />
    </div>
  );
}

// Lo exportamos para usarlo en nuestras rutas.
export default Servicios;
