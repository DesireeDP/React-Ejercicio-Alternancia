// Importamos NavLink de react-router-dom. 
// A diferencia del clásico <a> de HTML, NavLink no recarga la página y nos avisa si es la ruta actual.
import { NavLink } from 'react-router-dom';

// Importamos la hoja de estilos específica para la barra de navegación.
import './Navbar.css';

// Creamos el componente funcional de nuestra barra de navegación
function Navbar() {
  return (
    // Usamos la etiqueta semántica <nav> para indicar que esto es un menú de navegación.
    <nav className="navbar">
      <ul>
        
        {/* Primer enlace: Inicio */}
        <li>
          {/* 
            'to="/"' indica hacia dónde navegamos. 
            Con la función en 'className', comprobamos si esta ruta está activa. 
            Si lo está, le ponemos la clase 'active' para que se pinte de otro color.
          */}
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
    </nav>
  );
}

// Exportamos el componente para poder usarlo en App.jsx
export default Navbar;
