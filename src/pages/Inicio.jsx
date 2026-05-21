import React from 'react';
// Importamos Link de react-router-dom para navegar por la web sin recargar la página.
import { Link } from 'react-router-dom';

// Importamos las dos hermosas ilustraciones chibi subidas por el usuario
import chibigotica from '../assets/chibigotica.png';
import chibicuqui from '../assets/chibicuqui.png';

// Cargamos la hoja de estilos específica para la página de Inicio
import './Inicio.css';

/**
 * Componente de Página de Inicio (Home)
 * 
 * ¡Hola! Aquí le damos la bienvenida al usuario con una presentación súper interactiva.
 * Mediante la estructura de dos imágenes superpuestas y animaciones CSS controladas por clases,
 * alternamos entre la Chibi Gótica y la Chibi Sailor Moon sin tocar una sola línea de JS complejo.
 * ¡Eficiencia y elegancia puras!
 */
function Inicio() {
  return (
    <div className="page-container">
      {/* Título de bienvenida con la tipografía temática del tema activo */}
      <h1>Bienvenidos al Santuario Mágico</h1>
      
      <div className="chibi-presentation-card">
        {/* Marco contenedor de las Chibis con efectos de hover flotantes */}
        <div className="chibi-frame" aria-label="Ilustración chibi que cambia según el tema visual activo">
          {/* Ilustración de la versión Vampírica / Gótica */}
          <img 
            src={chibigotica} 
            className="chibi-img chibi-goth" 
            alt="Chibi Gótica en su acogedor dormitorio misterioso" 
          />
          {/* Ilustración de la versión Sailor Moon / Pastel */}
          <img 
            src={chibicuqui} 
            className="chibi-img chibi-sailor" 
            alt="Chibi Sailor en su dulce dormitorio de ensueño pastel" 
          />
        </div>

        {/* Información y textos introductorios amigables */}
        <div className="welcome-info">
          <p>
            ¡Hola! Estás en la página principal de nuestro rincón interactivo de React.
            Aquí puedes explorar cómo un mismo espacio puede transformarse por completo.
            ¿Prefieres el susurro del misterio vampírico o el destello resplandeciente de la luna pastel?
          </p>
          <p>
            ¡Prueba a pulsar el botón en la barra de navegación de arriba a la derecha y observa 
            cómo nuestro adorable chibi de bienvenida cambia de personalidad al instante!
          </p>
        </div>

        {/* Botones de navegación rápida para explorar el resto de la web */}
        <div className="quick-navigation">
          <Link to="/servicios" className="nav-explore-btn" aria-label="Ir a la sección de Servicios">
            🔮 Ver Servicios y Blog
          </Link>
          <Link to="/contacto" className="nav-explore-btn" aria-label="Ir a la página de Contacto">
            ✉️ Contactar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Inicio;

