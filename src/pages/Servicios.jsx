import React from 'react';
import Galeria from '../components/Galeria';
import Blog from '../components/Blog';

// Componente que representa la página de Servicios.
// Contiene la galería interactiva del ejercicio 3 y el sistema de blog dinámico del ejercicio 4.
function Servicios() {
  return (
    <div className="page-container">
      {/* Título de la sección */}
      <h1>Servicios</h1>
      
      {/* Introducción de la sección */}
      <p style={{ marginBottom: '2.5rem', fontSize: '1.15rem', color: 'var(--text-color)', textAlign: 'center' }}>
        Explora nuestro catálogo visual interactivo de servicios. Haz clic en cualquiera de las 
        visiones inferiores para adentrarte en sus misterios y descubrir los detalles.
      </p>

      {/* Galería interactiva de imágenes (Ejercicio 3) */}
      <Galeria />

      {/* Sistema de Posts Dinámicos / Blog (Ejercicio 4) */}
      <Blog />
    </div>
  );
}

// Lo exportamos para usarlo en nuestras rutas.
export default Servicios;
