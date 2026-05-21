import React, { useState } from 'react';
import './Galeria.css';

// Importamos las imágenes temáticas generadas que representan nuestros servicios visuales
import gothicCastle from '../assets/gothic_castle.png';
import vampireLibrary from '../assets/vampire_library.png';
import crimsonRose from '../assets/crimson_rose.png';
import bloodMoonForest from '../assets/blood_moon_forest.png';

// Colección de imágenes con información descriptiva sobre cada una
const IMAGES = [
  {
    id: 1,
    src: gothicCastle,
    alt: "Castillo gótico ancestral iluminado por una gran luna llena rodeado de niebla",
    title: "Castillo Ancestral",
    description: "Nuestra fortaleza principal, un refugio donde el tiempo se detiene bajo el influjo eterno de la luna llena."
  },
  {
    id: 2,
    src: vampireLibrary,
    alt: "Interior de una biblioteca arcana con cortinas de terciopelo carmesí y velas encendidas",
    title: "Biblioteca Arcana",
    description: "Un santuario del conocimiento prohibido, albergando códices antiguos bajo la cálida luz de las velas."
  },
  {
    id: 3,
    src: crimsonRose,
    alt: "Rosa de un color rojo carmesí brillante cubierta de finas gotas de rocío sobre un fondo oscuro",
    title: "Rosa de Sangre",
    description: "Símbolo de belleza eterna y misterio, floreciendo con orgullo en las sombras de nuestros jardines."
  },
  {
    id: 4,
    src: bloodMoonForest,
    alt: "Bosque gótico brumoso y retorcido bajo una gigantesca luna de sangre",
    title: "Bosque Susurrante",
    description: "Senderos cubiertos de bruma donde los susurros del viento guían a las almas errantes bajo la luna carmesí."
  }
];

/**
 * Componente Galeria
 * Muestra una galería interactiva de imágenes de alta calidad con estética gótica.
 * Permite cambiar la imagen principal al pulsar sobre cualquiera de las miniaturas.
 */
function Galeria() {
  // Estado para mantener la imagen seleccionada activa
  const [activeImage, setActiveImage] = useState(IMAGES[0]);

  // Manejador para cambiar la imagen activa al hacer clic en una miniatura
  const handleSelectImage = (image) => {
    setActiveImage(image);
  };

  return (
    <div className="galeria-container">
      {/* Contenedor de la Imagen Principal */}
      <div className="galeria-main-view">
        {/* Usamos la propiedad 'key' con el ID de la imagen activa. 
            Esto obliga a React a volver a montar este contenedor cada vez que cambia el ID,
            disparando la animación CSS de entrada (fadeInScale) de forma limpia y fluida. */}
        <div className="galeria-main-wrapper" key={activeImage.id}>
          <img 
            src={activeImage.src} 
            alt={activeImage.alt} 
            className="galeria-main-img" 
          />
          {/* Tarjeta de información sobreimpresa con diseño de glassmorphism */}
          <div className="galeria-main-info">
            <h3>{activeImage.title}</h3>
            <p>{activeImage.description}</p>
          </div>
        </div>
      </div>

      {/* Sección inferior con el listado de miniaturas */}
      <div className="galeria-thumbnails-section">
        <h4 className="galeria-thumbnails-title">Selecciona una de nuestras visiones</h4>
        <div className="galeria-thumbnails-grid">
          {IMAGES.map((img) => {
            // Evaluamos si esta miniatura es la que está seleccionada actualmente
            const isSelected = activeImage.id === img.id;
            
            return (
              <button
                key={img.id}
                className={`galeria-thumb-btn ${isSelected ? 'active-thumb' : ''}`}
                onClick={() => handleSelectImage(img)}
                aria-label={`Ver imagen principal: ${img.title}`}
                aria-current={isSelected ? 'true' : 'false'}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="galeria-thumb-img" 
                />
                
                {/* Reflejo visual del estado activo usando renderizado condicional ternario / && */}
                {isSelected && (
                  <div className="galeria-thumb-active-overlay">
                    <span className="galeria-thumb-active-dot"></span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Galeria;
