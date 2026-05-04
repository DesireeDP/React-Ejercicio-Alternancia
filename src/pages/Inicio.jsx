// Este es un componente funcional muy sencillo de React.
// Representa la página principal que el usuario verá nada más entrar.
function Inicio() {
  return (
    // Envolvemos todo en un div contenedor para poder darle estilos si lo necesitamos.
    <div className="page-container">
      {/* Título principal de la página de inicio */}
      <h1>Bienvenido a la página de Inicio</h1>
      
      {/* Una pequeña descripción sobre de qué va nuestro proyecto */}
      <p>Este es el proyecto final de Desarrollo Web en Entorno Cliente utilizando React.</p>
    </div>
  );
}

// Lo exportamos para que el Router en App.jsx pueda cargarlo.
export default Inicio;
