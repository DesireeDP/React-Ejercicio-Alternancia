import React, { useState, useEffect } from 'react';
// Importamos NavLink de react-router-dom. 
// A diferencia del clásico <a> de HTML, NavLink no recarga la página y nos avisa si es la ruta actual.
import { NavLink } from 'react-router-dom';

// Importamos la hoja de estilos específica para la barra de navegación.
import './Navbar.css';

/**
 * Componente Navbar
 * 
 * ¡Hola de nuevo! Aquí es donde vamos a añadir nuestro botón mágico para alternar
 * entre el estilo Gótico y el estilo Sailor Moon. 
 * Usamos estados locales de React y los guardamos en el localStorage para que tu navegador
 * recuerde qué tema te gusta más cada vez que vuelvas a visitarnos. ¡Súper cómodo!
 */
function Navbar() {
  // Inicializamos el estado del tema leyendo del almacenamiento local (localStorage).
  // Si no hay nada guardado aún, por defecto cargamos el estilo 'goth' (gótico).
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'goth';
  });

  // Cada vez que el tema cambia, este efecto entra en acción para aplicar la clase en el body.
  // De esta forma las variables CSS globales se actualizan instantáneamente en toda la web.
  useEffect(() => {
    const body = document.body;
    if (theme === 'sailor-moon') {
      body.classList.add('theme-sailor-moon');
      body.classList.remove('theme-goth');
    } else {
      body.classList.add('theme-goth');
      body.classList.remove('theme-sailor-moon');
    }
    
    // Guardamos la elección para la posteridad
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  // Esta función se dispara al pulsar el botón del menú para alternar entre temas
  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'goth' ? 'sailor-moon' : 'goth'));
  };

  return (
    // Usamos la etiqueta semántica <nav> para indicar que esto es un menú de navegación.
    <nav className="navbar">
      <div className="navbar-content">
        
        {/* Enlaces de Navegación principales */}
        <ul className="navbar-links">
          {/* Primer enlace: Inicio */}
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Inicio
            </NavLink>
          </li>
          
          {/* Segundo enlace: Servicios */}
          <li>
            <NavLink 
              to="/servicios" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Servicios
            </NavLink>
          </li>
          
          {/* Tercer enlace: Contacto */}
          <li>
            <NavLink 
              to="/contacto" 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Contacto
            </NavLink>
          </li>
        </ul>

        {/* Botón Alternador de Tema Mágico */}
        <button 
          className="theme-toggle-btn" 
          onClick={handleToggleTheme}
          aria-label={theme === 'goth' ? "Activar tema Sailor Moon pastel" : "Activar tema Gótico oscuro"}
        >
          {theme === 'goth' ? (
            <>
              <span className="btn-icon">✨</span> Modo Sailor Moon <span className="btn-icon">🌙</span>
            </>
          ) : (
            <>
              <span className="btn-icon">🦇</span> Modo Vampírico <span className="btn-icon">🩸</span>
            </>
          )}
        </button>

      </div>
    </nav>
  );
}

// Exportamos el componente para poder usarlo en App.jsx
export default Navbar;
