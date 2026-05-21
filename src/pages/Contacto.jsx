// Importamos 'useState' desde React. Esta herramienta nos permite guardar y cambiar datos dentro de nuestro componente.
import { useState } from 'react';
// Importamos los estilos específicos para que nuestro formulario se vea gótico y oscuro.
import './Contacto.css';

function Contacto() {
  // 1. ESTADOS (Donde guardamos la memoria de la página)

  // Aquí guardamos lo que el usuario escribe en cada campo del formulario.
  // Inicialmente, todos los campos están vacíos (unas comillas sin texto).
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Aquí guardamos los textos de error que le mostraremos al usuario si se equivoca.
  // Si están vacíos (''), significa que no hay ningún error.
  const [errors, setErrors] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  // Aquí recordamos si el usuario ya ha hecho clic o escrito en un campo específico.
  // Esto nos sirve para no mostrarle un error antes de que siquiera empiece a escribir.
  const [touched, setTouched] = useState({
    nombre: false,
    email: false,
    mensaje: false
  });

  // Guardamos un simple 'verdadero' o 'falso' para saber si el formulario se envió con éxito.
  const [submitSuccess, setSubmitSuccess] = useState(false);


  // 2. LÓGICA DE VALIDACIÓN (Las reglas del juego)

  // Esta función recibe el nombre del campo (ej: 'nombre') y lo que el usuario ha escrito (value).
  // Devuelve un mensaje de error si algo está mal, o se queda vacío si todo está bien.
  const validateField = (name, value) => {
    let error = ''; // Empezamos asumiendo que no hay error
    
    // Evaluamos qué campo estamos comprobando
    switch (name) {
      case 'nombre':
        // .trim() quita los espacios en blanco al principio y al final.
        // Si después de quitar los espacios no queda nada, es que el campo está vacío.
        if (!value.trim()) {
          error = 'El nombre es obligatorio.';
        } 
        // Si hay texto, pero tiene menos de 3 letras...
        else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres.';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'El email es obligatorio.';
        } 
        // Esta "Expresión Regular" (regex) comprueba que el email tenga el formato correcto: texto@texto.texto
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'El formato del email no es válido.';
        }
        break;
        
      case 'mensaje':
        if (!value.trim()) {
          error = 'El mensaje es obligatorio.';
        } 
        // El mensaje tiene que ser un poco más largo, al menos 10 caracteres.
        else if (value.trim().length < 10) {
          error = 'El mensaje debe tener al menos 10 caracteres.';
        }
        break;
        
      default:
        break; // Si es un campo desconocido, no hacemos nada
    }
    
    return error; // Devolvemos el error encontrado (o vacío si todo estaba bien)
  };


  // 3. EVENTOS (Lo que pasa cuando el usuario interactúa)

  // Esta función se dispara CADA VEZ que el usuario pulsa una tecla dentro de un input
  const handleChange = (e) => {
    // 'e.target' es el input en el que estamos escribiendo. Extraemos su nombre y su valor actual.
    const { name, value } = e.target;
    
    // Actualizamos lo que el usuario ha escrito en nuestra memoria (formData)
    setFormData({
      ...formData,    // Mantenemos lo que ya estaba en los otros campos
      [name]: value   // Actualizamos solo el campo que estamos modificando ahora mismo
    });

    // Si el usuario ya había tocado este campo antes y se equivocó,
    // queremos comprobar en vivo si ya lo ha arreglado, para quitarle el texto de error al instante.
    if (touched[name]) {
      const errorMsg = validateField(name, value); // Comprobamos si sigue habiendo error
      setErrors({
        ...errors,
        [name]: errorMsg // Actualizamos el error en nuestra memoria
      });
    }
  };

  // Esta función se dispara cuando el usuario HACE CLIC FUERA del input (pierde el foco)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    // Anotamos en nuestra memoria que el usuario ya ha interactuado con este campo.
    setTouched({
      ...touched,
      [name]: true // Ahora vale 'true' en lugar de 'false'
    });

    // Como ha salido del campo, es el momento perfecto para decirle si se ha equivocado en algo.
    const errorMsg = validateField(name, value);
    setErrors({
      ...errors,
      [name]: errorMsg
    });
  };

  // Esta función se dispara al pulsar el botón de "Enviar Mensaje"
  const handleSubmit = (e) => {
    // Esto es muy importante: evita que el navegador recargue toda la página web por defecto.
    e.preventDefault(); 

    // Antes de enviar, revisamos los tres campos por última vez por si acaso.
    const newErrors = {
      nombre: validateField('nombre', formData.nombre),
      email: validateField('email', formData.email),
      mensaje: validateField('mensaje', formData.mensaje)
    };

    // Guardamos todos los errores encontrados.
    setErrors(newErrors);

    // Como intentó enviar el formulario, marcamos como que ha tocado todos los campos.
    // Así forzamos a que se muestren en pantalla todos los mensajes de error a la vez.
    setTouched({
      nombre: true,
      email: true,
      mensaje: true
    });

    // Comprobamos si existe AL MENOS UN error entre todos los campos.
    // Object.values(newErrors) saca los textos de error. 'some' busca si alguno no está vacío.
    const hasErrors = Object.values(newErrors).some(error => error !== '');

    // Si no hay absolutamente ningún error...
    if (!hasErrors) {
      // ¡Éxito! Mostramos nuestro mensaje de que todo ha ido bien.
      setSubmitSuccess(true);
      
      // Vaciamos el formulario para que quede limpio de nuevo.
      setFormData({ nombre: '', email: '', mensaje: '' });
      setTouched({ nombre: false, email: false, mensaje: false });
      
      // Configuramos un temporizador mágico: después de 5000 milisegundos (5 segundos),
      // ocultamos el mensaje de éxito automáticamente.
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }
  };

  // Una pequeña función de ayuda para los estilos visuales
  const getInputClass = (fieldName) => {
    // Si el usuario aún no ha tocado el campo, no le ponemos ningún color especial
    if (!touched[fieldName]) return ''; 
    // Si lo ha tocado y hay error, le ponemos la clase 'is-invalid' (rojo). Si está bien, 'is-valid' (verde).
    return errors[fieldName] ? 'is-invalid' : 'is-valid';
  };


  // 4. LO QUE SE VE EN PANTALLA (Renderizado)
  return (
    <div className="page-container">
      <h1>Contacto</h1>
      <p>Envíanos tus oscuros pensamientos o cualquier duda que tengas. Responderemos antes del amanecer.</p>

      {/* Si submitSuccess es 'true', este cuadro verde se dibuja en la pantalla */}
      {submitSuccess && (
        <div className="success-message">
          <p>Tu mensaje ha sido enviado a las sombras correctamente.</p>
        </div>
      )}

      {/* El formulario: onSubmit se asocia a nuestra función, y noValidate apaga los errores feos del navegador */}
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        
        {/* === SECCIÓN DEL NOMBRE === */}
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text" // Es texto normal
            id="nombre" 
            name="nombre" // Esto tiene que coincidir exactamente con cómo lo llamamos en nuestro estado
            value={formData.nombre} // El valor siempre es el de nuestra memoria
            onChange={handleChange} // Cuando escriben, llamamos a handleChange
            onBlur={handleBlur} // Cuando hacen clic fuera, llamamos a handleBlur
            className={getInputClass('nombre')} // El borde se pinta de un color según si es válido o no
            placeholder="Tu nombre mortal" // Texto de fondo que desaparece al escribir
          />
          {/* Si el campo fue tocado Y ADEMÁS hay un error, mostramos este pequeño párrafo rojo */}
          {touched.nombre && errors.nombre && (
            <p className="error-message">{errors.nombre}</p>
          )}
        </div>

        {/* === SECCIÓN DEL EMAIL === */}
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email" // Al ser tipo email en el móvil saldría el teclado con el @
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('email')}
            placeholder="correo@ejemplo.com"
          />
          {/* Mostramos el error del email si existe y si ya se ha interactuado con él */}
          {touched.email && errors.email && (
            <p className="error-message">{errors.email}</p>
          )}
        </div>

        {/* === SECCIÓN DEL MENSAJE === */}
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea // En lugar de input usamos textarea para que sea un cuadro grande
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getInputClass('mensaje')}
            placeholder="Escribe aquí tu petición..."
          />
          {/* Mostramos el error del mensaje */}
          {touched.mensaje && errors.mensaje && (
            <p className="error-message">{errors.mensaje}</p>
          )}
        </div>

        {/* === BOTÓN DE ENVIAR === */}
        {/* El tipo "submit" hace que al pulsarlo se dispare el evento onSubmit del formulario */}
        <button type="submit" className="submit-btn">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}

// Exportamos nuestra obra maestra para que React la pueda usar en toda la aplicación
export default Contacto;
