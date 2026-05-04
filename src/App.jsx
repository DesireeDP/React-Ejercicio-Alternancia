// Importamos las herramientas necesarias de 'react-router-dom' para crear la navegación sin recargar la página.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importamos nuestros componentes y páginas creadas.
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';

// Importamos los estilos globales de la aplicación.
import './App.css';

// Componente principal de la aplicación
function App() {
  return (
    // 'Router' envuelve toda la aplicación para que la navegación funcione.
    <Router>
      {/* Mostramos la barra de navegación en la parte superior. Al estar fuera de 'Routes', siempre será visible. */}
      <Navbar />
      
      {/* Contenedor principal donde se cargará el contenido de cada página */}
      <main>
        {/* 'Routes' se encarga de decidir qué componente mostrar según la URL actual */}
        <Routes>
          {/* Si la ruta es la raíz ('/'), mostramos el componente 'Inicio' */}
          <Route path="/" element={<Inicio />} />
          
          {/* Si la ruta es '/servicios', mostramos el componente 'Servicios' */}
          <Route path="/servicios" element={<Servicios />} />
          
          {/* Si la ruta es '/contacto', mostramos el componente 'Contacto' */}
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </main>
    </Router>
  );
}

// Exportamos la aplicación para que Vite pueda renderizarla en el navegador.
export default App;
